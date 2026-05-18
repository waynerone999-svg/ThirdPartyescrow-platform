"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TransactionsPage() {

  const [transactions, setTransactions] =
    useState<any[]>([]);

  async function loadTransactions() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

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

    loadTransactions();

  }, []);

  return (

    <main className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-black mb-10">
          Your Transactions
        </h1>

        <div className="space-y-6">

          {transactions.map((transaction) => (

            <Link
              key={transaction.id}
              href={`/transaction/${transaction.id}`}
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

                <h2 className="text-3xl font-bold mb-4">
                  {transaction.transaction_name}
                </h2>

                <div className="space-y-2 text-slate-300">

                  <p>
                    Amount: ${transaction.amount}
                  </p>

                  <p>
                    Status: {transaction.status}
                  </p>

                  <p>
                    Escrow Code:
                    {" "}
                    {transaction.transaction_code}
                  </p>

                </div>

              </div>

            </Link>
          ))}

        </div>

      </div>

    </main>
  );
}