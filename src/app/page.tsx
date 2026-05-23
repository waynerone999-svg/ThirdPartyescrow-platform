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
      "Zelle",
      "Cash App",
      "Apple Pay",
      "Venmo",
      "Bank Transfer",
    ],
  },

  {
    name: "Kenya",
    currency: "KES",
    methods: [
      "Wise ⭐ Recommended",
      "M-Pesa",
      "Airtel Money",
      "KCB Bank",
      "Equity Bank",
    ],
  },

  {
    name: "Uganda",
    currency: "UGX",
    methods: [
      "Wise ⭐ Recommended",
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
      "M-Pesa Tanzania",
      "Tigo Pesa",
      "Airtel Money",
      "CRDB Bank",
    ],
  },

  {
    name: "Nigeria",
    currency: "NGN",
    methods: [
      "Wise ⭐ Recommended",
      "Opay",
      "PalmPay",
      "Bank Transfer",
    ],
  },

  {
    name: "United Kingdom",
    currency: "GBP",
    methods: [
      "Wise ⭐ Recommended",
      "Bank Transfer",
      "PayPal",
      "Revolut",
    ],
  },

  {
    name: "Canada",
    currency: "CAD",
    methods: [
      "Wise ⭐ Recommended",
      "Interac",
      "Bank Transfer",
    ],
  },

  {
    name: "Mexico",
    currency: "MXN",
    methods: [
      "Wise ⭐ Recommended",
      "OXXO",
      "Bank Transfer",
    ],
  },

  {
    name: "Brazil",
    currency: "BRL",
    methods: [
      "Wise ⭐ Recommended",
      "PIX",
      "Bank Transfer",
    ],
  },

  {
    name: "Argentina",
    currency: "ARS",
    methods: [
      "Wise ⭐ Recommended",
      "Mercado Pago",
      "Bank Transfer",
    ],
  },

  {
    name: "France",
    currency: "EUR",
    methods: [
      "Wise ⭐ Recommended",
      "SEPA Transfer",
      "PayPal",
    ],
  },

  {
    name: "Germany",
    currency: "EUR",
    methods: [
      "Wise ⭐ Recommended",
      "SEPA Transfer",
      "Revolut",
    ],
  },

  {
    name: "Spain",
    currency: "EUR",
    methods: [
      "Wise ⭐ Recommended",
      "SEPA Transfer",
      "Bizum",
    ],
  },

  {
    name: "Portugal",
    currency: "EUR",
    methods: [
      "Wise ⭐ Recommended",
      "MB WAY",
      "SEPA Transfer",
    ],
  },

  {
    name: "Morocco",
    currency: "MAD",
    methods: [
      "Wise ⭐ Recommended",
      "Cash Plus",
      "Bank Transfer",
    ],
  },

  {
    name: "Saudi Arabia",
    currency: "SAR",
    methods: [
      "Wise ⭐ Recommended",
      "STC Pay",
      "Bank Transfer",
    ],
  },

  {
    name: "Qatar",
    currency: "QAR",
    methods: [
      "Wise ⭐ Recommended",
      "QNB Transfer",
      "Bank Transfer",
    ],
  },

  {
    name: "India",
    currency: "INR",
    methods: [
      "Wise ⭐ Recommended",
      "UPI",
      "Paytm",
      "Bank Transfer",
    ],
  },

  {
    name: "Japan",
    currency: "JPY",
    methods: [
      "Wise ⭐ Recommended",
      "PayPay",
      "Bank Transfer",
    ],
  },

  {
    name: "South Korea",
    currency: "KRW",
    methods: [
      "Wise ⭐ Recommended",
      "Kakao Pay",
      "Bank Transfer",
    ],
  },

];

export default function CreateTransactionPage() {

  const router = useRouter();

  const [transactionName, setTransactionName] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [buyerEmail, setBuyerEmail] =
    useState("");

  const [sellerEmail, setSellerEmail] =
    useState("");

  const [country, setCountry] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("");

  const selectedCountry =
    countries.find(
      (c) => c.name === country
    );

  async function createTransaction() {

    const code =
      Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase();

    const { data, error } =
      await supabase
        .from("transactions")
        .insert([
          {
            transaction_name:
              transactionName,

            amount,

            buyer_email:
              buyerEmail,

            seller_email:
              sellerEmail,

            transaction_code:
              code,

            payment_method:
              paymentMethod,

            buyer_country:
              country,

            status: "pending",
          },
        ])
        .select()
        .single();

    if (error) {

      alert(error.message);

      return;
    }

    router.push(
      `/transaction/${data.id}`
    );
  }

  return (

    <main className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-5xl font-black mb-10">
          Create Escrow Transaction
        </h1>

        <div className="space-y-6">

          <input
            placeholder="Transaction Name"
            value={transactionName}
            onChange={(e) =>
              setTransactionName(
                e.target.value
              )
            }
            className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4"
          />

          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4"
          />

          <input
            placeholder="Buyer Email"
            value={buyerEmail}
            onChange={(e) =>
              setBuyerEmail(
                e.target.value
              )
            }
            className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4"
          />

          <input
            placeholder="Seller Email"
            value={sellerEmail}
            onChange={(e) =>
              setSellerEmail(
                e.target.value
              )
            }
            className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4"
          />

          <select
            value={country}
            onChange={(e) => {

              setCountry(
                e.target.value
              );

              setPaymentMethod("");
            }}
            className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4"
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

          {selectedCountry && (

            <div
              className="
                bg-slate-900
                border
                border-green-500
                rounded-3xl
                p-6
              "
            >

              <h2 className="text-2xl font-black mb-4 text-green-400">
                Payment Methods
              </h2>

              <p className="mb-5 text-slate-400">
                Currency:
                {" "}
                {selectedCountry.currency}
              </p>

              <div className="space-y-3">

                {selectedCountry.methods.map(
                  (method) => (

                  <button
                    key={method}

                    onClick={() =>
                      setPaymentMethod(
                        method
                      )
                    }

                    className={`
                      w-full
                      text-left
                      px-5
                      py-4
                      rounded-2xl
                      border
                      ${
                        paymentMethod ===
                        method
                          ? "bg-green-600 border-green-400"
                          : "bg-slate-800 border-white/10"
                      }
                    `}
                  >

                    {method}

                  </button>
                ))}

              </div>

            </div>
          )}

          <button
            onClick={createTransaction}
            className="w-full bg-blue-600 hover:bg-blue-700 rounded-2xl py-5 font-black text-xl"
          >
            Create Transaction
          </button>

        </div>

      </div>

    </main>
  );
}