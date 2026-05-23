"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {

  const router = useRouter();

  return (

    <main className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}

      <nav className="border-b border-white/10">

        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">

          <h1 className="text-3xl font-black">
            3rdParty Escrow
          </h1>

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

          <div>

            <div className="inline-block bg-green-500/20 text-green-400 px-5 py-2 rounded-full text-sm font-bold mb-8">
              TRUSTED GLOBAL ESCROW PLATFORM
            </div>

            <h1 className="text-6xl lg:text-7xl font-black leading-tight mb-8">

              Secure Transactions Between Strangers

            </h1>

            <p className="text-slate-300 text-xl leading-relaxed mb-10">

              3rdParty Escrow protects buyers and sellers
              worldwide during online transactions including
              FIFA World Cup tickets, freelancing,
              gaming assets, services, and high-value trades.

            </p>

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
                Create Free Account
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
              Why Escrow Is Trusted
            </h2>

            <div className="space-y-6">

              <div className="bg-slate-800 rounded-3xl p-6">

                <h3 className="text-2xl font-black mb-3 text-green-400">
                  Buyer Protection
                </h3>

                <p className="text-slate-300">
                  Buyers avoid scams using escrow verification.
                </p>

              </div>

              <div className="bg-slate-800 rounded-3xl p-6">

                <h3 className="text-2xl font-black mb-3 text-blue-400">
                  Seller Protection
                </h3>

                <p className="text-slate-300">
                  Sellers confirm payment before delivery.
                </p>

              </div>

              <div className="bg-slate-800 rounded-3xl p-6">

                <h3 className="text-2xl font-black mb-3 text-yellow-400">
                  Dispute Resolution
                </h3>

                <p className="text-slate-300">
                  Admin systems resolve transaction disputes fairly.
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
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">

              <div className="text-5xl font-black text-blue-400 mb-6">
                1
              </div>

              <h3 className="text-2xl font-black mb-4">
                Create Account
              </h3>

            </div>

            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">

              <div className="text-5xl font-black text-green-400 mb-6">
                2
              </div>

              <h3 className="text-2xl font-black mb-4">
                Login To Dashboard
              </h3>

            </div>

            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">

              <div className="text-5xl font-black text-yellow-400 mb-6">
                3
              </div>

              <h3 className="text-2xl font-black mb-4">
                Create Secure Transaction
              </h3>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="px-8 py-16">

        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

          <div>

            <h2 className="text-3xl font-black mb-4">
              3rdParty Escrow
            </h2>

            <p className="text-slate-400">
              Secure global escrow services.
            </p>

          </div>

          <div>

            <h3 className="font-black mb-4">
              Legal
            </h3>

            <div className="space-y-3 text-slate-400">

              <button
                onClick={() =>
                  router.push("/terms")
                }
                className="block hover:text-white"
              >
                Terms of Service
              </button>

              <button
                onClick={() =>
                  router.push("/privacy")
                }
                className="block hover:text-white"
              >
                Privacy Policy
              </button>

              <button
                onClick={() =>
                  router.push("/disputes")
                }
                className="block hover:text-white"
              >
                Dispute Policy
              </button>

            </div>

          </div>

        </div>

      </footer>

    </main>
  );
}