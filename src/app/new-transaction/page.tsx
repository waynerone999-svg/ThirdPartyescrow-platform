"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NewTransactionPage() {

  const router = useRouter();

  const [user, setUser] =
    useState<any>(null);

  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [sellerEmail, setSellerEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    async function getUser() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();

  }, []);

  async function createTransaction(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    if (!user) {

      alert("Please login first");

      return;
    }

    setLoading(true);

    try {

      const transactionCode =
        "ESCROW-" +
        Math.floor(
          100000 +
            Math.random() * 900000
        );

      const { error } = await supabase
        .from("transactions")
        .insert([
          {
            transaction_name: title,
            amount: Number(amount),
            seller_email: sellerEmail,
            buyer_email: user.email,
            transaction_code:
              transactionCode,
            status: "pending",
          },
        ]);

      if (error) {

        console.log(error);

        alert("Database save failed");

        setLoading(false);

        return;
      }

      // SEND EMAIL
      await fetch("/api/send-email", {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          sellerEmail,
          transactionName: title,
          amount,
          transactionCode,
        }),
      });

      alert(
        "Transaction created successfully"
      );

      router.push("/transaction-chat");

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);
    }
  }

  return (

    <main className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-3xl mx-auto">

        <div
          className="
            bg-slate-900
            border
            border-white/10
            rounded-3xl
            p-10
          "
        >

          <h1 className="text-5xl font-black mb-4">
            Create Escrow Transaction
          </h1>

          <p className="text-slate-400 mb-10">
            Protected buyer and seller
            escrow workflow.
          </p>

          <form
            onSubmit={createTransaction}
            className="space-y-6"
          >

            {/* ITEM */}
            <div>

              <label className="block mb-3 font-bold">

                Item / Service Name

              </label>

              <input
                type="text"
                required
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="MacBook Pro M3"
                className="
                  w-full
                  bg-slate-950
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  text-white
                "
              />

            </div>

            {/* AMOUNT */}
            <div>

              <label className="block mb-3 font-bold">

                Transaction Amount

              </label>

              <input
                type="number"
                required
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                placeholder="500"
                className="
                  w-full
                  bg-slate-950
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  text-white
                "
              />

            </div>

            {/* SELLER EMAIL */}
            <div>

              <label className="block mb-3 font-bold">

                Seller Email

              </label>

              <input
                type="email"
                required
                value={sellerEmail}
                onChange={(e) =>
                  setSellerEmail(
                    e.target.value
                  )
                }
                placeholder="seller@email.com"
                className="
                  w-full
                  bg-slate-950
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  text-white
                "
              />

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                py-5
                rounded-2xl
                font-bold
                text-lg
              "
            >

              {loading
                ? "Creating Transaction..."
                : "Create Escrow"}

            </button>

          </form>

        </div>

      </div>

    </main>
  );
}