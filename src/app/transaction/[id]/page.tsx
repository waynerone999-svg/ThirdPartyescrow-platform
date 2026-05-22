"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TransactionPage() {

  const params = useParams();

  const transactionId = Number(params.id);

  const [transaction, setTransaction] =
    useState<any>(null);

  const [messages, setMessages] =
    useState<any[]>([]);

  const [message, setMessage] =
    useState("");

  const [user, setUser] =
    useState<any>(null);

  const [role, setRole] =
    useState("");

  async function getUser() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  }

  async function loadTransaction() {

    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", transactionId)
      .single();

    if (!data) return;

    setTransaction(data);

    if (
      user?.email === data.buyer_email
    ) {
      setRole("buyer");
    }

    if (
      user?.email === data.seller_email
    ) {
      setRole("seller");
    }
  }

  async function loadMessages() {

    const { data, error } =
      await supabase
        .from("messages")
        .select("*")
        .eq(
          "transaction_id",
          transactionId
        )
        .order("id", {
          ascending: true,
        });

    if (error) {
      console.log(error);
      return;
    }

    setMessages(data || []);
  }

  async function sendMessage() {

    if (!message.trim()) return;

    const { error } = await supabase
      .from("messages")
      .insert([
        {
          transaction_id:
            transactionId,

          sender:
            user?.email,

          message,
        },
      ]);

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    setMessage("");

    loadMessages();
  }

  async function buyerPaid() {

    await supabase
      .from("transactions")
      .update({
        status: "paid",
      })
      .eq("id", transactionId);

    loadTransaction();
  }

  async function sellerReleased() {

    await supabase
      .from("transactions")
      .update({
        status: "released",
      })
      .eq("id", transactionId);

    loadTransaction();
  }

  async function buyerConfirmed() {

    await supabase
      .from("transactions")
      .update({
        status: "completed",
      })
      .eq("id", transactionId);

    loadTransaction();
  }

  async function fileComplaint() {

    await supabase
      .from("transactions")
      .update({
        status: "disputed",
      })
      .eq("id", transactionId);

    loadTransaction();
  }

  useEffect(() => {

    getUser();

  }, []);

  useEffect(() => {

    if (!user) return;

    loadTransaction();

    loadMessages();

    const channel = supabase

      .channel(
        `messages-${transactionId}`
      )

      .on(
        "postgres_changes",

        {
          event: "*",
          schema: "public",
          table: "messages",
        },

        () => {

          loadMessages();

        }
      )

      .subscribe();

    return () => {

      supabase.removeChannel(
        channel
      );

    };

  }, [user]);

  if (!transaction) {

    return (

      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        Loading...

      </main>
    );
  }

  return (

    <main className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-5xl font-black mb-4">
            {transaction.transaction_name}
          </h1>

          <div className="space-y-2 text-slate-300">

            <p>
              Amount:
              {" "}
              ${transaction.amount}
            </p>

            <p>
              Status:
              {" "}
              {transaction.status}
            </p>

            <p>
              Escrow Code:
              {" "}
              {transaction.transaction_code}
            </p>

            <p>
              You are:
              {" "}

              <span className="capitalize font-bold">
                {role}
              </span>

            </p>

          </div>

        </div>

        {/* CHAT */}
        <div
          className="
            bg-slate-900
            border
            border-white/10
            rounded-3xl
            p-6
            h-[500px]
            overflow-y-auto
            mb-6
          "
        >

          <div className="space-y-4">

            {messages.map((msg) => {

              const mine =
                msg.sender ===
                user?.email;

              return (

                <div
                  key={msg.id}
                  className={`flex ${
                    mine
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`
                      max-w-[70%]
                      px-5
                      py-4
                      rounded-3xl
                      ${
                        mine
                          ? "bg-blue-600"
                          : "bg-slate-800"
                      }
                    `}
                  >

                    <p className="text-sm text-white/70 mb-2">

                      {msg.sender ===
                        transaction.buyer_email
                          ? "Buyer"
                          : "Seller"}

                    </p>

                    <p>
                      {msg.message}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* SEND MESSAGE */}
        <div className="flex gap-4 mb-8">

          <input
            value={message}

            onChange={(e) =>
              setMessage(e.target.value)
            }

            placeholder="Type message"

            className="
              flex-1
              bg-slate-900
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
            "
          />

          <button
            onClick={sendMessage}

            className="
              bg-blue-600
              hover:bg-blue-700
              px-8
              rounded-2xl
              font-bold
            "
          >
            Send
          </button>

        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap gap-4">

          {/* BUYER PAID */}
          {role === "buyer" &&
            transaction.status ===
              "pending" && (

            <button
              onClick={buyerPaid}

              className="
                bg-green-600
                hover:bg-green-700
                px-8
                py-4
                rounded-2xl
                font-bold
              "
            >
              I Have Paid
            </button>
          )}

          {/* SELLER RELEASE */}
          {role === "seller" &&
            transaction.status === "paid" && (

            <div
              className="
                bg-green-900/30
                border
                border-green-500
                rounded-3xl
                p-6
                space-y-5
                w-full
                max-w-xl
              "
            >

              <div>

                <h2 className="text-2xl font-black text-green-400 mb-2">
                  ASSETS PAID AND SECURED BY ESCROW
                </h2>

                <p className="text-slate-300">
                  Buyer payment has been confirmed.
                  You can now safely release
                  the agreed assets/services.
                </p>

              </div>

              <button
                onClick={sellerReleased}

                className="
                  bg-yellow-500
                  hover:bg-yellow-600
                  text-black
                  px-8
                  py-4
                  rounded-2xl
                  font-black
                "
              >
                Release Assets
              </button>

            </div>
          )}

          {/* BUYER CONFIRM */}
          {role === "buyer" &&
            transaction.status ===
              "released" && (

            <>

              <button
                onClick={buyerConfirmed}

                className="
                  bg-blue-600
                  hover:bg-blue-700
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                "
              >
                Confirm Received
              </button>

              <button
                onClick={fileComplaint}

                className="
                  bg-red-600
                  hover:bg-red-700
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                "
              >
                File Complaint
              </button>

            </>
          )}

        </div>

      </div>

    </main>
  );
}