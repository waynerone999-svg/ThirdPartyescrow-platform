"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminDashboard() {

  const router = useRouter();

  const [transactions, setTransactions] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState({

      total: 0,

      completed: 0,

      disputed: 0,

      pending: 0,

      paid: 0,

    });

  async function loadTransactions() {

    const { data, error } =
      await supabase
        .from("transactions")
        .select("*")
        .order("id", {
          ascending: false,
        });

    if (error) {

      console.log(error);

      return;
    }

    setTransactions(data || []);

    setStats({

      total:
        data?.length || 0,

      completed:
        data?.filter(
          (t) =>
            t.status === "completed"
        ).length || 0,

      disputed:
        data?.filter(
          (t) =>
            t.status === "disputed"
        ).length || 0,

      pending:
        data?.filter(
          (t) =>
            t.status === "pending"
        ).length || 0,

      paid:
        data?.filter(
          (t) =>
            t.status === "paid"
        ).length || 0,

    });

    setLoading(false);
  }

  async function markCompleted(id: number) {

    await supabase
      .from("transactions")
      .update({
        status: "completed",
      })
      .eq("id", id);

    loadTransactions();
  }

  async function markDisputed(id: number) {

    await supabase
      .from("transactions")
      .update({
        status: "disputed",
      })
      .eq("id", id);

    loadTransactions();
  }

  async function deleteTransaction(id: number) {

    const confirmDelete =
      confirm(
        "Delete transaction?"
      );

    if (!confirmDelete) return;

    await supabase
      .from("transactions")
      .delete()
      .eq("id", id);

    loadTransactions();
  }

  function logout() {

    localStorage.removeItem(
      "admin_logged_in"
    );

    localStorage.removeItem(
      "admin_email"
    );

    router.push("/admin/login");
  }

  useEffect(() => {

    const adminLogged =
      localStorage.getItem(
        "admin_logged_in"
      );

    if (!adminLogged) {

      router.push("/admin/login");

      return;
    }

    loadTransactions();

  }, []);

  return (

    <main className="min-h-screen bg-slate-950 text-white">

      {/* TOPBAR */}
      <div
        className="
          border-b
          border-white/10
          px-8
          py-6
          flex
          items-center
          justify-between
        "
      >

        <div>

          <h1 className="text-4xl font-black">
            Admin Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            3rdParty Escrow Control Center
          </p>

        </div>

        <button
          onClick={logout}

          className="
            bg-red-600
            hover:bg-red-700
            px-6
            py-3
            rounded-2xl
            font-bold
          "
        >
          Logout
        </button>

      </div>

      <div className="p-8">

        {/* STATS */}
        <div
          className="
            grid
            md:grid-cols-2
            lg:grid-cols-5
            gap-6
            mb-10
          "
        >

          <div
            className="
              bg-slate-900
              border
              border-white/10
              rounded-3xl
              p-6
            "
          >

            <h2 className="text-slate-400 mb-3">
              Total Transactions
            </h2>

            <p className="text-5xl font-black">
              {stats.total}
            </p>

          </div>

          <div
            className="
              bg-green-900/20
              border
              border-green-500/20
              rounded-3xl
              p-6
            "
          >

            <h2 className="text-green-400 mb-3">
              Completed
            </h2>

            <p className="text-5xl font-black">
              {stats.completed}
            </p>

          </div>

          <div
            className="
              bg-red-900/20
              border
              border-red-500/20
              rounded-3xl
              p-6
            "
          >

            <h2 className="text-red-400 mb-3">
              Disputed
            </h2>

            <p className="text-5xl font-black">
              {stats.disputed}
            </p>

          </div>

          <div
            className="
              bg-yellow-900/20
              border
              border-yellow-500/20
              rounded-3xl
              p-6
            "
          >

            <h2 className="text-yellow-400 mb-3">
              Pending
            </h2>

            <p className="text-5xl font-black">
              {stats.pending}
            </p>

          </div>

          <div
            className="
              bg-blue-900/20
              border
              border-blue-500/20
              rounded-3xl
              p-6
            "
          >

            <h2 className="text-blue-400 mb-3">
              Paid
            </h2>

            <p className="text-5xl font-black">
              {stats.paid}
            </p>

          </div>

        </div>

        {/* TRANSACTIONS */}
        <div
          className="
            bg-slate-900
            border
            border-white/10
            rounded-[40px]
            overflow-hidden
          "
        >

          <div
            className="
              p-8
              border-b
              border-white/10
            "
          >

            <h2 className="text-3xl font-black">
              Transactions
            </h2>

          </div>

          {loading ? (

            <div className="p-10">
              Loading...
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b border-white/10 text-left">

                    <th className="p-6">
                      ID
                    </th>

                    <th className="p-6">
                      Name
                    </th>

                    <th className="p-6">
                      Amount
                    </th>

                    <th className="p-6">
                      Buyer
                    </th>

                    <th className="p-6">
                      Seller
                    </th>

                    <th className="p-6">
                      Payment
                    </th>

                    <th className="p-6">
                      Status
                    </th>

                    <th className="p-6">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {transactions.map((tx) => (

                    <tr
                      key={tx.id}
                      className="
                        border-b
                        border-white/5
                      "
                    >

                      <td className="p-6">
                        #{tx.id}
                      </td>

                      <td className="p-6 font-bold">
                        {tx.transaction_name}
                      </td>

                      <td className="p-6">
                        ${tx.amount}
                      </td>

                      <td className="p-6">
                        {tx.buyer_email}
                      </td>

                      <td className="p-6">
                        {tx.seller_email}
                      </td>

                      <td className="p-6">
                        {tx.payment_method}
                      </td>

                      <td className="p-6">

                        <span
                          className="
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            font-bold
                            bg-slate-800
                          "
                        >
                          {tx.status}
                        </span>

                      </td>

                      <td className="p-6">

                        <div className="flex flex-wrap gap-3">

                          <Link
                            href={`/transaction/${tx.id}`}
                          >

                            <button
                              className="
                                bg-blue-600
                                hover:bg-blue-700
                                px-4
                                py-2
                                rounded-xl
                                font-bold
                              "
                            >
                              Open
                            </button>

                          </Link>

                          <button
                            onClick={() =>
                              markCompleted(tx.id)
                            }

                            className="
                              bg-green-600
                              hover:bg-green-700
                              px-4
                              py-2
                              rounded-xl
                              font-bold
                            "
                          >
                            Complete
                          </button>

                          <button
                            onClick={() =>
                              markDisputed(tx.id)
                            }

                            className="
                              bg-yellow-600
                              hover:bg-yellow-700
                              px-4
                              py-2
                              rounded-xl
                              font-bold
                            "
                          >
                            Dispute
                          </button>

                          <button
                            onClick={() =>
                              deleteTransaction(tx.id)
                            }

                            className="
                              bg-red-600
                              hover:bg-red-700
                              px-4
                              py-2
                              rounded-xl
                              font-bold
                            "
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </main>
  );
}