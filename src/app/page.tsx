"use client";

import Link from "next/link";

export default function HomePage() {

  return (

    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* HERO */}
      <section
        className="
          relative
          min-h-screen
          flex
          items-center
          overflow-hidden
          px-6
        "
      >

        {/* BACKGROUND */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-black
            via-slate-950
            to-blue-950
          "
        />

        <div
          className="
            absolute
            top-[-150px]
            right-[-100px]
            w-[500px]
            h-[500px]
            bg-blue-600/20
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            max-w-7xl
            mx-auto
            grid
            lg:grid-cols-2
            gap-20
            items-center
            relative
            z-10
          "
        >

          {/* LEFT */}
          <div>

            <div
              className="
                inline-flex
                items-center
                gap-3
                bg-green-500/10
                border
                border-green-500/30
                px-6
                py-3
                rounded-full
                text-green-400
                font-black
                mb-8
              "
            >
              SECURE GLOBAL ESCROW PLATFORM
            </div>

            <h1
              className="
                text-6xl
                lg:text-8xl
                font-black
                leading-tight
                mb-8
              "
            >
              Buy & Sell
              <br />

              Safely
              <br />

              Worldwide
            </h1>

            <p
              className="
                text-slate-300
                text-xl
                leading-relaxed
                mb-10
                max-w-2xl
              "
            >
              Secure transactions for FIFA World Cup tickets,
              concert tickets, electronics, vehicles, freelance
              services, digital assets and international business deals.
              Escrow protects both buyer and seller from fraud.
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
                  Start Transaction
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

          {/* RIGHT */}
          <div className="relative">

            <div
              className="
                bg-white/5
                border
                border-white/10
                backdrop-blur-xl
                rounded-[40px]
                p-8
              "
            >

              <img
                src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1400&auto=format&fit=crop"
                alt="Escrow Platform"
                className="
                  rounded-3xl
                  h-[320px]
                  w-full
                  object-cover
                  mb-6
                "
              />

              <div className="grid grid-cols-2 gap-5">

                <div
                  className="
                    bg-black/30
                    rounded-3xl
                    p-6
                  "
                >

                  <p className="text-slate-400 mb-2">
                    Protected Transactions
                  </p>

                  <h2 className="text-4xl font-black text-blue-400">
                    24/7
                  </h2>

                </div>

                <div
                  className="
                    bg-black/30
                    rounded-3xl
                    p-6
                  "
                >

                  <p className="text-slate-400 mb-2">
                    Fraud Prevention
                  </p>

                  <h2 className="text-4xl font-black text-green-400">
                    ACTIVE
                  </h2>

                </div>

                <div
                  className="
                    bg-black/30
                    rounded-3xl
                    p-6
                  "
                >

                  <p className="text-slate-400 mb-2">
                    Instant Escrow
                  </p>

                  <h2 className="text-4xl font-black text-yellow-400">
                    LIVE
                  </h2>

                </div>

                <div
                  className="
                    bg-black/30
                    rounded-3xl
                    p-6
                  "
                >

                  <p className="text-slate-400 mb-2">
                    Global Payments
                  </p>

                  <h2 className="text-4xl font-black text-purple-400">
                    FAST
                  </h2>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* USE CASES */}
      <section className="px-6 py-28 bg-slate-950">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">

            <h2 className="text-6xl font-black mb-6">
              Popular Escrow Transactions
            </h2>

            <p className="text-slate-400 text-xl">
              Secure high-value online deals
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              "FIFA World Cup Tickets",
              "Concert & Event Tickets",
              "Cars & Vehicles",
              "Electronics & Phones",
              "Freelance Services",
              "Digital Assets & Domains",
            ].map((item) => (

              <div
                key={item}
                className="
                  bg-black/40
                  border
                  border-white/10
                  rounded-3xl
                  p-8
                "
              >

                <h3 className="text-3xl font-black mb-4">
                  {item}
                </h3>

                <p className="text-slate-400 leading-relaxed">
                  Secure escrow protection for both buyers and sellers.
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-28 bg-black">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">

            <h2 className="text-6xl font-black mb-6">
              How Escrow Works
            </h2>

            <p className="text-slate-400 text-xl">
              Safe and transparent transaction flow
            </p>

          </div>

          <div className="grid lg:grid-cols-4 gap-8">

            {[
              {
                step: "1",
                title: "Create Deal",
                desc: "Buyer opens escrow transaction and invites seller.",
              },
              {
                step: "2",
                title: "Buyer Pays",
                desc: "Funds are secured under escrow protection.",
              },
              {
                step: "3",
                title: "Seller Delivers",
                desc: "Seller safely sends goods/services/assets.",
              },
              {
                step: "4",
                title: "Buyer Confirms",
                desc: "Buyer confirms successful delivery.",
              },
            ].map((item) => (

              <div
                key={item.step}
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
                    rounded-2xl
                    bg-blue-600
                    flex
                    items-center
                    justify-center
                    text-3xl
                    font-black
                    mb-6
                  "
                >
                  {item.step}
                </div>

                <h3 className="text-3xl font-black mb-4">
                  {item.title}
                </h3>

                <p className="text-slate-400 leading-relaxed">
                  {item.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* PAYMENT METHODS */}
      <section className="px-6 py-24 bg-slate-950">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-black mb-6">
              Supported Payment Methods
            </h2>

            <p className="text-slate-400 text-xl">
              International and local transfer support
            </p>

          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">

            {[
              "Wise Transfer",
              "Zelle",
              "Cash App",
              "Apple Pay",
              "M-PESA",
              "PayPal",
              "Bank Transfer",
              "Airtel Money",
            ].map((method) => (

              <div
                key={method}
                className="
                  bg-black/40
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