"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {

  const router = useRouter();

  const [user, setUser] =
    useState<any>(null);

  const [transactions, setTransactions] =
    useState<any[]>([]);

  async function checkAdmin() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      router.push("/login");

      return;
    }

    const adminEmail =
      process.env
        .NEXT_PUBLIC_ADMIN_EMAIL;

    if (user.email !== adminEmail) {

      alert("Access denied");

      router.push("/");

      return;
    }

    setUser(user);
  }

  async function loadTransactions() {

    const { data } = await supabase
      .from("transactions")
      .select("*")
      .order("id", {
        ascending: false,
      });

    setTransactions(data || []);
  }

  async function approveTransaction(
    id: number
  ) {

    await supabase
      .from("transactions")
      .update({
        status: "admin_approved",
      })
      .eq("id", id);

    loadTransactions();
  }

  async function refundBuyer(
    id: number
  ) {

    await supabase
      .from("transactions")
      .update({
        status: "refunded",
      })
      .eq("id", id);

    loadTransactions();
  }

  async function forceRelease(
    id: number
  ) {

    await supabase
      .from("transactions")
      .update({
        status: "force_released",
      })
      .eq("id", id);

    loadTransactions();
  }

  async function resolveDispute(
    id: number
  ) {

    await supabase
      .from("transactions")
      .update({
        status: "dispute_resolved",
      })
      .eq("id", id);

    loadTransactions();
  }

  useEffect(() => {

    checkAdmin();

  }, []);

  useEffect(() => {

    if (!user) return;

    loadTransactions();

    const interval =
      setInterval(() => {

        loadTransactions();

      }, 2000);

    return () =>
      clearInterval(interval);

  }, [user]);

  return (

    <main className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-5xl font-black mb-4">
            Admin Dashboard
          </h1>

          <p className="text-slate-400 text-lg">
            Manage escrow disputes,
            releases and refunds.
          </p>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6 mb-10">

          <div
            className="
              bg-slate-900
              border
              border-white/10
              rounded-3xl
              p-6
            "
          >

            <div className="text-slate-400 mb-2">
              Total Transactions
            </div>

            <div className="text-4xl font-black">
              {transactions.length}
            </div>

          </div>

          <div
            className="
              bg-slate-900
              border
              border-white/10
              rounded-3xl
              p-6
            "
          >

            <div className="text-slate-400 mb-2">
              Disputes
            </div>

            <div className="text-4xl font-black text-red-400">

              {
                transactions.filter(
                  (t) =>
                    t.status ===
                    "disputed"
                ).length
              }

            </div>

          </div>

          <div
            className="
              bg-slate-900
              border
              border-white/10
              rounded-3xl
              p-6
            "
          >

            <div className="text-slate-400 mb-2">
              Completed
            </div>

            <div className="text-4xl font-black text-green-400">

              {
                transactions.filter(
                  (t) =>
                    t.status ===
                    "completed"
                ).length
              }

            </div>

          </div>

          <div
            className="
              bg-slate-900
              border
              border-white/10
              rounded-3xl
              p-6
            "
          >

            <div className="text-slate-400 mb-2">
              Active
            </div>

            <div className="text-4xl font-black text-blue-400">

              {
                transactions.filter(
                  (t) =>
                    t.status !==
                    "completed"
                ).length
              }

            </div>

          </div>

        </div>

        {/* TRANSACTIONS */}
        <div className="space-y-8">

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

                  <h2 className="text-3xl font-bold mb-5">
                    {
                      transaction.transaction_name
                    }
                  </h2>

                  <div className="space-y-2 text-slate-300">

                    <p>
                      <strong>
                        Buyer:
                      </strong>{" "}
                      {
                        transaction.buyer_email
                      }
                    </p>

                    <p>
                      <strong>
                        Seller:
                      </strong>{" "}
                      {
                        transaction.seller_email
                      }
                    </p>

                    <p>
                      <strong>
                        Amount:
                      </strong>{" "}
                      $
                      {
                        transaction.amount
                      }
                    </p>

                    <p>
                      <strong>
                        Status:
                      </strong>{" "}
                      {
                        transaction.status
                      }
                    </p>

                    <p>
                      <strong>
                        Escrow Code:
                      </strong>{" "}
                      {
                        transaction.transaction_code
                      }
                    </p>

                  </div>

                </div>

                {/* ACTIONS */}
                <div className="flex flex-col gap-4">

                  <button
                    onClick={() =>
                      approveTransaction(
                        transaction.id
                      )
                    }
                    className="
                      bg-blue-600
                      hover:bg-blue-700
                      px-6
                      py-3
                      rounded-2xl
                      font-bold
                    "
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      refundBuyer(
                        transaction.id
                      )
                    }
                    className="
                      bg-yellow-600
                      hover:bg-yellow-700
                      px-6
                      py-3
                      rounded-2xl
                      font-bold
                    "
                  >
                    Refund Buyer
                  </button>

                  <button
                    onClick={() =>
                      forceRelease(
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
                    Force Release
                  </button>

                  <button
                    onClick={() =>
                      resolveDispute(
                        transaction.id
                      )
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
                    Resolve Dispute
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}