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

  async function loadSellerTransactions() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      router.push("/login");

      return;
    }

    setUser(user);

    /* ONLY THIS SELLER'S DEALS */

    const { data, error } =
      await supabase

        .from("transactions")

        .select("*")

        .eq(
          "seller_email",
          user.email
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

    loadSellerTransactions();

  }, []);

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

        Loading Seller Requests...

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

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="mb-12">

          <h1
            className="
              text-4xl
              md:text-6xl
              font-black
              mb-4
            "
          >
            Seller Requests
          </h1>

          <p className="text-slate-400 text-lg">
            Transactions where you are the seller
          </p>

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
            No seller requests found.
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

                  <div>

                    <h2
                      className="
                        text-2xl
                        md:text-3xl
                        font-bold
                        mb-3
                      "
                    >
                      {deal.transaction_name}
                    </h2>

                    <p className="text-slate-400">
                      Amount:
                      {" "}
                      ${deal.amount}
                    </p>

                    <p className="text-slate-400 mt-2">
                      Buyer:
                      {" "}
                      {deal.buyer_email}
                    </p>

                    <p className="text-slate-400 mt-2">
                      Payment:
                      {" "}
                      {deal.payment_method}
                    </p>

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