"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminDashboard() {
  const router = useRouter();

  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    disputed: 0,
    pending: 0,
    paid: 0,
    released: 0,
  });

  useEffect(() => {
    loadData();

    const channel = supabase
      .channel("admin-transactions")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transactions",
        },
        () => {
          loadData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadData() {
    try {
      // SAFE admin check (client-side only)
      if (typeof window !== "undefined") {
        const loggedIn = localStorage.getItem("admin_logged_in");

        if (loggedIn !== "true") {
          router.push("/admin/login");
          return;
        }
      }

      // LOAD TRANSACTIONS
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.log(error);
        return;
      }

      const tx = data || [];

      setTransactions(tx);

      setStats({
        total: tx.length,
        completed: tx.filter((t) => t.status === "completed").length,
        disputed: tx.filter((t) => t.status === "disputed").length,
        pending: tx.filter((t) => t.status === "pending").length,
        paid: tx.filter((t) => t.status === "paid").length,
        released: tx.filter((t) => t.status === "released").length,
      });

      // USER COUNT (simple fallback)
      const uniqueUsers = new Set(
        tx.map((t) => t.buyer_email).filter(Boolean)
      );

      setTotalUsers(uniqueUsers.size);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_logged_in");
      localStorage.removeItem("admin_email");
    }

    router.push("/admin/login");
  }

  async function markCompleted(id: number) {
    await supabase
      .from("transactions")
      .update({ status: "completed" })
      .eq("id", id);

    loadData();
  }

  async function markDisputed(id: number) {
    await supabase
      .from("transactions")
      .update({ status: "disputed" })
      .eq("id", id);

    loadData();
  }

  async function markPending(id: number) {
    await supabase
      .from("transactions")
      .update({ status: "pending" })
      .eq("id", id);

    loadData();
  }

  async function deleteTransaction(id: number) {
    const confirmDelete = confirm("Delete this transaction?");
    if (!confirmDelete) return;

    await supabase.from("transactions").delete().eq("id", id);

    loadData();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center text-3xl font-bold">
        Loading Admin Dashboard...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl md:text-6xl font-black">
              Admin Dashboard
            </h1>
            <p className="text-slate-400 mt-2 text-lg">
              3rdParty Escrow Security Center
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-2xl font-bold text-lg"
          >
            Logout
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-5 mb-10">
          <StatCard title="Transactions" value={stats.total} />
          <StatCard title="Users" value={totalUsers} />
          <StatCard title="Completed" value={stats.completed} />
          <StatCard title="Disputed" value={stats.disputed} />
          <StatCard title="Pending" value={stats.pending} />
          <StatCard title="Paid" value={stats.paid} />
          <StatCard title="Released" value={stats.released} />
        </div>

        {/* TABLE */}
        <div className="bg-slate-950 border border-white/10 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-4xl font-black">All Transactions</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-slate-900 text-left">
                <tr>
                  <th className="p-6">ID</th>
                  <th className="p-6">Transaction</th>
                  <th className="p-6">Amount</th>
                  <th className="p-6">Status</th>
                  <th className="p-6">Payment</th>
                  <th className="p-6">Actions</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="border-t border-white/5">
                    <td className="p-6">#{t.id}</td>

                    <td className="p-6">
                      <h3 className="text-xl font-bold">
                        {t.transaction_name}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {t.buyer_email}
                      </p>
                    </td>

                    <td className="p-6 text-xl">${t.amount}</td>

                    <td className="p-6">
                      <span className="bg-slate-800 px-4 py-2 rounded-full font-bold">
                        {t.status}
                      </span>
                    </td>

                    <td className="p-6">{t.payment_method}</td>

                    <td className="p-6 flex flex-wrap gap-2">
                      <Link
                        href={`/transaction/${t.id}`}
                        className="bg-blue-600 px-4 py-2 rounded-xl font-bold"
                      >
                        Open
                      </Link>

                      <button
                        onClick={() => markCompleted(t.id)}
                        className="bg-green-600 px-4 py-2 rounded-xl font-bold"
                      >
                        Complete
                      </button>

                      <button
                        onClick={() => markDisputed(t.id)}
                        className="bg-yellow-600 px-4 py-2 rounded-xl font-bold"
                      >
                        Dispute
                      </button>

                      <button
                        onClick={() => markPending(t.id)}
                        className="bg-purple-600 px-4 py-2 rounded-xl font-bold"
                      >
                        Pending
                      </button>

                      <button
                        onClick={() => deleteTransaction(t.id)}
                        className="bg-red-600 px-4 py-2 rounded-xl font-bold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

/* STAT CARD */
function StatCard({ title, value }: any) {
  return (
    <div className="bg-slate-950 border border-white/10 rounded-3xl p-6">
      <p className="text-slate-300 text-lg mb-4">{title}</p>
      <h2 className="text-5xl font-black">{value}</h2>
    </div>
  );
}