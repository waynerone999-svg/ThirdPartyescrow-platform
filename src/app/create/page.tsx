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

              transaction_code:
                code,

              payment_method:
                paymentMethod,

              buyer_country:
                country,

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

      <div className="max-w-3xl mx-auto">

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

          {amount && (

            <div
              className="
                bg-slate-900
                border
                border-blue-500
                rounded-3xl
                p-8
                space-y-4
              "
            >

              <h2 className="text-3xl font-black text-blue-400">
                Escrow Fee Breakdown
              </h2>

              <div className="space-y-3 text-lg">

                <p>
                  Transaction Amount:
                  <span className="font-black ml-2">
                    ${amountNumber.toFixed(2)}
                  </span>
                </p>

                <p>
                  Escrow Fee (3%):
                  <span className="font-black ml-2 text-yellow-400">
                    ${escrowFee.toFixed(2)}
                  </span>
                </p>

                <p>
                  Buyer Pays:
                  <span className="font-black ml-2 text-green-400">
                    ${buyerTotal.toFixed(2)}
                  </span>
                </p>

                <p>
                  Seller Receives:
                  <span className="font-black ml-2 text-blue-400">
                    ${sellerReceives.toFixed(2)}
                  </span>
                </p>

              </div>

            </div>
          )}

          <button
            onClick={createTransaction}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 rounded-2xl py-5 font-black text-xl"
          >

            {loading
              ? "Creating Transaction..."
              : "Create Transaction"}

          </button>

        </div>

      </div>

    </main>
  );
}