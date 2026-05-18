"use client";

import { useState } from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import Link from "next/link";

import { createClient }
from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function RegisterPage() {

  const router = useRouter();

  const searchParams =
    useSearchParams();

  const invited =
    searchParams.get("invited");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function register() {

    setLoading(true);

    const { error } =
      await supabase.auth.signUp({

        email,
        password,

      });

    if (error) {

      alert(error.message);

      setLoading(false);

      return;
    }

    router.push("/dashboard");
  }

  return (

    <main
      className="
        min-h-screen
        bg-slate-950
        text-white
        flex
        items-center
        justify-center
        p-6
      "
    >

      <div
        className="
          w-full
          max-w-md
          bg-slate-900
          border
          border-white/10
          rounded-3xl
          p-8
        "
      >

        {invited && (

          <div
            className="
              bg-blue-500/20
              border
              border-blue-500/30
              text-blue-200
              rounded-2xl
              p-4
              mb-6
            "
          >

            You were invited to an
            escrow transaction.
            Create account to continue.

          </div>

        )}

        <h1
          className="
            text-5xl
            font-black
            mb-8
          "
        >
          Create Account
        </h1>

        <div className="space-y-5">

          <input
            type="email"

            placeholder="Email"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }

            className="
              w-full
              bg-slate-800
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
            "
          />

          <input
            type="password"

            placeholder="Password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            className="
              w-full
              bg-slate-800
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
            "
          />

          <button
            onClick={register}

            disabled={loading}

            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              rounded-2xl
              py-4
              font-bold
              text-lg
            "
          >

            {loading
              ? "Creating..."
              : "Create Account"}

          </button>

        </div>

        <p className="mt-6 text-slate-400">

          Already have account?{" "}

          <Link
            href="/login"
            className="text-blue-400"
          >
            Login
          </Link>

        </p>

      </div>

    </main>
  );
}