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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function loginAdmin() {

    setLoading(true);

    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) {

      alert("Invalid admin credentials");

      setLoading(false);

      return;
    }

    localStorage.setItem(
      "admin_logged_in",
      "true"
    );

    localStorage.setItem(
      "admin_email",
      data.email
    );

    router.push("/admin/dashboard");
  }

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">

      <div
        className="
          w-full
          max-w-md
          bg-zinc-900
          border
          border-white/10
          rounded-3xl
          p-10
        "
      >

        <h1
          className="
            text-5xl
            font-black
            mb-10
            text-center
          "
        >
          Admin Login
        </h1>

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
              bg-black
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
              bg-black
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
              outline-none
            "
          />

          <button
            onClick={loginAdmin}
            disabled={loading}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              rounded-2xl
              py-4
              font-black
              text-lg
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

      </div>

    </main>
  );
}