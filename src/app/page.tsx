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
            from-black
            via-slate-950
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
                gap-3
                bg-yellow-500/10
                border
                border-yellow-500/30
                px-6
                py-3
                rounded-full
                text-yellow-400
                font-black
                mb-8
              "
            >
              FIFA WORLD CUP TICKETS ESCROW
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
              Buy &
              <br />

              Sell FIFA
              <br />

              Tickets Safely
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
              Secure high-value football ticket transactions
              with instant escrow protection. Buyers stay protected,
              sellers avoid fraud, and both parties transact safely
              worldwide.
            </p>

            <div className="flex flex-wrap gap-5">

              <Link href="/register">

                <button
                  className="
                    bg-yellow-500
                    hover:bg-yellow-600
                    text-black
                    px-10
                    py-5
                    rounded-2xl
                    font-black
                    text-lg
                  "
                >
                  Start Secure Transaction
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
                src="https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=1200&auto=format&fit=crop"
                alt="Football Stadium"
                className="
                  rounded-3xl
                  mb-6
                  h-[320px]
                  w-full
                  object-cover
                "
              />

              <div className="space-y-5">

                <div
                  className="
                    flex
                    justify-between
                    items-center
                  "
                >

                  <div>

                    <p className="text-slate-400 mb-1">
                      Match
                    </p>

                    <h2 className="text-3xl font-black">
                      FIFA Final 2026
                    </h2>

                  </div>

                  <div
                    className="
                      bg-green-500/20
                      border
                      border-green-500/30
                      px-5
                      py-2
                      rounded-2xl
                      text-green-400
                      font-black
                    "
                  >
                    VERIFIED
                  </div>

                </div>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-4
                  "
                >

                  <div
                    className="
                      bg-black/30
                      rounded-2xl
                      p-5
                    "
                  >

                    <p className="text-slate-400 mb-2">
                      Escrow Protection
                    </p>

                    <h3 className="text-2xl font-black text-blue-400">
                      ACTIVE
                    </h3>

                  </div>

                  <div
                    className="
                      bg-black/30
                      rounded-2xl
                      p-5
                    "
                  >

                    <p className="text-slate-400 mb-2">
                      Fraud Prevention
                    </p>

                    <h3 className="text-2xl font-black text-yellow-400">
                      SECURED
                    </h3>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-28 bg-slate-950">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">

            <h2 className="text-6xl font-black mb-6">
              How Ticket Escrow Works
            </h2>

            <p className="text-slate-400 text-xl">
              Safe transactions for premium football tickets
            </p>

          </div>

          <div className="grid lg:grid-cols-4 gap-8">

            {[
              {
                step: "1",
                title: "Create Transaction",
                desc: "Buyer opens a secure escrow transaction and invites seller.",
              },
              {
                step: "2",
                title: "Buyer Pays",
                desc: "Payment is secured by escrow before ticket delivery.",
              },
              {
                step: "3",
                title: "Seller Transfers",
                desc: "Seller safely transfers FIFA tickets after escrow security.",
              },
              {
                step: "4",
                title: "Buyer Confirms",
                desc: "Buyer confirms successful ticket delivery.",
              },
            ].map((item) => (

              <div
                key={item.step}
                className="
                  bg-black/40
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
                    bg-yellow-500
                    text-black
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
      <section className="px-6 py-24 bg-black">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-black mb-6">
              Supported Payment Methods
            </h2>

            <p className="text-slate-400 text-xl">
              Fast international and local transfers
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