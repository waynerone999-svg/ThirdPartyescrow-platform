"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardPage() {

  const router = useRouter();

  const [user, setUser] =
    useState<any>(null);

  const [transactions, setTransactions] =
    useState<any[]>([]);

  async function getUserAndDeals() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      router.push("/login");

      return;
    }

    setUser(user);

    const { data } = await supabase
      .from("transactions")
      .select("*")
      .or(
        `buyer_email.eq.${user.email},seller_email.eq.${user.email}`
      )
      .order("id", {
        ascending: false,
      });

    setTransactions(data || []);
  }

  useEffect(() => {

    getUserAndDeals();

  }, []);

  async function logout() {

    await supabase.auth.signOut();

    router.push("/login");
  }

  const pendingDeals =
    transactions.filter(
      (t) => t.status === "pending"
    );

  const ongoingDeals =
    transactions.filter(
      (t) =>
        t.status !== "pending" &&
        t.status !== "completed"
    );

  const completedDeals =
    transactions.filter(
      (t) =>
        t.status === "completed"
    );

  return (

    <main className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div
          className="
            flex
            flex-col
            lg:flex-row
            justify-between
            items-start
            lg:items-center
            gap-8
            mb-16
          "
        >

          <div>

            <h1
              className="
                text-6xl
                font-black
                mb-4
              "
            >
              Dashboard
            </h1>

            <p className="text-slate-400 text-xl">

              Logged in as{" "}

              <span className="text-white font-bold">
                {user?.email}
              </span>

            </p>

          </div>

          <button
            onClick={logout}
            className="
              bg-red-600
              hover:bg-red-700
              px-7
              py-4
              rounded-2xl
              font-bold
            "
          >
            Logout
          </button>

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap gap-5 mb-14">

          <Link href="/new-transaction">

            <button
              className="
                bg-blue-600
                hover:bg-blue-700
                px-8
                py-4
                rounded-2xl
                font-bold
              "
            >
              Create Transaction
            </button>

          </Link>

          <Link href="/seller-dashboard">

            <button
              className="
                bg-yellow-600
                hover:bg-yellow-700
                px-8
                py-4
                rounded-2xl
                font-bold
              "
            >
              Seller Requests
            </button>

          </Link>

        </div>

        {/* PENDING INVITES */}
        <div className="mb-16">

          <h2
            className="
              text-4xl
              font-black
              mb-8
            "
          >
            Pending Invitations
          </h2>

          <div className="space-y-5">

            {pendingDeals.length === 0 && (

              <div
                className="
                  bg-slate-900
                  border
                  border-white/10
                  rounded-3xl
                  p-8
                  text-slate-400
                "
              >
                No pending invites
              </div>
            )}

            {pendingDeals.map((deal) => {

              const role =
                user?.email ===
                deal.buyer_email
                  ? "buyer"
                  : "seller";

              return (

                <Link
                  key={deal.id}
                  href={`/transaction/${deal.id}`}
                >

                  <div
                    className="
                      bg-slate-900
                      border
                      border-white/10
                      rounded-3xl
                      p-8
                      hover:border-blue-500/40
                      transition
                      cursor-pointer
                    "
                  >

                    <div
                      className="
                        flex
                        justify-between
                        items-start
                        mb-5
                      "
                    >

                      <div>

                        <h3
                          className="
                            text-3xl
                            font-bold
                            mb-3
                          "
                        >
                          {deal.transaction_name}
                        </h3>

                        <p className="text-slate-400">
                          Amount:
                          {" "}
                          ${deal.amount}
                        </p>

                      </div>

                      <div
                        className="
                          bg-yellow-500/20
                          text-yellow-300
                          px-4
                          py-2
                          rounded-full
                          font-bold
                        "
                      >
                        Pending
                      </div>

                    </div>

                    <p className="text-lg">

                      You are:
                      {" "}

                      <span className="font-bold capitalize">
                        {role}
                      </span>

                    </p>

                  </div>

                </Link>
              );
            })}

          </div>

        </div>

        {/* ONGOING */}
        <div className="mb-16">

          <h2
            className="
              text-4xl
              font-black
              mb-8
            "
          >
            Ongoing Transactions
          </h2>

          <div className="space-y-5">

            {ongoingDeals.length === 0 && (

              <div
                className="
                  bg-slate-900
                  border
                  border-white/10
                  rounded-3xl
                  p-8
                  text-slate-400
                "
              >
                No ongoing deals
              </div>
            )}

            {ongoingDeals.map((deal) => {

              const role =
                user?.email ===
                deal.buyer_email
                  ? "buyer"
                  : "seller";

              return (

                <Link
                  key={deal.id}
                  href={`/transaction/${deal.id}`}
                >

                  <div
                    className="
                      bg-slate-900
                      border
                      border-white/10
                      rounded-3xl
                      p-8
                      hover:border-green-500/40
                      transition
                      cursor-pointer
                    "
                  >

                    <div
                      className="
                        flex
                        justify-between
                        items-start
                        mb-5
                      "
                    >

                      <div>

                        <h3
                          className="
                            text-3xl
                            font-bold
                            mb-3
                          "
                        >
                          {deal.transaction_name}
                        </h3>

                        <p className="text-slate-400">
                          Amount:
                          {" "}
                          ${deal.amount}
                        </p>

                      </div>

                      <div
                        className="
                          bg-green-500/20
                          text-green-300
                          px-4
                          py-2
                          rounded-full
                          font-bold
                          capitalize
                        "
                      >
                        {deal.status}
                      </div>

                    </div>

                    <p className="text-lg">

                      You are:
                      {" "}

                      <span className="font-bold capitalize">
                        {role}
                      </span>

                    </p>

                  </div>

                </Link>
              );
            })}

          </div>

        </div>

        {/* COMPLETED */}
        <div>

          <h2
            className="
              text-4xl
              font-black
              mb-8
            "
          >
            Completed Deals
          </h2>

          <div className="space-y-5">

            {completedDeals.length === 0 && (

              <div
                className="
                  bg-slate-900
                  border
                  border-white/10
                  rounded-3xl
                  p-8
                  text-slate-400
                "
              >
                No completed deals
              </div>
            )}

            {completedDeals.map((deal) => {

              const role =
                user?.email ===
                deal.buyer_email
                  ? "buyer"
                  : "seller";

              return (

                <Link
                  key={deal.id}
                  href={`/transaction/${deal.id}`}
                >

                  <div
                    className="
                      bg-slate-900
                      border
                      border-white/10
                      rounded-3xl
                      p-8
                      hover:border-blue-500/40
                      transition
                      cursor-pointer
                    "
                  >

                    <div
                      className="
                        flex
                        justify-between
                        items-start
                        mb-5
                      "
                    >

                      <div>

                        <h3
                          className="
                            text-3xl
                            font-bold
                            mb-3
                          "
                        >
                          {deal.transaction_name}
                        </h3>

                        <p className="text-slate-400">
                          Amount:
                          {" "}
                          ${deal.amount}
                        </p>

                      </div>

                      <div
                        className="
                          bg-blue-500/20
                          text-blue-300
                          px-4
                          py-2
                          rounded-full
                          font-bold
                        "
                      >
                        Completed
                      </div>

                    </div>

                    <p className="text-lg">

                      You are:
                      {" "}

                      <span className="font-bold capitalize">
                        {role}
                      </span>

                    </p>

                  </div>

                </Link>
              );
            })}

          </div>

        </div>

      </div>

    </main>
  );
}