"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SellerDashboard() {

  const router = useRouter();

  const [user, setUser] =
    useState<any>(null);

  const [transactions, setTransactions] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState({
      total: 0,
      completed: 0,
      pending: 0,
      disputed: 0,
      released: 0,
      totalAmount: 0,
    });

 async function loadSellerTransactions() {

  try {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      router.push("/login");

      return;
    }

    setUser(user);

    /* SELLER DEALS */

    const {
      data: sellerDeals,
      error: sellerError,
    } = await supabase
      .from("transactions")
      .select("*")
      .eq(
        "seller_email",
        user.email
      );

    /* BUYER DEALS */

    const {
      data: buyerDeals,
      error: buyerError,
    } = await supabase
      .from("transactions")
      .select("*")
      .eq(
        "buyer_email",
        user.email
      );

    if (
      sellerError ||
      buyerError
    ) {

      console.log(
        sellerError || buyerError
      );

      setLoading(false);

      return;
    }

    /* MERGE */

    const mergedDeals = [
      ...(sellerDeals || []),
      ...(buyerDeals || []),
    ];

    /* REMOVE DUPLICATES */

    const uniqueDeals =
      mergedDeals.filter(
        (deal, index, self) =>
          index ===
          self.findIndex(
            (d) => d.id === deal.id
          )
      );

    /* SORT */

    uniqueDeals.sort(
      (a, b) => b.id - a.id
    );

    setTransactions(uniqueDeals);

    setStats({

      total:
        uniqueDeals.length,

      completed:
        uniqueDeals.filter(
          (d) =>
            d.status === "completed"
        ).length,

      pending:
        uniqueDeals.filter(
          (d) =>
            d.status === "pending"
        ).length,

      disputed:
        uniqueDeals.filter(
          (d) =>
            d.status === "disputed"
        ).length,

      released:
        uniqueDeals.filter(
          (d) =>
            d.status === "released"
        ).length,

      totalAmount:
        uniqueDeals.reduce(
          (sum, d) =>
            sum + Number(d.amount || 0),
          0
        ),
    });

    setLoading(false);

  } catch (err) {

    console.log(err);

    setLoading(false);
  }
}

  async function logout() {

    await supabase.auth.signOut();

    router.push("/login");
  }

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

        Loading Seller Dashboard...

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
            lg:flex-row
            justify-between
            gap-6
            mb-10
          "
        >

          <div>

            <h1
              className="
                text-4xl
                md:text-6xl
                font-black
                mb-4
              "
            >
              Seller Dashboard
            </h1>

            <p
              className="
                text-slate-400
                text-lg
              "
            >
              Welcome back,
              {" "}
              {user?.email}
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
              h-fit
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
            title="Deals"
            value={stats.total}
            color="border-white/10"
          />

          <StatCard
            title="Completed"
            value={stats.completed}
            color="border-green-500/30"
          />

          <StatCard
            title="Pending"
            value={stats.pending}
            color="border-yellow-500/30"
          />

          <StatCard
            title="Disputed"
            value={stats.disputed}
            color="border-red-500/30"
          />

          <StatCard
            title="Released"
            value={stats.released}
            color="border-purple-500/30"
          />

          <StatCard
            title="Revenue"
            value={`$${stats.totalAmount}`}
            color="border-blue-500/30"
          />

        </div>

        {/* EMPTY */}

        {transactions.length === 0 && (

          <div
            className="
              bg-slate-900
              border
              border-white/10
              rounded-3xl
              p-10
              text-slate-400
            "
          >
            No transactions found.
          </div>
        )}

        {/* TRANSACTIONS */}

        <div className="space-y-6">

          {transactions.map((deal) => (

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
                  p-6
                  md:p-8
                  hover:border-blue-500/40
                  transition
                  cursor-pointer
                "
              >

                <div
                  className="
                    flex
                    flex-col
                    lg:flex-row
                    justify-between
                    gap-6
                  "
                >

                  <div className="flex-1">

                    <h2
                      className="
                        text-2xl
                        md:text-3xl
                        font-bold
                        mb-4
                      "
                    >
                      {deal.transaction_name}
                    </h2>

                    {/* ROLE */}

                    <div
                      className="
                        inline-block
                        bg-purple-500/20
                        text-purple-300
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-bold
                        mb-5
                      "
                    >
                      {user?.email ===
                      deal.seller_email
                        ? "You are Seller"
                        : "You are Buyer"}
                    </div>

                    <div className="space-y-3">

                      <p className="text-slate-300">
                        <span className="text-slate-500">
                          Amount:
                        </span>
                        {" "}
                        ${deal.amount}
                      </p>

                      <p className="text-slate-300">
                        <span className="text-slate-500">
                          Buyer:
                        </span>
                        {" "}
                        {deal.buyer_email}
                      </p>

                      <p className="text-slate-300">
                        <span className="text-slate-500">
                          Seller:
                        </span>
                        {" "}
                        {deal.seller_email}
                      </p>

                      <p className="text-slate-300">
                        <span className="text-slate-500">
                          Payment Method:
                        </span>
                        {" "}
                        {deal.payment_method}
                      </p>

                      {/* PAYOUT */}

                      <div
                        className="
                          mt-6
                          bg-slate-950
                          border
                          border-green-500/20
                          rounded-2xl
                          p-5
                        "
                      >

                        <h3
                          className="
                            text-xl
                            font-bold
                            text-green-400
                            mb-4
                          "
                        >
                          Seller Payout Details
                        </h3>

                        {deal.seller_payout_method ? (

                          <div className="space-y-3">

                            <p className="text-slate-300">
                              <span className="text-slate-500">
                                Method:
                              </span>
                              {" "}
                              {deal.seller_payout_method}
                            </p>

                            <p className="text-slate-300 break-all">
                              <span className="text-slate-500">
                                Details:
                              </span>
                              {" "}
                              {deal.seller_payout_details}
                            </p>

                          </div>

                        ) : (

                          <p className="text-yellow-400">
                            Seller has not submitted payout details yet
                          </p>

                        )}

                      </div>

                    </div>

                  </div>

                  <div>

                    <div
                      className="
                        bg-blue-500/20
                        text-blue-300
                        px-5
                        py-2
                        rounded-full
                        font-bold
                        capitalize
                        w-fit
                      "
                    >
                      {deal.status}
                    </div>

                  </div>

                </div>

              </div>

            </Link>
          ))}

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
          text-4xl
          md:text-5xl
          font-black
        "
      >
        {value}
      </h2>

    </div>
  );
}