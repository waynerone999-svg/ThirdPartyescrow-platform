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

      released: 0,

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

      released:
        data?.filter(
          (t) =>
            t.status === "released"
        ).length || 0,

    });

    setLoading(false);
  }

  async function completeTransaction(
    id: number
  ) {

    await supabase
      .from("transactions")
      .update({
        status: "completed",
      })
      .eq("id", id);

    loadTransactions();
  }

  async function disputeTransaction(
    id: number
  ) {

    await supabase
      .from("transactions")
      .update({
        status: "disputed",
      })
      .eq("id", id);

    loadTransactions();
  }

  async function deleteTransaction(
    id: number
  ) {

    const confirmDelete =
      confirm(
        "Delete this transaction?"
      );

    if (!confirmDelete) return;

    await supabase
      .from("transactions")
      .delete()
      .eq("id", id);

    loadTransactions();
  }

  function logout() {

    document.cookie =
      "admin_logged_in=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    router.push("/admin/login");
  }

  useEffect(() => {

    loadTransactions();

  }, []);

  return (

    <main className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}
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

          <h1 className="text-5xl font-black">
            Admin Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            3rdParty Escrow Security Center
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
            lg:grid-cols-6
            gap-6
            mb-10
          "
        >

          <div className="bg-slate-900 rounded-3xl p-6 border border-white/10">

            <p className="text-slate-400 mb-3">
              Total
            </p>

            <h2 className="text-5xl font-black">
              {stats.total}
            </h2>

          </div>

          <div className="bg-green-900/20 border border-green-500/20 rounded-3xl p-6">

            <p className="text-green-400 mb-3">
              Completed
            </p>

            <h2 className="text-5xl font-black">
              {stats.completed}
            </h2>

          </div>

          <div className="bg-red-900/20 border border-red-500/20 rounded-3xl p-6">

            <p className="text-red-400 mb-3">
              Disputed
            </p>

            <h2 className="text-5xl font-black">
              {stats.disputed}
            </h2>

          </div>

          <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-3xl p-6">

            <p className="text-yellow-400 mb-3">
              Pending
            </p>

            <h2 className="text-5xl font-black">
              {stats.pending}
            </h2>

          </div>

          <div className="bg-blue-900/20 border border-blue-500/20 rounded-3xl p-6">

            <p className="text-blue-400 mb-3">
              Paid
            </p>

            <h2 className="text-5xl font-black">
              {stats.paid}
            </h2>

          </div>

          <div className="bg-purple-900/20 border border-purple-500/20 rounded-3xl p-6">

            <p className="text-purple-400 mb-3">
              Released
            </p>

            <h2 className="text-5xl font-black">
              {stats.released}
            </h2>

          </div>

        </div>

        {/* DISPUTE CENTER */}
        <div
          className="
            bg-red-900/20
            border
            border-red-500/20
            rounded-[40px]
            p-8
            mb-10
          "
        >

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-4xl font-black text-red-400">
                Dispute Center
              </h2>

              <p className="text-slate-300 mt-2">
                Manage disputed escrow transactions
              </p>

            </div>

          </div>

          <div className="space-y-5">

            {transactions
              .filter(
                (tx) =>
                  tx.status === "disputed"
              )
              .map((tx) => (

                <div
                  key={tx.id}

                  className="
                    bg-slate-900
                    border
                    border-white/10
                    rounded-3xl
                    p-6
                    flex
                    flex-col
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                    gap-5
                  "
                >

                  <div>

                    <h3 className="text-2xl font-black mb-2">
                      {tx.transaction_name}
                    </h3>

                    <div className="space-y-1 text-slate-300">

                      <p>
                        Buyer:
                        {" "}
                        {tx.buyer_email}
                      </p>

                      <p>
                        Seller:
                        {" "}
                        {tx.seller_email}
                      </p>

                      <p>
                        Amount:
                        {" "}
                        ${tx.amount}
                      </p>

                      <p>
                        Payment:
                        {" "}
                        {tx.payment_method}
                      </p>

                    </div>

                  </div>

                  <div className="flex flex-wrap gap-3">

                    <button
                      onClick={() =>
                        completeTransaction(tx.id)
                      }

                      className="
                        bg-green-600
                        hover:bg-green-700
                        px-6
                        py-3
                        rounded-2xl
                        font-bold
                      "
                    >
                      Resolve
                    </button>

                    <button
                      onClick={() =>
                        deleteTransaction(tx.id)
                      }

                      className="
                        bg-red-600
                        hover:bg-red-700
                        px-6
                        py-3
                        rounded-2xl
                        font-bold
                      "
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            {transactions.filter(
              (tx) =>
                tx.status === "disputed"
            ).length === 0 && (

              <div
                className="
                  bg-slate-900
                  border
                  border-white/10
                  rounded-3xl
                  p-8
                  text-center
                  text-slate-400
                "
              >
                No active disputes.
              </div>

            )}

          </div>

        </div>

        {/* TRANSACTION TABLE */}
        <div
          className="
            bg-slate-900
            border
            border-white/10
            rounded-[40px]
            overflow-hidden
          "
        >

          <div className="p-8 border-b border-white/10">

            <h2 className="text-4xl font-black">
              All Transactions
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

                  <tr className="border-b border-white/10">

                    <th className="p-6 text-left">
                      ID
                    </th>

                    <th className="p-6 text-left">
                      Transaction
                    </th>

                    <th className="p-6 text-left">
                      Amount
                    </th>

                    <th className="p-6 text-left">
                      Status
                    </th>

                    <th className="p-6 text-left">
                      Payment
                    </th>

                    <th className="p-6 text-left">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {transactions.map((tx) => (

                    <tr
                      key={tx.id}
                      className="border-b border-white/5"
                    >

                      <td className="p-6">
                        #{tx.id}
                      </td>

                      <td className="p-6">

                        <div>

                          <p className="font-bold">
                            {tx.transaction_name}
                          </p>

                          <p className="text-sm text-slate-400 mt-1">
                            {tx.buyer_email}
                          </p>

                        </div>

                      </td>

                      <td className="p-6">
                        ${tx.amount}
                      </td>

                      <td className="p-6">

                        <span
                          className="
                            px-4
                            py-2
                            rounded-full
                            bg-slate-800
                            text-sm
                            font-bold
                          "
                        >
                          {tx.status}
                        </span>

                      </td>

                      <td className="p-6">
                        {tx.payment_method}
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
                              completeTransaction(tx.id)
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
                              disputeTransaction(tx.id)
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