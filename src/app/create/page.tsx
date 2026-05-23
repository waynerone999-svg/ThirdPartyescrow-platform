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
      "PayPal",
      "Revolut",
      "Bank Transfer",
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
    name: "India",
    currency: "INR",
    methods: [
      "Wise ⭐ Recommended",
      "UPI",
      "Paytm",
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
        "Please select payment method"
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

        setLoading(false);

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

      <div className="max-w-4xl mx-auto">

        <div className="mb-12">

          <h1 className="text-6xl font-black mb-5">
            Create Escrow Transaction
          </h1>

          <p className="text-slate-400 text-xl">
            Secure payments between buyers and sellers worldwide.
          </p>

        </div>

        <div className="space-y-6">

          <div className="grid md:grid-cols-2 gap-6">

            <input
              placeholder="Transaction Name"
              value={transactionName}
              onChange={(e) =>
                setTransactionName(
                  e.target.value
                )
              }
              className="
                w-full
                bg-slate-900
                border
                border-white/10
                rounded-2xl
                px-5
                py-5
              "
            />

            <input
              placeholder="Amount"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
              className="
                w-full
                bg-slate-900
                border
                border-white/10
                rounded-2xl
                px-5
                py-5
              "
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
              className="
                w-full
                bg-slate-900
                border
                border-white/10
                rounded-2xl
                px-5
                py-5
              "
            />

            <input
              placeholder="Seller Email"
              value={sellerEmail}
              onChange={(e) =>
                setSellerEmail(
                  e.target.value
                )
              }
              className="
                w-full
                bg-slate-900
                border
                border-white/10
                rounded-2xl
                px-5
                py-5
              "
            />

          </div>

          {/* COUNTRY */}

          <div
            className="
              bg-slate-900
              border
              border-white/10
              rounded-3xl
              p-8
            "
          >

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
              className="
                w-full
                bg-slate-800
                border
                border-white/10
                rounded-2xl
                px-5
                py-5
              "
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

          {/* PAYMENT METHODS */}

          {selectedCountry && (

            <div
              className="
                bg-slate-900
                border
                border-green-500
                rounded-3xl
                p-8
              "
            >

              <div className="flex items-center justify-between mb-6">

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
                        paymentMethod ===
                        method
                          ? "bg-green-600 border-green-400 scale-[1.02]"
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

          {/* ESCROW FEES */}

          {amount && (

            <div
              className="
                bg-slate-900
                border
                border-blue-500
                rounded-3xl
                p-8
              "
            >

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

          {/* CREATE BUTTON */}

          <button
            onClick={createTransaction}
            disabled={loading}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              rounded-3xl
              py-6
              font-black
              text-2xl
            "
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