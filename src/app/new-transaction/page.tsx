"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const countries = [

  {
    name: "United States",
    currency: "USD",
    methods: [
      "Wise ⭐ Recommended",
      "USDT Crypto",
      "Zelle",
      "Apple Pay",
      "Cash App",
      "Bank Transfer",
    ],
  },

  {
    name: "Kenya",
    currency: "KES",
    methods: [
      "Wise ⭐ Recommended",
      "USDT Crypto",
      "M-Pesa",
      "Airtel Money",
      "Equity Bank",
      "KCB Bank",
    ],
  },

  {
    name: "Uganda",
    currency: "UGX",
    methods: [
      "Wise ⭐ Recommended",
      "USDT Crypto",
      "MTN Mobile Money",
      "Airtel Money Uganda",
      "Stanbic Bank",
    ],
  },

  {
    name: "Tanzania",
    currency: "TZS",
    methods: [
      "Wise ⭐ Recommended",
      "USDT Crypto",
      "M-Pesa Tanzania",
      "Tigo Pesa",
      "Airtel Money",
    ],
  },

  {
    name: "Canada",
    currency: "CAD",
    methods: [
      "Wise ⭐ Recommended",
      "USDT Crypto",
      "Interac",
      "Bank Transfer",
    ],
  },

  {
    name: "Mexico",
    currency: "MXN",
    methods: [
      "Wise ⭐ Recommended",
      "USDT Crypto",
      "Bank Transfer",
    ],
  },

  {
    name: "Brazil",
    currency: "BRL",
    methods: [
      "Wise ⭐ Recommended",
      "USDT Crypto",
      "PIX",
      "Bank Transfer",
    ],
  },

  {
    name: "Argentina",
    currency: "ARS",
    methods: [
      "Wise ⭐ Recommended",
      "USDT Crypto",
      "Mercado Pago",
    ],
  },

  {
    name: "United Kingdom",
    currency: "GBP",
    methods: [
      "Wise ⭐ Recommended",
      "USDT Crypto",
      "PayPal",
      "Revolut",
      "Bank Transfer",
    ],
  },

  {
    name: "France",
    currency: "EUR",
    methods: [
      "Wise ⭐ Recommended",
      "USDT Crypto",
      "SEPA Transfer",
    ],
  },

  {
    name: "Germany",
    currency: "EUR",
    methods: [
      "Wise ⭐ Recommended",
      "USDT Crypto",
      "SEPA Transfer",
    ],
  },

  {
    name: "Spain",
    currency: "EUR",
    methods: [
      "Wise ⭐ Recommended",
      "USDT Crypto",
      "SEPA Transfer",
    ],
  },

  {
    name: "Portugal",
    currency: "EUR",
    methods: [
      "Wise ⭐ Recommended",
      "USDT Crypto",
      "MB WAY",
    ],
  },

  {
    name: "Morocco",
    currency: "MAD",
    methods: [
      "Wise ⭐ Recommended",
      "USDT Crypto",
      "Bank Transfer",
    ],
  },

  {
    name: "India",
    currency: "INR",
    methods: [
      "Wise ⭐ Recommended",
      "USDT Crypto",
      "UPI",
      "Paytm",
    ],
  },

  {
    name: "Japan",
    currency: "JPY",
    methods: [
      "Wise ⭐ Recommended",
      "USDT Crypto",
      "PayPay",
    ],
  },

];

export default function NewTransactionPage() {

  const router = useRouter();

  const [transactionName, setTransactionName] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [sellerEmail, setSellerEmail] =
    useState("");

  const [country, setCountry] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const selectedCountry =
    countries.find(
      (c) => c.name === country
    );

  const amountNumber =
    Number(amount || 0);

  const escrowFee =
    amountNumber * 0.03;

  const buyerTotal =
    amountNumber + escrowFee;

  const sellerReceives =
    amountNumber - escrowFee;

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

    if (!paymentMethod) {

      alert(
        "Select payment method"
      );

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

            amount:
              amountNumber,

            buyer_email:
              user.email,

            seller_email:
              sellerEmail,

            buyer_country:
              country,

            payment_method:
              paymentMethod,

            escrow_fee:
              escrowFee,

            buyer_total:
              buyerTotal,

            seller_receives:
              sellerReceives,

            transaction_code:
              transactionCode,

            status:
              "pending",
          },
        ])

        .select()

        .single();

    if (error) {

      alert(error.message);

      setLoading(false);

      return;
    }

    await fetch("/api/send-invite", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        email: sellerEmail,

        transactionId:
          data.id,

        transactionName,

        amount,

        buyerEmail:
          user.email,

      }),
    });

    router.push("/dashboard");
  }

  return (

    <main className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-5xl mx-auto">

        <div className="mb-14">

          <h1 className="text-6xl font-black mb-5">
            Create Escrow Transaction
          </h1>

          <p className="text-slate-400 text-xl">
            Secure global escrow transactions between buyers and sellers.
          </p>

        </div>

        <div className="space-y-7">

          <div className="grid md:grid-cols-2 gap-6">

            <input
              placeholder="Transaction Name"
              value={transactionName}
              onChange={(e) =>
                setTransactionName(
                  e.target.value
                )
              }
              className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-5"
            />

            <input
              placeholder="Amount"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
              className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-5"
            />

          </div>

          <input
            placeholder="Seller Email"
            value={sellerEmail}
            onChange={(e) =>
              setSellerEmail(
                e.target.value
              )
            }
            className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-5"
          />

          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-black mb-6">
              Buyer Country
            </h2>

            <select
              value={country}
              onChange={(e) => {

                setCountry(
                  e.target.value
                );

                setPaymentMethod("");
              }}
              className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-5"
            >

              <option value="">
                Select Country
              </option>

              {countries.map((c) => (

                <option
                  key={c.name}
                  value={c.name}
                >
                  {c.name}
                </option>

              ))}

            </select>

          </div>

          {selectedCountry && (

            <div className="bg-slate-900 border border-green-500 rounded-3xl p-8">

              <div className="flex justify-between items-center mb-7">

                <h2 className="text-3xl font-black text-green-400">
                  Payment Methods
                </h2>

                <div className="text-slate-400">
                  Currency:
                  {" "}
                  {selectedCountry.currency}
                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-4">

                {selectedCountry.methods.map(
                  (method) => (

                  <button
                    key={method}

                    type="button"

                    onClick={() =>
                      setPaymentMethod(
                        method
                      )
                    }

                    className={`
                      text-left
                      px-6
                      py-5
                      rounded-2xl
                      border
                      transition-all
                      ${
                        paymentMethod === method
                          ? "bg-green-600 border-green-400"
                          : "bg-slate-800 border-white/10 hover:bg-slate-700"
                      }
                    `}
                  >

                    <div className="font-black text-lg">
                      {method}
                    </div>

                  </button>
                ))}

              </div>

            </div>
          )}

          {amount && (

            <div className="bg-slate-900 border border-blue-500 rounded-3xl p-8">

              <h2 className="text-3xl font-black mb-8 text-blue-400">
                Escrow Breakdown
              </h2>

              <div className="space-y-5 text-lg">

                <div className="flex justify-between">
                  <span>Transaction Amount</span>
                  <span className="font-black">
                    ${amountNumber.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Escrow Fee (3%)</span>
                  <span className="font-black text-yellow-400">
                    ${escrowFee.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-white/10 pt-5 flex justify-between">
                  <span>Buyer Pays</span>
                  <span className="font-black text-green-400 text-2xl">
                    ${buyerTotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Seller Receives</span>
                  <span className="font-black text-blue-400 text-2xl">
                    ${sellerReceives.toFixed(2)}
                  </span>
                </div>

              </div>

            </div>
          )}

          <button
            onClick={
              createTransaction
            }

            disabled={loading}

            className="w-full bg-blue-600 hover:bg-blue-700 rounded-3xl py-6 font-black text-2xl"
          >

            {loading
              ? "Creating..."
              : "Create Secure Transaction"}

          </button>

        </div>

      </div>

    </main>
  );
}