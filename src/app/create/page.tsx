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
      "Wise ⭐ RECOMMENDED",
      "USDT Crypto",
      "Zelle",
      "Apple Pay",
      "Bank Transfer",
    ],
  },

  {
    name: "Canada",
    currency: "CAD",
    methods: [
      "Wise ⭐ RECOMMENDED",
      "USDT Crypto",
      "Interac",
      "Bank Transfer",
    ],
  },

  {
    name: "Mexico",
    currency: "MXN",
    methods: [
      "Wise ⭐ RECOMMENDED",
      "USDT Crypto",
      "OXXO",
      "Bank Transfer",
    ],
  },

  {
    name: "Brazil",
    currency: "BRL",
    methods: [
      "Wise ⭐ RECOMMENDED",
      "USDT Crypto",
      "PIX",
      "Bank Transfer",
    ],
  },

  {
    name: "Argentina",
    currency: "ARS",
    methods: [
      "Wise ⭐ RECOMMENDED",
      "USDT Crypto",
      "Mercado Pago",
      "Bank Transfer",
    ],
  },

  {
    name: "England",
    currency: "GBP",
    methods: [
      "Wise ⭐ RECOMMENDED",
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
      "Wise ⭐ RECOMMENDED",
      "USDT Crypto",
      "SEPA Transfer",
      "PayPal",
    ],
  },

  {
    name: "Germany",
    currency: "EUR",
    methods: [
      "Wise ⭐ RECOMMENDED",
      "USDT Crypto",
      "SEPA Transfer",
      "Revolut",
    ],
  },

  {
    name: "Spain",
    currency: "EUR",
    methods: [
      "Wise ⭐ RECOMMENDED",
      "USDT Crypto",
      "Bizum",
      "SEPA Transfer",
    ],
  },

  {
    name: "Portugal",
    currency: "EUR",
    methods: [
      "Wise ⭐ RECOMMENDED",
      "USDT Crypto",
      "MB WAY",
      "SEPA Transfer",
    ],
  },

  {
    name: "Netherlands",
    currency: "EUR",
    methods: [
      "Wise ⭐ RECOMMENDED",
      "USDT Crypto",
      "iDEAL",
      "SEPA Transfer",
    ],
  },

  {
    name: "Belgium",
    currency: "EUR",
    methods: [
      "Wise ⭐ RECOMMENDED",
      "USDT Crypto",
      "Bancontact",
      "SEPA Transfer",
    ],
  },

  {
    name: "Italy",
    currency: "EUR",
    methods: [
      "Wise ⭐ RECOMMENDED",
      "USDT Crypto",
      "PostePay",
      "SEPA Transfer",
    ],
  },

  {
    name: "Morocco",
    currency: "MAD",
    methods: [
      "Wise ⭐ RECOMMENDED",
      "USDT Crypto",
      "Cash Plus",
      "Bank Transfer",
    ],
  },

  {
    name: "Nigeria",
    currency: "NGN",
    methods: [
      "Wise ⭐ RECOMMENDED",
      "USDT Crypto",
      "Opay",
      "PalmPay",
      "Bank Transfer",
    ],
  },

  {
    name: "Kenya",
    currency: "KES",
    methods: [
      "Wise ⭐ RECOMMENDED",
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
      "Wise ⭐ RECOMMENDED",
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
      "Wise ⭐ RECOMMENDED",
      "USDT Crypto",
      "M-Pesa Tanzania",
      "Tigo Pesa",
      "Airtel Money",
      "CRDB Bank",
    ],
  },

  {
    name: "South Africa",
    currency: "ZAR",
    methods: [
      "Wise ⭐ RECOMMENDED",
      "USDT Crypto",
      "Capitec",
      "FNB",
      "Bank Transfer",
    ],
  },

  {
    name: "Saudi Arabia",
    currency: "SAR",
    methods: [
      "Wise ⭐ RECOMMENDED",
      "USDT Crypto",
      "STC Pay",
      "Bank Transfer",
    ],
  },

  {
    name: "Qatar",
    currency: "QAR",
    methods: [
      "Wise ⭐ RECOMMENDED",
      "USDT Crypto",
      "QNB",
      "Bank Transfer",
    ],
  },

  {
    name: "India",
    currency: "INR",
    methods: [
      "Wise ⭐ RECOMMENDED",
      "USDT Crypto",
      "UPI",
      "Paytm",
      "PhonePe",
      "Bank Transfer",
    ],
  },

  {
    name: "Japan",
    currency: "JPY",
    methods: [
      "Wise ⭐ RECOMMENDED",
      "USDT Crypto",
      "PayPay",
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

    if (!paymentMethod) {

      alert(
        "Select payment method"
      );

      return;
    }

    try {

      setLoading(true);

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

              amount:
                amountNumber,

              buyer_email:
                buyerEmail,

              seller_email:
                sellerEmail,

              buyer_country:
                country,

              payment_method:
                paymentMethod,

              transaction_code:
                code,

              escrow_fee:
                escrowFee,

              buyer_total:
                buyerTotal,

              seller_receives:
                sellerReceives,

              status:
                "pending",
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

    } catch (err) {

      console.log(err);

      alert(
        "Failed to create transaction"
      );
    }
  }

  return (

    <main className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-5xl mx-auto">

        <div className="mb-12">

          <h1 className="text-6xl font-black mb-5">
            Create Escrow Transaction
          </h1>

          <p className="text-slate-400 text-xl">
            Buyer selects country → payment methods appear automatically.
          </p>

        </div>

        <div className="space-y-8">

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

          <div className="grid md:grid-cols-2 gap-6">

            <input
              placeholder="Buyer Email"
              value={buyerEmail}
              onChange={(e) =>
                setBuyerEmail(
                  e.target.value
                )
              }
              className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-5"
            />

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

          </div>

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

              <div className="flex justify-between items-center mb-8">

                <h2 className="text-4xl font-black text-green-400">
                  Payment Methods
                </h2>

                <div className="text-slate-400 text-lg">
                  Currency:
                  {" "}
                  {selectedCountry.currency}
                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-5">

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
                      py-6
                      rounded-3xl
                      border
                      transition-all
                      ${
                        paymentMethod ===
                        method
                          ? "bg-green-600 border-green-400 scale-[1.02]"
                          : "bg-slate-800 border-white/10 hover:bg-slate-700"
                      }
                    `}
                  >

                    <div className="font-black text-xl">
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
            onClick={createTransaction}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 rounded-3xl py-6 font-black text-2xl"
          >

            {loading
              ? "Creating Transaction..."
              : "Create Secure Transaction"}

          </button>

        </div>

      </div>

    </main>
  );
}