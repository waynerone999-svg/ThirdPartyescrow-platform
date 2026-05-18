"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function signUp() {

    if (!email || !password) {

      alert(
        "Please enter email and password"
      );

      return;
    }

    setLoading(true);

    const { error } =
      await supabase.auth.signUp({

        email,

        password,
      });

    setLoading(false);

    if (error) {

      alert(error.message);

      return;
    }

    alert(
      "Account created successfully. Please check your email and verify your account before logging in."
    );
  }

  async function signIn() {

    if (!email || !password) {

      alert(
        "Please enter email and password"
      );

      return;
    }

    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({

        email,

        password,
      });

    setLoading(false);

    if (error) {

      alert(error.message);

      return;
    }

    router.push("/dashboard");
  }

  return (

    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-8">

      <div
        className="
          w-full
          max-w-md
          bg-slate-900
          border
          border-white/10
          rounded-3xl
          p-10
        "
      >

        <h1 className="text-5xl font-black mb-4">
          Escrow Login
        </h1>

        <p className="text-slate-400 mb-10">
          Secure escrow account access.
        </p>

        <div className="space-y-6">

          {/* EMAIL */}
          <div>

            <label className="block mb-3 font-bold">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="you@email.com"
              className="
                w-full
                bg-slate-950
                border
                border-white/10
                rounded-2xl
                px-5
                py-4
              "
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="block mb-3 font-bold">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="••••••••"
              className="
                w-full
                bg-slate-950
                border
                border-white/10
                rounded-2xl
                px-5
                py-4
              "
            />

          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={signIn}
            disabled={loading}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              py-4
              rounded-2xl
              font-bold
            "
          >

            {loading
              ? "Loading..."
              : "Login"}

          </button>

          {/* CREATE ACCOUNT BUTTON */}
          <button
            onClick={signUp}
            disabled={loading}
            className="
              w-full
              bg-green-600
              hover:bg-green-700
              py-4
              rounded-2xl
              font-bold
            "
          >

            {loading
              ? "Loading..."
              : "Create Account"}

          </button>

        </div>

      </div>

    </main>
  );
}