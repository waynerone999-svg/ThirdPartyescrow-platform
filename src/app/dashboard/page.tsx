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

  const [loading, setLoading] =
    useState(true);

  async function getUserAndDeals() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      router.push("/login");

      return;
    }

    setUser(user);

    const { data, error } =
      await supabase

        .from("transactions")

        .select("*")

        .or(
          `buyer_email.eq.${user.email},seller_email.eq.${user.email}`
        )

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

  if (loading) {

    return (

      <main
        className="
          min-h-screen
          bg-slate-950
          text-white
          flex
          items-center
          justify-center
        "
      >

        Loading Dashboard...

      </main>
    );
  }

  return (

    <main
      className="
        min-h-screen
        bg-slate-950
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
            xl:flex-row
            justify-between
            items-start
            xl:items-center
            gap-8
            mb-14
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
              Dashboard
            </h1>

            <p className="text-slate-400 text-lg">

              Logged in as{" "}

              <span
                className="
                  text-white
                  font-bold
                  break-all
                "
              >
                {user?.email}
              </span>

            </p>

          </div>

          {/* BUTTONS */}

          <div
            className="
              flex
              flex-col
              sm:flex-row
              gap-4
              w-full
              xl:w-auto
            "
          >

            <Link
              href="/create"

              className="w-full sm:w-auto"
            >

              <button
                className="
                  w-full
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

            <button
              onClick={logout}

              className="
                w-full
                sm:w-auto
                bg-red-600
                hover:bg-red-700
                px-8
                py-4
                rounded-2xl
                font-bold
              "
            >
              Logout
            </button>

          </div>

        </div>

        {/* PENDING */}

        <SectionTitle
          title="Pending Invitations"
        />

        <div className="space-y-5 mb-16">

          {pendingDeals.length === 0 && (

            <EmptyCard
              text="No pending invitations"
            />

          )}

          {pendingDeals.map((deal) => {

            const role =
              user?.email
                ?.toLowerCase() ===
              deal.buyer_email
                ?.toLowerCase()
                ? "buyer"
                : "seller";

            return (

              <DealCard
                key={deal.id}
                deal={deal}
                role={role}
                color="yellow"
              />

            );
          })}

        </div>

        {/* ONGOING */}

        <SectionTitle
          title="Ongoing Transactions"
        />

        <div className="space-y-5 mb-16">

          {ongoingDeals.length === 0 && (

            <EmptyCard
              text="No ongoing transactions"
            />

          )}

          {ongoingDeals.map((deal) => {

            const role =
              user?.email
                ?.toLowerCase() ===
              deal.buyer_email
                ?.toLowerCase()
                ? "buyer"
                : "seller";

            return (

              <DealCard
                key={deal.id}
                deal={deal}
                role={role}
                color="green"
              />

            );
          })}

        </div>

        {/* COMPLETED */}

        <SectionTitle
          title="Completed Deals"
        />

        <div className="space-y-5">

          {completedDeals.length === 0 && (

            <EmptyCard
              text="No completed deals"
            />

          )}

          {completedDeals.map((deal) => {

            const role =
              user?.email
                ?.toLowerCase() ===
              deal.buyer_email
                ?.toLowerCase()
                ? "buyer"
                : "seller";

            return (

              <DealCard
                key={deal.id}
                deal={deal}
                role={role}
                color="blue"
              />

            );
          })}

        </div>

      </div>

    </main>
  );
}

function SectionTitle({
  title,
}: any) {

  return (

    <h2
      className="
        text-3xl
        md:text-4xl
        font-black
        mb-8
      "
    >
      {title}
    </h2>
  );
}

function EmptyCard({
  text,
}: any) {

  return (

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
      {text}
    </div>
  );
}

function DealCard({
  deal,
  role,
  color,
}: any) {

  const colors: any = {

    yellow:
      "bg-yellow-500/20 text-yellow-300",

    green:
      "bg-green-500/20 text-green-300",

    blue:
      "bg-blue-500/20 text-blue-300",
  };

  return (

    <Link href={`/transaction/${deal.id}`}>

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
            items-start
            gap-6
            mb-5
          "
        >

          <div>

            <h3
              className="
                text-2xl
                md:text-3xl
                font-bold
                mb-3
                break-words
              "
            >
              {deal.transaction_name}
            </h3>

            <p className="text-slate-400">
              Amount:
              {" "}
              ${deal.amount}
            </p>

            <p className="text-slate-400 mt-2">
              Payment:
              {" "}
              {deal.payment_method}
            </p>

          </div>

          <div
            className={`
              ${colors[color]}
              px-4
              py-2
              rounded-full
              font-bold
              capitalize
              w-fit
            `}
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
}