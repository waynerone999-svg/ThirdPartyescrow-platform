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

  const [transactions, setTransactions] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadData() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      router.push("/login");

      return;
    }

    if (
      user.email !==
      "waynerone999@gmail.com"
    ) {

      router.push("/dashboard");

      return;
    }

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

    setLoading(false);
  }

  async function logout() {

    await supabase.auth.signOut();

    router.push("/login");
  }

  async function markCompleted(id: number) {

    await supabase
      .from("transactions")
      .update({
        status: "completed",
      })
      .eq("id", id);

    loadData();
  }

  async function markDisputed(id: number) {

    await supabase
      .from("transactions")
      .update({
        status: "disputed",
      })
      .eq("id", id);

    loadData();
  }

  async function deleteTransaction(id: number) {

    const confirmDelete =
      confirm(
        "Delete this transaction?"
      );

    if (!confirmDelete) return;

    await supabase
      .from("transactions")
      .delete()
      .eq("id", id);

    loadData();
  }

  useEffect(() => {

    loadData();

  }, []);

  const total =
    transactions.length;

  const completed =
    transactions.filter(
      (t) =>
        t.status ===
        "completed"
    ).length;

  const disputed =
    transactions.filter(
      (t) =>
        t.status ===
        "disputed"
    ).length;

  const pending =
    transactions.filter(
      (t) =>
        t.status ===
        "pending"
    ).length;

  const paid =
    transactions.filter(
      (t) =>
        t.status ===
        "paid"
    ).length;

  const released =
    transactions.filter(
      (t) =>
        t.status ===
        "released"
    ).length;

  if (loading) {

    return (

      <main
        className="
          min-h-screen
          bg-[#020617]
          text-white
          flex
          items-center
          justify-center
        "
      >

        Loading Admin Dashboard...

      </main>
    );
  }

  return (

    <main
      className="
        min-h-screen
        bg-[#020617]
        text-white
        p-4
        md:p-8
      "
    >

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
            mb-10
          "
        >

          <div>

            <h1
              className="
                text-4xl
                md:text-6xl
                font-black
              "
            >
              Admin Dashboard
            </h1>

            <p
              className="
                text-slate-400
                mt-2
                text-lg
              "
            >
              3rdParty Escrow Security Center
            </p>

          </div>

          <button
            onClick={logout}

            className="
              bg-red-600
              hover:bg-red-700
              px-8
              py-4
              rounded-2xl
              font-bold
              text-lg
            "
          >
            Logout
          </button>

        </div>

        {/* STATS */}
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            xl:grid-cols-6
            gap-5
            mb-10
          "
        >

          <StatCard
            title="Total"
            value={total}
            color="border-white/10"
          />

          <StatCard
            title="Completed"
            value={completed}
            color="border-green-500/30"
          />

          <StatCard
            title="Disputed"
            value={disputed}
            color="border-red-500/30"
          />

          <StatCard
            title="Pending"
            value={pending}
            color="border-yellow-500/30"
          />

          <StatCard
            title="Paid"
            value={paid}
            color="border-blue-500/30"
          />

          <StatCard
            title="Released"
            value={released}
            color="border-purple-500/30"
          />

        </div>

        {/* TRANSACTIONS */}
        <div
          className="
            bg-slate-950
            border
            border-white/10
            rounded-3xl
            overflow-hidden
          "
        >

          <div
            className="
              p-6
              border-b
              border-white/10
            "
          >

            <h2
              className="
                text-4xl
                font-black
              "
            >
              All Transactions
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1000px]">

              <thead
                className="
                  bg-slate-900
                  text-left
                "
              >

                <tr>

                  <th className="p-6">
                    ID
                  </th>

                  <th className="p-6">
                    Transaction
                  </th>

                  <th className="p-6">
                    Amount
                  </th>

                  <th className="p-6">
                    Status
                  </th>

                  <th className="p-6">
                    Payment
                  </th>

                  <th className="p-6">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {transactions.map((t) => (

                  <tr
                    key={t.id}

                    className="
                      border-t
                      border-white/5
                    "
                  >

                    <td className="p-6">
                      #{t.id}
                    </td>

                    <td className="p-6">

                      <div>

                        <h3
                          className="
                            text-2xl
                            font-bold
                          "
                        >
                          {t.transaction_name}
                        </h3>

                        <p className="text-slate-400">
                          {t.buyer_email}
                        </p>

                      </div>

                    </td>

                    <td className="p-6 text-2xl">
                      ${t.amount}
                    </td>

                    <td className="p-6">

                      <span
                        className="
                          bg-slate-800
                          px-5
                          py-2
                          rounded-full
                          text-lg
                          font-bold
                        "
                      >
                        {t.status}
                      </span>

                    </td>

                    <td className="p-6">
                      {t.payment_method}
                    </td>

                    <td className="p-6">

                      <div
                        className="
                          flex
                          flex-wrap
                          gap-3
                        "
                      >

                        <Link
                          href={`/transaction/${t.id}`}

                          className="
                            bg-blue-600
                            hover:bg-blue-700
                            px-5
                            py-3
                            rounded-2xl
                            font-bold
                          "
                        >
                          Open
                        </Link>

                        <button
                          onClick={() =>
                            markCompleted(t.id)
                          }

                          className="
                            bg-green-600
                            hover:bg-green-700
                            px-5
                            py-3
                            rounded-2xl
                            font-bold
                          "
                        >
                          Complete
                        </button>

                        <button
                          onClick={() =>
                            markDisputed(t.id)
                          }

                          className="
                            bg-yellow-600
                            hover:bg-yellow-700
                            px-5
                            py-3
                            rounded-2xl
                            font-bold
                          "
                        >
                          Dispute
                        </button>

                        <button
                          onClick={() =>
                            deleteTransaction(
                              t.id
                            )
                          }

                          className="
                            bg-red-600
                            hover:bg-red-700
                            px-5
                            py-3
                            rounded-2xl
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

        </div>

      </div>

    </main>
  );
}

function StatCard({
  title,
  value,
  color,
}: any) {

  return (

    <div
      className={`
        bg-slate-950
        border
        ${color}
        rounded-3xl
        p-6
      `}
    >

      <p
        className="
          text-slate-300
          text-xl
          mb-5
        "
      >
        {title}
      </p>

      <h2
        className="
          text-6xl
          font-black
        "
      >
        {value}
      </h2>

    </div>
  );
}