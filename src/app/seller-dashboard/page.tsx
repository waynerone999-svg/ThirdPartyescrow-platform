"use client";

import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SellerDashboardPage() {

  const [transactions, setTransactions] =
    useState<any[]>([]);

  async function loadTransactions() {

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("id", { ascending: false });

    if (error) {

      console.log(error);

      return;
    }

    setTransactions(data || []);
  }

  async function acceptTransaction(id: number) {

    const { error } = await supabase
      .from("transactions")
      .update({
        status: "accepted",
      })
      .eq("id", id);

    if (error) {

      console.log(error);

      alert("Failed to accept");

      return;
    }

    // FORCE REDIRECT
    window.location.href =
      "/transaction-chat";
  }

  useEffect(() => {

    loadTransactions();

  }, []);

  return (

    <main className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-5xl mx-auto">

        <div className="mb-10">

          <h1 className="text-5xl font-black mb-4">
            Seller Dashboard
          </h1>

          <p className="text-slate-400 text-lg">
            Pending escrow invitations.
          </p>

        </div>

        <div className="space-y-6">

          {transactions.map((transaction) => (

            <div
              key={transaction.id}
              className="
                bg-slate-900
                border
                border-white/10
                rounded-3xl
                p-8
              "
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-2xl font-bold mb-3">
                    {transaction.transaction_name}
                  </h2>

                  <div className="space-y-2 text-slate-300">

                    <p>
                      <strong>Escrow Code:</strong>{" "}
                      {transaction.transaction_code}
                    </p>

                    <p>
                      <strong>Amount:</strong> $
                      {transaction.amount}
                    </p>

                    <p>
                      <strong>Status:</strong>{" "}
                      {transaction.status}
                    </p>

                  </div>

                </div>

                <div>

                  {transaction.status ===
                  "pending" ? (

                    <button
                      onClick={() =>
                        acceptTransaction(
                          transaction.id
                        )
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
                      Accept Transaction
                    </button>

                  ) : (

                    <div
                      className="
                        bg-green-500/20
                        text-green-400
                        px-5
                        py-3
                        rounded-2xl
                        font-bold
                      "
                    >
                      Accepted
                    </div>

                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}