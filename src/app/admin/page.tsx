"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {

  const router = useRouter();

  const [transactions, setTransactions] =
    useState<any[]>([]);

  const adminEmail =
    "waynerone999@gmail.com";

  async function loadAdmin() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      router.push("/login");

      return;
    }

    if (
      user.email !== adminEmail
    ) {

      router.push("/dashboard");

      return;
    }

    const { data } =
      await supabase
        .from("transactions")
        .select("*")
        .order("id", {
          ascending: false,
        });

    setTransactions(data || []);
  }

  useEffect(() => {

    loadAdmin();

  }, []);

  return (

    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-10">

      <div className="max-w-7xl mx-auto">

        <div className="mb-10">

          <h1 className="text-4xl md:text-6xl font-black mb-4">
            Admin Dashboard
          </h1>

          <p className="text-slate-400 text-lg">
            Manage all escrow transactions.
          </p>

        </div>

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
                  rounded-3xl
                  p-6
                  hover:border-blue-500/40
                  transition
                  cursor-pointer
                "
              >

                <div
                  className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                  "
                >

                  <div>

                    <h2 className="text-2xl font-black mb-2">
                      {tx.transaction_name}
                    </h2>

                    <p className="text-slate-400">
                      Amount: ${tx.amount}
                    </p>

                    <p className="text-slate-400">
                      Buyer: {tx.buyer_email}
                    </p>

                    <p className="text-slate-400">
                      Seller: {tx.seller_email}
                    </p>

                  </div>

                  <div
                    className="
                      bg-blue-600/20
                      text-blue-300
                      px-5
                      py-3
                      rounded-2xl
                      font-bold
                      capitalize
                      text-center
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