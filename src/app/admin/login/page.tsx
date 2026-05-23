"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_EMAIL =
  "waynerone999@gmail.com";

export default function AdminLoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function login() {

    setLoading(true);

    setError("");

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {

      setError(error.message);

      setLoading(false);

      return;
    }

    const loggedInEmail =
      data.user.email
        ?.trim()
        .toLowerCase();

    if (
      loggedInEmail ===
      ADMIN_EMAIL.toLowerCase()
    ) {

      router.push("/admin/dashboard");

    } else {

      await supabase.auth.signOut();

      setError(
        "Not authorized as admin"
      );
    }

    setLoading(false);
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

        <h1
          className="
            text-5xl
            font-black
            mb-3
          "
        >
          Admin Login
        </h1>

        <p
          className="
            text-slate-400
            mb-8
          "
        >
          Restricted Admin Access
        </p>

        {error && (

          <div
            className="
              bg-red-500/20
              border
              border-red-500/30
              text-red-300
              p-4
              rounded-2xl
              mb-6
            "
          >
            {error}
          </div>
        )}

        <div className="space-y-5">

          <input
            type="email"

            placeholder="Admin Email"

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }

            className="
              w-full
              bg-slate-800
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
              outline-none
            "
          />

          <input
            type="password"

            placeholder="Password"

            value={password}

            onChange={(e) =>
              setPassword(e.target.value)
            }

            className="
              w-full
              bg-slate-800
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
              outline-none
            "
          />

          <button
            onClick={login}

            disabled={loading}

            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              py-4
              rounded-2xl
              font-black
              text-lg
            "
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>

        </div>

        <div className="mt-8 text-center">

          <Link
            href="/"

            className="
              text-slate-400
              hover:text-white
            "
          >
            Back to Home
          </Link>

        </div>

      </div>

    </main>
  );
}