"use client";

import Link from "next/link";

export default function HomePage() {

  return (

    <main className="min-h-screen bg-[#020617] text-white overflow-hidden">

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
            via-[#020617]
            to-blue-950
          "
        />

        {/* GLOW */}
        <div
          className="
            absolute
            top-[-200px]
            right-[-150px]
            w-[600px]
            h-[600px]
            bg-blue-600/20
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10
            max-w-7xl
            mx-auto
            grid
            lg:grid-cols-2
            gap-20
            items-center
          "
        >

          {/* LEFT */}
          <div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                bg-blue-600/10
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
              TRUSTED GLOBAL ESCROW SERVICE
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
              3rdParty
              <br />

              Escrow
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
              Secure escrow protection for buyers and sellers
              who are strangers to each other. We help both
              parties transact safely by protecting payments
              until goods, tickets, services or digital assets
              are successfully delivered.
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
                  Create Account
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

              <div
                className="
                  bg-slate-900
                  rounded-3xl
                  p-8
                  mb-6
                "
              >

                <div className="flex justify-between mb-4">

                  <span className="text-slate-400">
                    Escrow Status
                  </span>

                  <span className="text-green-400 font-black">
                    SECURED
                  </span>

                </div>

                <h2 className="text-4xl font-black mb-4">
                  Protected Transaction
                </h2>

                <p className="text-slate-400 leading-relaxed">
                  Funds remain protected until both parties
                  complete the transaction successfully.
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
                    Fraud Monitoring
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
                    Escrow Protection
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* SERVICES */}
      <section className="px-6 py-28 bg-black">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">

            <h2 className="text-6xl font-black mb-6">
              What We Protect
            </h2>

            <p className="text-slate-400 text-xl">
              Safe transactions for high-value deals
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              "FIFA & Concert Tickets",
              "Electronics & Phones",
              "Vehicles & Cars",
              "Freelance Services",
              "Digital Assets",
              "International Deals",
            ].map((item) => (

              <div
                key={item}
                className="
                  bg-slate-900
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
                  Secure escrow protection for both buyer and seller.
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-28 bg-slate-950">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">

            <h2 className="text-6xl font-black mb-6">
              How It Works
            </h2>

            <p className="text-slate-400 text-xl">
              Simple, trusted and secure escrow flow
            </p>

          </div>

          <div className="grid lg:grid-cols-4 gap-8">

            {[
              {
                step: "1",
                title: "Open Transaction",
                desc: "Buyer creates escrow transaction and invites seller.",
              },
              {
                step: "2",
                title: "Buyer Pays",
                desc: "Payment becomes protected by escrow.",
              },
              {
                step: "3",
                title: "Seller Delivers",
                desc: "Seller safely delivers goods or services.",
              },
              {
                step: "4",
                title: "Buyer Confirms",
                desc: "Transaction completes after successful confirmation.",
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

      {/* PAYMENTS */}
      <section className="px-6 py-24 bg-black">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-black mb-6">
              Supported Payment Methods
            </h2>

            <p className="text-slate-400 text-xl">
              Fast international and local payments
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

      {/* TERMS */}
      <section className="px-6 py-24 bg-slate-950 border-t border-white/10">

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-5xl font-black mb-8">
            Terms & Trust
          </h2>

          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            3rdParty Escrow acts as a neutral intermediary
            between buyer and seller. Funds remain protected
            until delivery is confirmed. Fraudulent activity,
            chargeback abuse, fake deliveries and illegal
            transactions are prohibited and may result in
            permanent account suspension.
          </p>

          <p className="text-slate-500">
            By using this platform you agree to our escrow terms,
            dispute handling process and transaction policies.
          </p>

        </div>

      </section>

    </main>
  );
}