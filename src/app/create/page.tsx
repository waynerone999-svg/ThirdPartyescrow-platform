"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {

  const router = useRouter();

  return (

    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* NAVBAR */}

      <nav className="border-b border-white/10">

        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-black">
              3rdParty Escrow
            </h1>

          </div>

          <div className="flex gap-4">

            <button
              onClick={() =>
                router.push("/login")
              }
              className="
                border
                border-white/20
                hover:bg-white/10
                px-6
                py-3
                rounded-2xl
                font-bold
              "
            >
              Login
            </button>

            <button
              onClick={() =>
                router.push("/register")
              }
              className="
                bg-blue-600
                hover:bg-blue-700
                px-6
                py-3
                rounded-2xl
                font-bold
              "
            >
              Create Account
            </button>

          </div>

        </div>

      </nav>

      {/* HERO */}

      <section className="px-8 py-28 border-b border-white/10">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}

          <div>

            <div className="inline-block bg-green-500/20 text-green-400 px-5 py-2 rounded-full text-sm font-bold mb-8">
              GLOBAL ESCROW PROTECTION PLATFORM
            </div>

            <h1 className="text-6xl lg:text-7xl font-black leading-tight mb-8">

              Secure Transactions Between Strangers

            </h1>

            <p className="text-slate-300 text-xl leading-relaxed mb-10">

              3rdParty Escrow protects buyers and sellers worldwide
              during online transactions including FIFA World Cup tickets,
              digital assets, freelancing, services, gaming, and
              high-value online trades.

            </p>

            <div className="flex flex-wrap gap-4 mb-12">

              <div className="bg-slate-900 border border-white/10 px-6 py-4 rounded-2xl">
                FIFA World Cup Tickets
              </div>

              <div className="bg-slate-900 border border-white/10 px-6 py-4 rounded-2xl">
                Secure Global Payments
              </div>

              <div className="bg-slate-900 border border-white/10 px-6 py-4 rounded-2xl">
                Buyer & Seller Protection
              </div>

            </div>

            <div className="flex flex-wrap gap-5">

              <button
                onClick={() =>
                  router.push("/register")
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
                Start Using Escrow
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

          {/* RIGHT SIDE */}

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
              Why People Trust Escrow
            </h2>

            <div className="space-y-6">

              <div className="bg-slate-800 rounded-3xl p-6">

                <h3 className="text-2xl font-black mb-3 text-green-400">
                  Buyer Protection
                </h3>

                <p className="text-slate-300">
                  Buyers avoid scams by ensuring sellers
                  only receive confirmation after secure payment.
                </p>

              </div>

              <div className="bg-slate-800 rounded-3xl p-6">

                <h3 className="text-2xl font-black mb-3 text-blue-400">
                  Seller Protection
                </h3>

                <p className="text-slate-300">
                  Sellers confirm buyer commitment before
                  releasing products, tickets, or services.
                </p>

              </div>

              <div className="bg-slate-800 rounded-3xl p-6">

                <h3 className="text-2xl font-black mb-3 text-yellow-400">
                  Dispute Resolution
                </h3>

                <p className="text-slate-300">
                  Admin dispute systems help resolve
                  conflicts fairly between parties.
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
                Create Account
              </h3>

              <p className="text-slate-300">
                Register securely and access your escrow dashboard.
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
                Create Secure Transaction
              </h3>

              <p className="text-slate-300">
                Buyer and seller agree on terms,
                payment method, and transaction value.
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
                Complete Safely
              </h3>

              <p className="text-slate-300">
                Seller delivers assets while escrow
                protects both parties during the process.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FIFA SECTION */}

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
              Built For High-Risk Online Transactions
            </h2>

            <div className="grid md:grid-cols-2 gap-8">

              <div className="bg-slate-950/50 rounded-3xl p-8">

                <h3 className="text-3xl font-black mb-4 text-green-400">
                  FIFA World Cup Tickets
                </h3>

                <p className="text-slate-300">
                  Secure expensive ticket purchases from
                  strangers without risking scams.
                </p>

              </div>

              <div className="bg-slate-950/50 rounded-3xl p-8">

                <h3 className="text-3xl font-black mb-4 text-yellow-400">
                  Digital Services & Assets
                </h3>

                <p className="text-slate-300">
                  Safely exchange freelancing services,
                  gaming accounts, digital products,
                  and online goods.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* TRUST BADGES */}

      <section className="px-8 py-24 border-b border-white/10">

        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-5xl font-black mb-10">
            Trusted Escrow Features
          </h2>

          <p className="text-slate-300 text-xl max-w-4xl mx-auto mb-16">

            3rdParty Escrow helps secure online transactions
            between buyers and sellers worldwide.

          </p>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">
              Secure Escrow Flow
            </div>

            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">
              Real-Time Transaction Chat
            </div>

            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">
              Admin Dispute Review
            </div>

            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">
              Global Payment Support
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
                Yes. Transactions are protected through escrow,
                secure transaction flow, and dispute handling systems.
              </p>

            </div>

            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">

              <h3 className="text-2xl font-black mb-4">
                What can escrow be used for?
              </h3>

              <p className="text-slate-300">
                FIFA tickets, freelancing, digital assets,
                gaming, online services, and high-value sales.
              </p>

            </div>

            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">

              <h3 className="text-2xl font-black mb-4">
                What happens during disputes?
              </h3>

              <p className="text-slate-300">
                Admin review systems investigate disputes
                and help determine fair resolutions.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="px-8 py-24 border-b border-white/10">

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-6xl font-black mb-8">
            Start Using Secure Escrow Today
          </h2>

          <p className="text-slate-300 text-xl mb-12">

            Join buyers and sellers worldwide using
            3rdParty Escrow for safer online transactions.

          </p>

          <button
            onClick={() =>
              router.push("/register")
            }
            className="
              bg-blue-600
              hover:bg-blue-700
              px-12
              py-6
              rounded-3xl
              font-black
              text-2xl
            "
          >
            Create Free Account
          </button>

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