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
    ],
  },

  {
    name: "Kenya",
    currency: "KES",
    methods: [
      "Wise ⭐ Recommended",
      "M-Pesa",
      "Airtel Money",
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
    ],
  },

  {
    name: "Tanzania",
    currency: "TZS",
    methods: [
      "Wise ⭐ Recommended",
      "M-Pesa Tanzania",
      "Tigo Pesa",
    ],
  },

  {
    name: "United Kingdom",
    currency: "GBP",
    methods: [
      "Wise ⭐ Recommended",
      "PayPal",
      "Bank Transfer",
    ],
  },

];

export default function HomePage() {

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

  const escrowFee =
    Number(amount || 0) * 0.03;

  const buyerPays =
    Number(amount || 0) + escrowFee;

  const sellerReceives =
    Number(amount || 0) - escrowFee;

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

            escrow_fee:
              escrowFee,

            buyer_total:
              buyerPays,

            seller_total:
              sellerReceives,

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

    <main className="min-h-screen bg-slate-950 text-white">

      {/* HERO */}

      <section className="px-8 py-24 border-b border-white/10">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          <div>

            <div className="inline-block bg-green-500/20 text-green-400 px-5 py-2 rounded-full text-sm font-bold mb-6">
              TRUSTED GLOBAL ESCROW PLATFORM
            </div>

            <h1 className="text-6xl lg:text-7xl font-black leading-tight mb-8">

              Secure Transactions Between Strangers

            </h1>

            <p className="text-slate-300 text-xl leading-relaxed mb-10">

              3rdParty Escrow protects buyers and sellers worldwide
              during ticket sales, online trading, digital goods,
              services, and high-value transactions.

            </p>

            <div className="flex flex-wrap gap-4">

              <div className="bg-slate-900 border border-white/10 px-6 py-4 rounded-2xl">
                FIFA World Cup Tickets
              </div>

              <div className="bg-slate-900 border border-white/10 px-6 py-4 rounded-2xl">
                Mobile Money
              </div>

              <div className="bg-slate-900 border border-white/10 px-6 py-4 rounded-2xl">
                Global Payments
              </div>

            </div>

          </div>

          <div className="bg-slate-900 border border-white/10 rounded-[40px] p-10">

            <h2 className="text-4xl font-black mb-8">
              Create Escrow Transaction
            </h2>

            <div className="space-y-5">

              <input
                placeholder="Transaction Name"
                value={transactionName}
                onChange={(e) =>
                  setTransactionName(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4"
              />

              <input
                placeholder="Amount"
                value={amount}
                onChange={(e) =>
                  setAmount(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4"
              />

              <input
                placeholder="Buyer Email"
                value={buyerEmail}
                onChange={(e) =>
                  setBuyerEmail(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4"
              />

              <input
                placeholder="Seller Email"
                value={sellerEmail}
                onChange={(e) =>
                  setSellerEmail(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4"
              />

              <select
                value={country}
                onChange={(e) => {

                  setCountry(
                    e.target.value
                  );

                  setPaymentMethod("");
                }}
                className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4"
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
                          paymentMethod === method
                            ? "bg-green-600 border-green-400"
                            : "bg-slate-800 border-white/10"
                        }
                      `}
                    >

                      {method}

                    </button>
                  ))}

                </div>
              )}

              {amount && (

                <div className="bg-slate-800 rounded-3xl p-6 space-y-3">

                  <h3 className="text-2xl font-black text-blue-400">
                    Escrow Breakdown
                  </h3>

                  <p>
                    Escrow Fee:
                    {" "}
                    ${escrowFee.toFixed(2)}
                  </p>

                  <p>
                    Buyer Pays:
                    {" "}
                    ${buyerPays.toFixed(2)}
                  </p>

                  <p>
                    Seller Receives:
                    {" "}
                    ${sellerReceives.toFixed(2)}
                  </p>

                </div>
              )}

              <button
                onClick={createTransaction}
                className="w-full bg-blue-600 hover:bg-blue-700 py-5 rounded-2xl font-black text-xl"
              >
                Create Secure Transaction
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}

      <section className="px-8 py-24 border-b border-white/10">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-5xl font-black mb-16 text-center">
            How 3rdParty Escrow Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">

              <div className="text-5xl font-black text-blue-400 mb-6">
                1
              </div>

              <h3 className="text-2xl font-black mb-4">
                Create Transaction
              </h3>

              <p className="text-slate-300">
                Buyer and seller agree on terms,
                amount, and payment method.
              </p>

            </div>

            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">

              <div className="text-5xl font-black text-green-400 mb-6">
                2
              </div>

              <h3 className="text-2xl font-black mb-4">
                Payment Secured
              </h3>

              <p className="text-slate-300">
                Buyer confirms payment while escrow
                secures the transaction process.
              </p>

            </div>

            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">

              <div className="text-5xl font-black text-yellow-400 mb-6">
                3
              </div>

              <h3 className="text-2xl font-black mb-4">
                Assets Delivered
              </h3>

              <p className="text-slate-300">
                Seller delivers tickets, goods,
                or services safely.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* TRUST */}

      <section className="px-8 py-24 border-b border-white/10">

        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-5xl font-black mb-10">
            Trusted Global Escrow Protection
          </h2>

          <p className="text-slate-300 text-xl max-w-4xl mx-auto mb-16">

            3rdParty Escrow helps protect online transactions
            between buyers and sellers who do not know each other.

          </p>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">
              Secure Payments
            </div>

            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">
              Global Coverage
            </div>

            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">
              Dispute Resolution
            </div>

            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">
              Real-Time Chat
            </div>

          </div>

        </div>

      </section>

      {/* FAQ */}

      <section className="px-8 py-24 border-b border-white/10">

        <div className="max-w-5xl mx-auto">

          <h2 className="text-5xl font-black mb-16 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">

            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">

              <h3 className="text-2xl font-black mb-4">
                Is 3rdParty Escrow safe?
              </h3>

              <p className="text-slate-300">
                Yes. Transactions are protected through escrow flow,
                dispute handling, and verified transaction processes.
              </p>

            </div>

            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">

              <h3 className="text-2xl font-black mb-4">
                What can I use escrow for?
              </h3>

              <p className="text-slate-300">
                Ticket sales, online services, digital products,
                gaming assets, freelancing, and more.
              </p>

            </div>

            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">

              <h3 className="text-2xl font-black mb-4">
                What happens during disputes?
              </h3>

              <p className="text-slate-300">
                Admin dispute review systems help investigate
                and resolve transaction conflicts fairly.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="px-8 py-16">

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10">

          <div>

            <h2 className="text-4xl font-black mb-4">
              3rdParty Escrow
            </h2>

            <p className="text-slate-400 max-w-xl">

              Secure online transactions between buyers
              and sellers worldwide.

            </p>

          </div>

          <div className="space-y-3 text-slate-400">

            <p>Terms & Conditions</p>

            <p>Privacy Policy</p>

            <p>Dispute Policy</p>

            <p>Global Escrow Protection</p>

          </div>

        </div>

      </footer>

    </main>
  );
}