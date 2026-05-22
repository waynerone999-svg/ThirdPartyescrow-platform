"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {

  const [transactions, setTransactions] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadTransactions() {

    const {
      data,
      error,
    } = await supabase

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

  useEffect(() => {

    loadTransactions();

  }, []);

  if (loading) {

    return (

      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        Loading Admin Dashboard...

      </main>
    );
  }

  return (

    <main className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-7xl mx-auto">

        <div className="mb-10">

          <h1 className="text-6xl font-black mb-4">
            ADMIN DASHBOARD
          </h1>

          <p className="text-slate-400 text-lg">
            Escrow transaction monitoring center
          </p>

        </div>

        <div className="grid gap-6">

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
                  rounded-3xl
                  p-6
                  hover:border-blue-500
                  transition
                  cursor-pointer
                "
              >

                <div className="flex justify-between items-start mb-4">

                  <div>

                    <h2 className="text-3xl font-black mb-2">
                      {tx.transaction_name}
                    </h2>

                    <p className="text-slate-400">
                      Transaction ID:
                      {" "}
                      {tx.id}
                    </p>

                  </div>

                  <div
                    className="
                      bg-blue-600
                      px-4
                      py-2
                      rounded-2xl
                      font-bold
                    "
                  >
                    {tx.status}
                  </div>

                </div>

                <div className="grid md:grid-cols-2 gap-4 text-slate-300">

                  <div>

                    <p>
                      Buyer:
                    </p>

                    <p className="font-bold">
                      {tx.buyer_email}
                    </p>

                  </div>

                  <div>

                    <p>
                      Seller:
                    </p>

                    <p className="font-bold">
                      {tx.seller_email}
                    </p>

                  </div>

                  <div>

                    <p>
                      Amount:
                    </p>

                    <p className="font-bold text-green-400">
                      ${tx.amount}
                    </p>

                  </div>

                  <div>

                    <p>
                      Payment Method:
                    </p>

                    <p className="font-bold">
                      {tx.payment_method}
                    </p>

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