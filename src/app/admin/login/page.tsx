"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminLoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function loginAdmin() {

    try {

      setLoading(true);

      const { data, error } =
        await supabase
          .from("admins")
          .select("*");

      console.log("ADMINS:", data);

      console.log("ERROR:", error);

      alert(
        JSON.stringify({
          data,
          error,
        })
      );

      if (error) {

        setLoading(false);

        return;
      }

      const admin =
        data?.find(
          (a) =>
            a.email === email &&
            a.password === password
        );

      if (!admin) {

        alert("Admin not found");

        setLoading(false);

        return;
      }

      document.cookie =
        "admin_logged_in=true; path=/;";

      router.push(
        "/admin/dashboard"
      );

    } catch (err) {

      console.log(err);

      alert("Crash happened");
    }
  }

  return (

    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-[40px] p-10">

        <h1 className="text-5xl font-black mb-10 text-center">
          Admin Login
        </h1>

        <div className="space-y-6">

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4"
          />

          <button
            onClick={loginAdmin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 rounded-2xl py-4 font-black"
          >

            {loading
              ? "Logging in..."
              : "Login Admin"}

          </button>

        </div>

      </div>

    </main>
  );
}