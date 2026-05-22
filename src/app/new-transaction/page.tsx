"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NewTransactionPage() {

  const router = useRouter();

  const [transactionName, setTransactionName] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [sellerEmail, setSellerEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function createTransaction() {

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      alert("Please login");

      setLoading(false);

      return;
    }

    const transactionCode =
      Math.floor(
        100000 + Math.random() * 900000
      ).toString();

    const { data, error } =
      await supabase

        .from("transactions")

        .insert([
          {
            transaction_name:
              transactionName,

            amount,

            buyer_email:
              user.email,

            seller_email:
              sellerEmail,

            transaction_code:
              transactionCode,

            status: "pending",
          },
        ])

        .select()

        .single();

    if (error) {

      alert(error.message);

      setLoading(false);

      return;
    }

    /* INVITE LINK */
    const inviteLink =
      "http://localhost:3000/register?invited=true";

    /* EMAIL */
    await fetch("/api/send-email", {

      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({

        to: sellerEmail,

        subject:
          "Escrow Transaction Invitation",

        html: `
          <div style="font-family:sans-serif;padding:20px">

            <h1>
              You have been invited
              to an escrow transaction
            </h1>

            <p>
              Transaction:
              ${transactionName}
            </p>

            <p>
              Amount:
              $${amount}
            </p>

            <p>
              Create your account
              below to continue:
            </p>

            <a
              href="${inviteLink}"
              style="
                display:inline-block;
                margin-top:20px;
                background:#2563eb;
                color:white;
                padding:14px 24px;
                border-radius:12px;
                text-decoration:none;
                font-weight:bold;
              "
            >
              Create Account
            </a>

          </div>
        `,
      }),
    });

    router.push("/dashboard");
  }

  return (

    <main
      className="
        min-h-screen
        bg-slate-950
        text-white
        flex
        items-center
        justify-center
        p-6
      "
    >

      <div
        className="
          w-full
          max-w-2xl
          bg-slate-900
          border
          border-white/10
          rounded-3xl
          p-10
        "
      >

        <h1
          className="
            text-5xl
            font-black
            mb-10
          "
        >
          Create Transaction
        </h1>

        <div className="space-y-6">

          <input
            type="text"

            placeholder="Transaction name"

            value={transactionName}

            onChange={(e) =>
              setTransactionName(
                e.target.value
              )
            }

            className="
              w-full
              bg-slate-800
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
            "
          />

          <input
            type="number"

            placeholder="Amount"

            value={amount}

            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }

            className="
              w-full
              bg-slate-800
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
            "
          />

          <input
            type="email"

            placeholder="Seller email"

            value={sellerEmail}

            onChange={(e) =>
              setSellerEmail(
                e.target.value
              )
            }

            className="
              w-full
              bg-slate-800
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
            "
          />

          <button
            onClick={
              createTransaction
            }

            disabled={loading}

            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              rounded-2xl
              py-4
              font-bold
              text-lg
            "
          >

            {loading
              ? "Creating..."
              : "Create Transaction"}

          </button>

        </div>

      </div>

    </main>
  );
}