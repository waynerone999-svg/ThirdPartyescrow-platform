"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {

  const router = useRouter();

  return (

    <main className="min-h-screen bg-slate-950 text-white">

      {/* HERO SECTION */}

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
              services, freelancing, gaming assets, and high-value
              transactions.

            </p>

            <div className="flex flex-wrap gap-4 mb-12">

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

            <div className="flex flex-wrap gap-5">

              <button
                onClick={() =>
                  router.push("/create")
                }
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  px-10
                  py-5
                  rounded-2xl
                  font-black
                  text-xl
                "
              >
                Start Secure Transaction
              </button>

              <button
                onClick={() =>
                  router.push("/login")
                }
                className="
                  border
                  border-white/20
                  hover:bg-white/10
                  px-10
                  py-5
                  rounded-2xl
                  font-black
                  text-xl
                "
              >
                Login
              </button>

            </div>

          </div>

          {/* RIGHT SIDE CARD */}

          <div
            className="
              bg-slate-900
              border
              border-white/10
              rounded-[40px]
              p-10
            "
          >

            <h2 className="text-4xl font-black mb-8">
              Why Use Escrow?
            </h2>

            <div className="space-y-6">

              <div className="bg-slate-800 rounded-3xl p-6">

                <h3 className="text-2xl font-black mb-3 text-green-400">
                  Buyer Protection
                </h3>

                <p className="text-slate-300">
                  Buyers avoid scams by using secure
                  escrow confirmation before delivery.
                </p>

              </div>

              <div className="bg-slate-800 rounded-3xl p-6">

                <h3 className="text-2xl font-black mb-3 text-blue-400">
                  Seller Protection
                </h3>

                <p className="text-slate-300">
                  Sellers confirm buyer payment before
                  releasing tickets, products, or services.
                </p>

              </div>

              <div className="bg-slate-800 rounded-3xl p-6">

                <h3 className="text-2xl font-black mb-3 text-yellow-400">
                  Dispute Resolution
                </h3>

                <p className="text-slate-300">
                  Admin review systems help resolve
                  transaction disputes fairly.
                </p>

              </div>

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

            <div
              className="
                bg-slate-900
                border
                border-white/10
                rounded-3xl
                p-8
              "
            >

              <div className="text-5xl font-black text-blue-400 mb-6">
                1
              </div>

              <h3 className="text-2xl font-black mb-4">
                Create Transaction
              </h3>

              <p className="text-slate-300">
                Buyer and seller agree on the transaction
                details and payment method.
              </p>

            </div>

            <div
              className="
                bg-slate-900
                border
                border-white/10
                rounded-3xl
                p-8
              "
            >

              <div className="text-5xl font-black text-green-400 mb-6">
                2
              </div>

              <h3 className="text-2xl font-black mb-4">
                Payment Confirmation
              </h3>

              <p className="text-slate-300">
                Buyer confirms payment while escrow
                secures the transaction process.
              </p>

            </div>

            <div
              className="
                bg-slate-900
                border
                border-white/10
                rounded-3xl
                p-8
              "
            >

              <div className="text-5xl font-black text-yellow-400 mb-6">
                3
              </div>

              <h3 className="text-2xl font-black mb-4">
                Delivery & Completion
              </h3>

              <p className="text-slate-300">
                Seller delivers assets safely and buyer
                confirms successful transaction.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* TRUST SECTION */}

      <section className="px-8 py-24 border-b border-white/10">

        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-5xl font-black mb-10">
            Trusted Global Escrow Protection
          </h2>

          <p className="text-slate-300 text-xl max-w-4xl mx-auto mb-16">

            3rdParty Escrow helps secure transactions
            between buyers and sellers who do not know
            each other across multiple countries worldwide.

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

      {/* FIFA EXAMPLE */}

      <section className="px-8 py-24 border-b border-white/10">

        <div className="max-w-6xl mx-auto">

          <div
            className="
              bg-gradient-to-r
              from-blue-900
              to-slate-900
              border
              border-blue-500
              rounded-[40px]
              p-12
            "
          >

            <h2 className="text-5xl font-black mb-8">
              Example Use Cases
            </h2>

            <div className="grid md:grid-cols-2 gap-8">

              <div className="bg-slate-950/50 rounded-3xl p-8">

                <h3 className="text-3xl font-black mb-4 text-green-400">
                  FIFA World Cup Tickets
                </h3>

                <p className="text-slate-300">
                  Buyers safely purchase expensive
                  match tickets from strangers online
                  without risking scams.
                </p>

              </div>

              <div className="bg-slate-950/50 rounded-3xl p-8">

                <h3 className="text-3xl font-black mb-4 text-yellow-400">
                  Digital Services
                </h3>

                <p className="text-slate-300">
                  Freelancers and clients securely
                  exchange payments and services globally.
                </p>

              </div>

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

            <div
              className="
                bg-slate-900
                border
                border-white/10
                rounded-3xl
                p-8
              "
            >

              <h3 className="text-2xl font-black mb-4">
                Is 3rdParty Escrow secure?
              </h3>

              <p className="text-slate-300">
                Yes. Transactions are protected through
                escrow confirmation systems and dispute handling.
              </p>

            </div>

            <div
              className="
                bg-slate-900
                border
                border-white/10
                rounded-3xl
                p-8
              "
            >

              <h3 className="text-2xl font-black mb-4">
                What can escrow be used for?
              </h3>

              <p className="text-slate-300">
                Ticket sales, gaming assets, freelancing,
                online services, digital goods, and more.
              </p>

            </div>

            <div
              className="
                bg-slate-900
                border
                border-white/10
                rounded-3xl
                p-8
              "
            >

              <h3 className="text-2xl font-black mb-4">
                What happens if there is a dispute?
              </h3>

              <p className="text-slate-300">
                Admin review systems investigate disputes
                and help determine fair resolutions.
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