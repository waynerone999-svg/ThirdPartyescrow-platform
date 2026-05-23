"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {

  const router = useRouter();

  useEffect(() => {

    async function checkAdmin() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {

        router.push("/login");

        return;
      }

      console.log(user.email);

      if (
        user.email
          ?.toLowerCase()
          .trim() !==
        "waynerone999@gmail.com"
      ) {

        router.push("/dashboard");

        return;
      }

      router.push("/admin/dashboard");
    }

    checkAdmin();

  }, []);

  return (

    <main
      className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
      "
    >

      Checking Admin Access...

    </main>
  );
}