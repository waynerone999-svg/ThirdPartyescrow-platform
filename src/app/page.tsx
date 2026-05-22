"use client";

import Link from "next/link";

export default function HomePage() {

  return (

    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* HERO */}
      <section
        className="
          relative
          min-h-screen
          flex
          items-center
          px-6
          overflow-hidden
        "
      >

        {/* BACKGROUND */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-slate-950
            via-black
            to-blue-950
          "
        />

        {/* GLOW */}
        <div
          className="
            absolute
            top-[-200px]
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
              TRUSTED GLOBAL ESCROW PLATFORM
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
              Secure
              <br />

              High-Value
              <br />

              Transactions
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
              Safely buy and sell FIFA tickets, concert tickets,
              electronics, vehicles, freelance services,
              digital assets and international deals using
              secure escrow protection.
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

          {/* RIGHT SIDE */}
          <div className="relative">

            <div
              className="
                bg-slate-900/80
                border
                border-white/10
                backdrop-blur-xl
                rounded-[40px]
                p-8
              "
            >

              <img
                src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1400&auto=format&fit=crop"
                alt="Escrow"
                className="
                  rounded-3xl
                  h-[320px]
                  w-full
                  object-cover
                  mb-6
                "
              />

              <div className="space-y-5">

                <div
                  className="
                    bg-slate-800
                    rounded-3xl
                    p-6
                  "
                >

                  <div className="flex justify-between mb-3">

                    <span className="text-slate-400">
                      Transaction Status
                    </span>

                    <span className="text-green-400 font-bold">
                      SECURED
                    </span>

                  </div>

                  <h2 className="text-3xl font-black mb-3">
                    Escrow Protection Active
                  </h2>

                  <p className="text-slate-400">
                    Funds remain protected until delivery confirmation.
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
                      Monitoring
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
                      Verification
                    </p>

                  </div>

                </div>

              </div>

            </div>

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
              Fast, secure and transparent transactions
            </p>

          </div>

          <div className="grid lg:grid-cols-4 gap-8">

            {[
              {
                step: "1",
                title: "Create Deal",
                desc: "Buyer creates transaction and invites seller.",
              },
              {
                step: "2",
                title: "Buyer Pays",
                desc: "Funds become secured by escrow protection.",
              },
              {
                step: "3",
                title: "Seller Delivers",
                desc: "Seller safely delivers product or service.",
              },
              {
                step: "4",
                title: "Buyer Confirms",
                desc: "Transaction completes after confirmation.",
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
              Fast local and international transfers
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