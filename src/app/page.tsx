import Link from "next/link";

export default function HomePage() {

  return (

    <main className="
      min-h-screen
      bg-slate-950
      text-white
      overflow-hidden
    ">

      <section className="
        max-w-7xl
        mx-auto
        px-6
        py-8
      ">

        <nav className="
          flex
          items-center
          justify-between
          mb-24
        ">

          <div>

            <h1 className="
              text-2xl
              font-black
            ">
              Escrow3rdParty
            </h1>

            <p className="
              text-sm
              text-slate-400
            ">
              Secure Escrow Platform
            </p>

          </div>

          <div className="
            flex
            items-center
            gap-4
          ">

            <Link
              href="/login"
              className="
                text-slate-300
                hover:text-white
              "
            >
              Login
            </Link>

            <Link
              href="/register"
              className="
                bg-blue-600
                hover:bg-blue-700
                px-5
                py-3
                rounded-xl
                font-semibold
              "
            >
              Create Account
            </Link>

          </div>

        </nav>

        <div className="
          grid
          lg:grid-cols-2
          gap-16
          items-center
        ">

          <div>

            <div className="
              inline-flex
              items-center
              gap-2
              bg-blue-500/10
              border
              border-blue-500/20
              text-blue-300
              px-4
              py-2
              rounded-full
              mb-8
            ">

              Secure FIFA World Cup
              Ticket Escrow

            </div>

            <h2 className="
              text-6xl
              font-black
              leading-tight
              mb-6
            ">

              Buy & Sell Tickets

              <span className="
                text-blue-500
              ">
                {" "}Safely
              </span>

            </h2>

            <p className="
              text-slate-400
              text-lg
              leading-relaxed
              mb-10
              max-w-xl
            ">

              Escrow3rdParty protects
              buyers and sellers during
              online transactions.

              Funds are securely held
              until both parties complete
              the agreement.

            </p>

            <div className="
              flex
              items-center
              gap-5
            ">

              <Link
                href="/register"
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                "
              >
                Start Escrow
              </Link>

              <Link
                href="/login"
                className="
                  border
                  border-white/10
                  hover:border-white/30
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                "
              >
                Login
              </Link>

            </div>

          </div>

          <div className="
            bg-gradient-to-br
            from-blue-600/20
            to-slate-900
            border
            border-white/10
            rounded-3xl
            p-10
          ">

            <div className="
              grid
              grid-cols-2
              gap-6
            ">

              <div className="
                bg-slate-900/70
                border
                border-white/10
                rounded-2xl
                p-6
              ">

                <h3 className="
                  text-4xl
                  font-black
                  mb-2
                ">
                  $12M+
                </h3>

                <p className="
                  text-slate-400
                ">
                  Protected
                </p>

              </div>

              <div className="
                bg-slate-900/70
                border
                border-white/10
                rounded-2xl
                p-6
              ">

                <h3 className="
                  text-4xl
                  font-black
                  mb-2
                ">
                  38K+
                </h3>

                <p className="
                  text-slate-400
                ">
                  Transactions
                </p>

              </div>

              <div className="
                bg-slate-900/70
                border
                border-white/10
                rounded-2xl
                p-6
              ">

                <h3 className="
                  text-4xl
                  font-black
                  mb-2
                ">
                  180+
                </h3>

                <p className="
                  text-slate-400
                ">
                  Countries
                </p>

              </div>

              <div className="
                bg-slate-900/70
                border
                border-white/10
                rounded-2xl
                p-6
              ">

                <h3 className="
                  text-4xl
                  font-black
                  mb-2
                ">
                  99.8%
                </h3>

                <p className="
                  text-slate-400
                ">
                  Success Rate
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>

  );
}