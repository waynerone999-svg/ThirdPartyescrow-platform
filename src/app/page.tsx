import Link from "next/link";

export default function HomePage() {

  return (

    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* NAVBAR */}
      <header className="border-b border-white/10">

        <div
          className="
            max-w-7xl
            mx-auto
            px-8
            py-6
            flex
            items-center
            justify-between
          "
        >

          <div className="text-3xl font-black">
            3rdParty Escrow
          </div>

          <div className="flex gap-4">

            <Link href="/login">

              <button
                className="
                  bg-slate-800
                  hover:bg-slate-700
                  px-6
                  py-3
                  rounded-xl
                  font-bold
                "
              >
                Login
              </button>

            </Link>

            <Link href="/register">

              <button
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  px-6
                  py-3
                  rounded-xl
                  font-bold
                "
              >
                Create Account
              </button>

            </Link>

          </div>

        </div>

      </header>

      {/* HERO */}
      <section className="relative">

        <div className="max-w-7xl mx-auto px-8 py-28">

          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-3
                  bg-green-500/20
                  text-green-300
                  px-5
                  py-2
                  rounded-full
                  mb-8
                  font-bold
                "
              >
                Secure Global Escrow Protection
              </div>

              <h1
                className="
                  text-7xl
                  leading-tight
                  font-black
                  mb-8
                "
              >
                Trusted Escrow
                <br />
                For Online
                <br />
                Transactions
              </h1>

              <p
                className="
                  text-2xl
                  text-slate-400
                  leading-relaxed
                  mb-12
                "
              >
                Protect buyers and sellers worldwide with
                secure escrow payments, dispute protection,
                crypto support, Wise transfers, Zelle,
                M-Pesa, Apple Pay and more.
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
                      text-xl
                      font-black
                    "
                  >
                    Get Started
                  </button>

                </Link>

                <Link href="/login">

                  <button
                    className="
                      bg-slate-800
                      hover:bg-slate-700
                      border
                      border-white/10
                      px-10
                      py-5
                      rounded-2xl
                      text-xl
                      font-black
                    "
                  >
                    Login
                  </button>

                </Link>

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
                space-y-6
              "
            >

              <div
                className="
                  bg-slate-800
                  rounded-3xl
                  p-6
                  border
                  border-green-500/30
                "
              >

                <div className="text-green-400 font-black text-lg mb-2">
                  Buyer Protected
                </div>

                <p className="text-slate-400">
                  Funds are safely held until delivery is confirmed.
                </p>

              </div>

              <div
                className="
                  bg-slate-800
                  rounded-3xl
                  p-6
                  border
                  border-blue-500/30
                "
              >

                <div className="text-blue-400 font-black text-lg mb-2">
                  Seller Secured
                </div>

                <p className="text-slate-400">
                  Verified payments before product delivery.
                </p>

              </div>

              <div
                className="
                  bg-slate-800
                  rounded-3xl
                  p-6
                  border
                  border-yellow-500/30
                "
              >

                <div className="text-yellow-400 font-black text-lg mb-2">
                  Global Payments
                </div>

                <p className="text-slate-400">
                  Wise, USDT Crypto, Zelle, Apple Pay,
                  M-Pesa, bank transfers and more.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-8 py-20">

        <div className="text-center mb-20">

          <h2 className="text-6xl font-black mb-6">
            Why Use 3rdParty Escrow?
          </h2>

          <p className="text-slate-400 text-2xl">
            Secure transactions for freelancers,
            marketplaces, online businesses and global trade.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          <div
            className="
              bg-slate-900
              border
              border-white/10
              rounded-[35px]
              p-10
            "
          >

            <div className="text-5xl mb-6">
              🔒
            </div>

            <h3 className="text-3xl font-black mb-5">
              Escrow Security
            </h3>

            <p className="text-slate-400 text-lg leading-relaxed">
              Buyer funds stay protected until transaction completion.
            </p>

          </div>

          <div
            className="
              bg-slate-900
              border
              border-white/10
              rounded-[35px]
              p-10
            "
          >

            <div className="text-5xl mb-6">
              🌍
            </div>

            <h3 className="text-3xl font-black mb-5">
              Worldwide Support
            </h3>

            <p className="text-slate-400 text-lg leading-relaxed">
              Multiple countries and local payment methods supported.
            </p>

          </div>

          <div
            className="
              bg-slate-900
              border
              border-white/10
              rounded-[35px]
              p-10
            "
          >

            <div className="text-5xl mb-6">
              ⚡
            </div>

            <h3 className="text-3xl font-black mb-5">
              Fast Disputes
            </h3>

            <p className="text-slate-400 text-lg leading-relaxed">
              Professional dispute handling for safer transactions.
            </p>

          </div>

        </div>

      </section>

      {/* PAYMENT METHODS */}
      <section className="max-w-7xl mx-auto px-8 py-20">

        <div
          className="
            bg-slate-900
            border
            border-white/10
            rounded-[40px]
            p-14
          "
        >

          <div className="text-center mb-14">

            <h2 className="text-5xl font-black mb-6">
              Supported Payment Methods
            </h2>

            <p className="text-slate-400 text-xl">
              Flexible global payments for buyers and sellers.
            </p>

          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">

            {[
              "Wise ⭐ Recommended",
              "USDT Crypto",
              "Zelle",
              "Apple Pay",
              "Bank Transfer",
              "M-Pesa",
              "MTN MoMo",
              "Airtel Money",
              "PayPal",
              "Interac",
              "UPI",
              "PIX",
            ].map((method) => (

              <div
                key={method}
                className="
                  bg-slate-800
                  border
                  border-white/10
                  rounded-2xl
                  p-5
                  text-center
                  font-bold
                "
              >
                {method}
              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-8 py-24">

        <div
          className="
            bg-blue-600
            rounded-[45px]
            p-16
            text-center
          "
        >

          <h2 className="text-6xl font-black mb-8">
            Ready To Start?
          </h2>

          <p className="text-2xl mb-12 text-blue-100">
            Create secure escrow transactions in minutes.
          </p>

          <Link href="/register">

            <button
              className="
                bg-white
                text-black
                hover:bg-slate-200
                px-12
                py-6
                rounded-3xl
                text-2xl
                font-black
              "
            >
              Create Free Account
            </button>

          </Link>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">

        <div
          className="
            max-w-7xl
            mx-auto
            px-8
            py-14
            grid
            lg:grid-cols-4
            gap-10
          "
        >

          <div>

            <h3 className="text-3xl font-black mb-5">
              3rdParty Escrow
            </h3>

            <p className="text-slate-400 leading-relaxed">
              Secure global escrow protection for buyers and sellers.
            </p>

          </div>

          <div>

            <h4 className="font-black text-xl mb-5">
              Company
            </h4>

            <div className="space-y-3 text-slate-400">

              <Link href="/about">
                <div>About Us</div>
              </Link>

              <Link href="/contact">
                <div>Contact</div>
              </Link>

            </div>

          </div>

          <div>

            <h4 className="font-black text-xl mb-5">
              Legal
            </h4>

            <div className="space-y-3 text-slate-400">

              <Link href="/terms">
                <div>Terms of Service</div>
              </Link>

              <Link href="/privacy">
                <div>Privacy Policy</div>
              </Link>

              <Link href="/disputes">
                <div>Dispute Policy</div>
              </Link>

            </div>

          </div>

          <div>

            <h4 className="font-black text-xl mb-5">
              Supported Regions
            </h4>

            <p className="text-slate-400 leading-relaxed">
              USA, UK, Canada, Kenya, Uganda,
              Tanzania, Nigeria, India and more.
            </p>

          </div>

        </div>

        <div className="border-t border-white/10">

          <div
            className="
              max-w-7xl
              mx-auto
              px-8
              py-8
              text-slate-500
              flex
              flex-col
              lg:flex-row
              justify-between
              gap-5
            "
          >

            <div>
              © 2026 3rdParty Escrow. All rights reserved.
            </div>

            <div>
              Trusted Secure Global Escrow Platform
            </div>

          </div>

        </div>

      </footer>

    </main>
  );
}