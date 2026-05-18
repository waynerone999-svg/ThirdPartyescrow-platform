export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      
      {/* NAVBAR */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-2xl">
              🔐
            </div>

            <div>
              <h1 className="text-2xl font-black">
                Escrow<span className="text-blue-400">3rdParty</span>
              </h1>

              <p className="text-xs text-slate-400">
                Trusted Escrow Platform
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-slate-300 hover:text-white">
              Home
            </button>

            <button className="text-slate-300 hover:text-white">
              How It Works
            </button>

            <button className="text-slate-300 hover:text-white">
              Login
            </button>

            <button className="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition">
              Create Account
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden py-28">

        <div className="absolute w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[120px] top-[-200px] left-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 mb-8">
            🏆 Secure FIFA World Cup Ticket Escrow
          </div>

          <h2 className="text-6xl md:text-7xl font-black leading-tight max-w-5xl">
            Buy & Sell Tickets
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {" "}Safely
            </span>
          </h2>

          <p className="mt-8 text-xl text-slate-400 max-w-3xl leading-relaxed">
            Escrow3rdParty protects buyers and sellers during online transactions.
            Funds are securely held until both parties complete the agreement.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <button className="px-8 py-4 rounded-2xl bg-blue-500 hover:bg-blue-600 transition font-semibold text-lg">
              Start Escrow
            </button>

            <button className="px-8 py-4 rounded-2xl border border-slate-700 hover:border-slate-500 transition text-lg">
              Learn More
            </button>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">

            {[
              ["$12M+", "Protected"],
              ["38K+", "Transactions"],
              ["180+", "Countries"],
              ["99.8%", "Success Rate"],
            ].map(([n, l]) => (

              <div
                key={l}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
              >
                <div className="text-4xl font-black">
                  {n}
                </div>

                <div className="text-slate-400 mt-2">
                  {l}
                </div>
              </div>

            ))}

          </div>
        </div>
      </section>
      {/* FEATURES */}
<section className="py-24 border-t border-slate-800">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">
      <h3 className="text-5xl font-black">
        Why Use Escrow3rdParty?
      </h3>

      <p className="mt-4 text-slate-400 text-xl max-w-3xl mx-auto">
        Secure escrow protection for buyers and sellers worldwide.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      {[
        ["🔒", "Secure Escrow", "Funds are protected until delivery is confirmed."],
        ["💬", "Private Chat", "Buyer and seller communicate safely inside the platform."],
        ["🏆", "Ticket Protection", "Specialized for FIFA World Cup ticket transactions."],
        ["🌍", "Global Payments", "Crypto, USA, UK, Uganda, Tanzania, and Nigeria supported."]
      ].map(([icon, title, desc]) => (

        <div
          key={title}
          className="rounded-3xl border border-white/10 bg-slate-900 p-8"
        >

          <div className="text-5xl mb-6">
            {icon}
          </div>

          <h4 className="text-2xl font-bold mb-4">
            {title}
          </h4>

          <p className="text-slate-400 leading-relaxed">
            {desc}
          </p>

        </div>

      ))}

    </div>

  </div>

</section>

{/* HOW IT WORKS */}
<section className="py-24 bg-slate-900/40 border-t border-slate-800">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">
      <h3 className="text-5xl font-black">
        How It Works
      </h3>

      <p className="mt-4 text-slate-400 text-xl">
        Safe transactions in 6 simple steps.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {[
        "Buyer creates escrow transaction",
        "Seller receives invitation email",
        "Seller accepts escrow agreement",
        "Buyer funds escrow securely",
        "Seller delivers tickets/items",
        "Escrow releases payment"
      ].map((step, index) => (

        <div
          key={step}
          className="rounded-3xl bg-slate-950 border border-white/10 p-8"
        >

          <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center font-bold text-xl mb-6">
            {index + 1}
          </div>

          <p className="text-lg text-slate-300">
            {step}
          </p>

        </div>

      ))}

    </div>

  </div>

</section>

{/* PAYMENTS */}
<section className="py-24 border-t border-slate-800">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">

      <h3 className="text-5xl font-black">
        Supported Payments
      </h3>

      <p className="mt-4 text-slate-400 text-xl">
        International and crypto-friendly payment methods.
      </p>

    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {[
        "USDT (TRC20/ERC20)",
        "Uganda Mobile Money",
        "Tanzania M-Pesa",
        "Nigeria Opay / Palmpay",
        "USA ACH / Zelle",
        "UK Faster Payments"
      ].map((payment) => (

        <div
          key={payment}
          className="rounded-3xl bg-slate-900 border border-white/10 p-8 text-center"
        >

          <div className="text-2xl font-semibold">
            {payment}
          </div>

        </div>

      ))}

    </div>

  </div>

</section>

{/* FOOTER */}
<footer className="border-t border-slate-800 py-10">

  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

    <div>

      <div className="text-2xl font-black">
        Escrow<span className="text-blue-400">3rdParty</span>
      </div>

      <p className="text-slate-500 mt-2">
        Secure escrow platform for online transactions.
      </p>

    </div>

    <div className="flex gap-6 text-slate-400">

      <button className="hover:text-white">
        Terms
      </button>

      <button className="hover:text-white">
        Privacy
      </button>

      <button className="hover:text-white">
        Support
      </button>

    </div>

  </div>

</footer>

    </main>
  );
}