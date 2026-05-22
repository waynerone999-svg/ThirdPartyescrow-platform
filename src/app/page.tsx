"use client";

import Link from "next/link";

export default function HomePage() {

  return (

    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* HERO */}
      <section
        className="
          relative
          px-6
          py-28
          border-b
          border-white/10
        "
      >

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          <div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                bg-blue-600/20
                border
                border-blue-500/30
                px-5
                py-2
                rounded-full
                text-blue-400
                font-bold
                mb-8
              "
            >
              TRUSTED DIGITAL ESCROW PLATFORM
            </div>

            <h1
              className="
                text-6xl
                lg:text-7xl
                font-black
                leading-tight
                mb-8
              "
            >
              Secure Payments
              <br />

              Fast Transactions
              <br />

              Zero Trust Issues
            </h1>

            <p
              className="
                text-slate-400
                text-xl
                leading-relaxed
                mb-10
                max-w-2xl
              "
            >
              Our escrow platform protects both buyers and sellers
              during online transactions. Funds remain secured until
              assets or services are successfully delivered and confirmed.
            </p>

            <div className="flex flex-wrap gap-5">

              <Link href="/register">

                <button
                  className="
                    bg-blue-600
                    hover:bg-blue-700
                    px-10
                    py-5
                    rounded-2xl
                    font-black
                    text-lg
                  "
                >
                  Get Started
                </button>

              </Link>

              <Link href="/login">

                <button
                  className="
                    border
                    border-white/20
                    hover:border-white/40
                    px-10
                    py-5
                    rounded-2xl
                    font-black
                    text-lg
                  "
                >
                  Login
                </button>

              </Link>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="relative">

            <div
              className="
                bg-slate-900
                border
                border-white/10
                rounded-[40px]
                p-10
                shadow-2xl
              "
            >

              <div className="space-y-6">

                <div
                  className="
                    bg-slate-800
                    rounded-3xl
                    p-6
                  "
                >

                  <div className="flex justify-between mb-3">

                    <span className="text-slate-400">
                      Transaction
                    </span>

                    <span className="text-green-400 font-bold">
                      SECURED
                    </span>

                  </div>

                  <h2 className="text-3xl font-black mb-3">
                    MacBook Pro Sale
                  </h2>

                  <p className="text-slate-400">
                    Buyer payment protected by escrow until
                    delivery confirmation.
                  </p>

                </div>

                <div className="grid grid-cols-2 gap-5">

                  <div
                    className="
                      bg-blue-600/20
                      border
                      border-blue-500/20
                      rounded-3xl
                      p-6
                    "
                  >

                    <h3 className="text-4xl font-black mb-2">
                      24/7
                    </h3>

                    <p className="text-slate-300">
                      Transaction Monitoring
                    </p>

                  </div>

                  <div
                    className="
                      bg-green-600/20
                      border
                      border-green-500/20
                      rounded-3xl
                      p-6
                    "
                  >

                    <h3 className="text-4xl font-black mb-2">
                      Instant
                    </h3>

                    <p className="text-slate-300">
                      Escrow Verification
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-24">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">

            <h2 className="text-5xl font-black mb-6">
              How Escrow Works
            </h2>

            <p className="text-slate-400 text-xl">
              Simple, secure and fast transaction protection
            </p>

          </div>

          <div className="grid lg:grid-cols-4 gap-8">

            {/* STEP */}
            <div
              className="
                bg-slate-900
                border
                border-white/10
                rounded-3xl
                p-8
              "
            >

              <div
                className="
                  w-16
                  h-16
                  bg-blue-600
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  text-3xl
                  font-black
                  mb-6
                "
              >
                1
              </div>

              <h3 className="text-2xl font-black mb-4">
                Create Transaction
              </h3>

              <p className="text-slate-400 leading-relaxed">
                Buyer creates a secure escrow transaction and invites seller.
              </p>

            </div>

            {/* STEP */}
            <div
              className="
                bg-slate-900
                border
                border-white/10
                rounded-3xl
                p-8
              "
            >

              <div
                className="
                  w-16
                  h-16
                  bg-green-600
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  text-3xl
                  font-black
                  mb-6
                "
              >
                2
              </div>

              <h3 className="text-2xl font-black mb-4">
                Buyer Pays
              </h3>

              <p className="text-slate-400 leading-relaxed">
                Funds are marked secured by escrow while awaiting delivery.
              </p>

            </div>

            {/* STEP */}
            <div
              className="
                bg-slate-900
                border
                border-white/10
                rounded-3xl
                p-8
              "
            >

              <div
                className="
                  w-16
                  h-16
                  bg-yellow-500
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  text-3xl
                  font-black
                  mb-6
                "
              >
                3
              </div>

              <h3 className="text-2xl font-black mb-4">
                Seller Delivers
              </h3>

              <p className="text-slate-400 leading-relaxed">
                Seller safely delivers goods/services after payment security.
              </p>

            </div>

            {/* STEP */}
            <div
              className="
                bg-slate-900
                border
                border-white/10
                rounded-3xl
                p-8
              "
            >

              <div
                className="
                  w-16
                  h-16
                  bg-purple-600
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  text-3xl
                  font-black
                  mb-6
                "
              >
                4
              </div>

              <h3 className="text-2xl font-black mb-4">
                Buyer Confirms
              </h3>

              <p className="text-slate-400 leading-relaxed">
                Buyer confirms successful delivery and transaction completes.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* PAYMENT METHODS */}
      <section
        className="
          px-6
          py-24
          border-t
          border-white/10
        "
      >

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-black mb-6">
              Supported Payment Methods
            </h2>

            <p className="text-slate-400 text-xl">
              Fast local and international transaction options
            </p>

          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">

            {[
              "Wise Transfer",
              "Zelle",
              "Cash App",
              "Apple Pay",
              "M-PESA",
              "Bank Transfer",
              "PayPal",
              "Airtel Money",
            ].map((method) => (

              <div
                key={method}
                className="
                  bg-slate-900
                  border
                  border-white/10
                  rounded-3xl
                  p-6
                  text-center
                  font-black
                  text-xl
                "
              >
                {method}
              </div>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}