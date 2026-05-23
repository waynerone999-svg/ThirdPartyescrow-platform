"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [transactions, setTransactions] =
    useState<any[]>([]);

  const [userEmail, setUserEmail] =
    useState("");

  async function loadAdmin() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      router.push("/login");

      return;
    }

    setUserEmail(user.email || "");

    /* ADMIN SECURITY */

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

    if (!error) {

      setTransactions(data || []);

    }

    setLoading(false);
  }

  async function logout() {

    await supabase.auth.signOut();

    router.push("/login");
  }

  useEffect(() => {

    loadAdmin();

  }, []);

  const pending =
    transactions.filter(
      (t) =>
        t.status === "pending"
    );

  const paid =
    transactions.filter(
      (t) =>
        t.status === "paid"
    );

  const released =
    transactions.filter(
      (t) =>
        t.status === "released"
    );

  const completed =
    transactions.filter(
      (t) =>
        t.status === "completed"
    );

  const disputed =
    transactions.filter(
      (t) =>
        t.status === "disputed"
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

        Loading Admin Dashboard...

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
        md:p-10
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
            lg:items-center
            gap-6
            mb-12
          "
        >

          <div>

            <h1
              className="
                text-4xl
                md:text-7xl
                font-black
                mb-3
              "
            >
              Admin Dashboard
            </h1>

            <p className="text-slate-400">

              Logged in as:

              {" "}

              <span className="text-white font-bold">
                {userEmail}
              </span>

            </p>

          </div>

          <button
            onClick={logout}
            className="
              bg-red-600
              hover:bg-red-700
              px-6
              py-4
              rounded-2xl
              font-bold
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
            lg:grid-cols-5
            gap-5
            mb-12
          "
        >

          <div
            className="
              bg-slate-900
              border
              border-white/10
              rounded-3xl
              p-5
            "
          >

            <p className="text-slate-400 mb-2">
              Total
            </p>

            <h2 className="text-4xl font-black">
              {transactions.length}
            </h2>

          </div>

          <div
            className="
              bg-slate-900
              border
              border-yellow-500/30
              rounded-3xl
              p-5
            "
          >

            <p className="text-yellow-400 mb-2">
              Pending
            </p>

            <h2 className="text-4xl font-black">
              {pending.length}
            </h2>

          </div>

          <div
            className="
              bg-slate-900
              border
              border-green-500/30
              rounded-3xl
              p-5
            "
          >

            <p className="text-green-400 mb-2">
              Paid
            </p>

            <h2 className="text-4xl font-black">
              {paid.length}
            </h2>

          </div>

          <div
            className="
              bg-slate-900
              border
              border-blue-500/30
              rounded-3xl
              p-5
            "
          >

            <p className="text-blue-400 mb-2">
              Completed
            </p>

            <h2 className="text-4xl font-black">
              {completed.length}
            </h2>

          </div>

          <div
            className="
              bg-slate-900
              border
              border-red-500/30
              rounded-3xl
              p-5
            "
          >

            <p className="text-red-400 mb-2">
              Disputed
            </p>

            <h2 className="text-4xl font-black">
              {disputed.length}
            </h2>

          </div>

        </div>

        {/* TRANSACTIONS */}

        <div className="space-y-6">

          {transactions.map((tx) => (

            <Link
              key={tx.id}
              href={`/transaction/${tx.id}`}
            >

              <div
                className="
                  bg-slate-900
                  border
                  border-white/10
                  hover:border-blue-500/40
                  rounded-3xl
                  p-6
                  transition
                  cursor-pointer
                "
              >

                <div
                  className="
                    flex
                    flex-col
                    xl:flex-row
                    xl:items-center
                    xl:justify-between
                    gap-6
                  "
                >

                  <div>

                    <h2
                      className="
                        text-2xl
                        md:text-3xl
                        font-black
                        mb-4
                      "
                    >
                      {tx.transaction_name}
                    </h2>

                    <div className="space-y-2 text-slate-400">

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
                        Country:
                        {" "}
                        {tx.buyer_country || "N/A"}
                      </p>

                      <p>
                        Payment:
                        {" "}
                        {tx.payment_method}
                      </p>

                      <p>
                        Code:
                        {" "}
                        {tx.transaction_code}
                      </p>

                    </div>

                  </div>

                  <div
                    className="
                      bg-blue-600/20
                      text-blue-300
                      px-6
                      py-4
                      rounded-2xl
                      font-bold
                      capitalize
                      text-center
                      min-w-[160px]
                    "
                  >
                    {tx.status}
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