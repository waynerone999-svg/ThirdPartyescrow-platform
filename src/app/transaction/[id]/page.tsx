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

  const transactionId =
    Number(params.id);

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

  const [sellerPayoutMethod, setSellerPayoutMethod] =
    useState("");

  const [sellerPayoutDetails, setSellerPayoutDetails] =
    useState("");

  const adminEmail =
    "waynerone999@gmail.com";

  async function getUser() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  }

  async function loadTransaction() {

    const { data, error } =
      await supabase
        .from("transactions")
        .select("*")
        .eq("id", transactionId)
        .single();

    if (error || !data) {

      setTransaction("not-found");

      return;
    }

    const currentEmail =
      user?.email?.toLowerCase();

    const buyerEmail =
      data.buyer_email?.toLowerCase();

    const sellerEmail =
      data.seller_email?.toLowerCase();

    if (
      currentEmail !== buyerEmail &&
      currentEmail !== sellerEmail &&
      currentEmail !== adminEmail
    ) {

      setTransaction("unauthorized");

      return;
    }

    setTransaction(data);

    if (
      currentEmail === buyerEmail
    ) {
      setRole("buyer");
    }

    if (
      currentEmail === sellerEmail
    ) {
      setRole("seller");
    }

    if (
      currentEmail === adminEmail
    ) {
      setRole("admin");
    }
  }

  async function loadMessages() {

    const { data } =
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

    setMessages(data || []);
  }

  async function sendMessage() {

    if (!message.trim()) return;

    await supabase
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

    setMessage("");
  }

  async function sellerAccept() {

    if (
      !sellerPayoutMethod ||
      !sellerPayoutDetails
    ) {

      alert(
        "Enter payout method and payout details"
      );

      return;
    }

    await supabase
      .from("transactions")
      .update({

        status: "accepted",

        seller_payout_method:
          sellerPayoutMethod,

        seller_payout_details:
          sellerPayoutDetails,

      })
      .eq("id", transactionId);
  }

  async function buyerPaid() {

    await supabase
      .from("transactions")
      .update({
        status: "paid",
      })
      .eq("id", transactionId);
  }

  async function sellerReleased() {

    await supabase
      .from("transactions")
      .update({
        status: "released",
      })
      .eq("id", transactionId);
  }

  async function buyerConfirmed() {

    await supabase
      .from("transactions")
      .update({
        status: "completed",
      })
      .eq("id", transactionId);
  }

  async function fileComplaint() {

    await supabase
      .from("transactions")
      .update({
        status: "disputed",
      })
      .eq("id", transactionId);
  }

  async function adminComplete() {

    await supabase
      .from("transactions")
      .update({
        status: "completed",
      })
      .eq("id", transactionId);
  }

  async function adminDispute() {

    await supabase
      .from("transactions")
      .update({
        status: "disputed",
      })
      .eq("id", transactionId);
  }

  useEffect(() => {

    getUser();

  }, []);

  useEffect(() => {

    if (!user) return;

    loadTransaction();

    loadMessages();

    /* REALTIME MESSAGES */

    const messageChannel = supabase

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

    /* REALTIME TRANSACTION STATUS */

    const transactionChannel = supabase

      .channel(
        `transaction-${transactionId}`
      )

      .on(
        "postgres_changes",

        {
          event: "*",
          schema: "public",
          table: "transactions",
          filter: `id=eq.${transactionId}`,
        },

        () => {

          loadTransaction();

        }
      )

      .subscribe();

    return () => {

      supabase.removeChannel(
        messageChannel
      );

      supabase.removeChannel(
        transactionChannel
      );
    };

  }, [user]);

  if (!transaction || transaction === null) {

    return (

      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        Loading...

      </main>
    );
  }

  return (

    <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8">

      <div className="max-w-6xl mx-auto">

        <div className="mb-10">

          <h1 className="text-4xl md:text-5xl font-black mb-5">
            {transaction.transaction_name}
          </h1>

          <div className="space-y-3 text-slate-300">

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
              Payment Method:
              {" "}
              <span className="text-green-400 font-bold">
                {transaction.payment_method}
              </span>
            </p>

            <p>
              Escrow Code:
              {" "}
              {transaction.transaction_code}
            </p>

            <p>
              Buyer Country:
              {" "}
              {transaction.buyer_country}
            </p>

            <p>
              Escrow Fee:
              {" "}
              ${transaction.escrow_fee}
            </p>

            <p>
              Buyer Pays:
              {" "}
              ${transaction.buyer_total}
            </p>

            <p>
              Seller Receives:
              {" "}
              ${transaction.seller_receives}
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

        {transaction.seller_payout_method && (

          <div
            className="
              bg-slate-900
              border
              border-blue-500/30
              rounded-3xl
              p-8
              mb-8
            "
          >

            <h2 className="text-3xl font-black mb-5">
              Seller Payout Info
            </h2>

            <p className="mb-3">

              <strong>Method:</strong>

              {" "}

              {transaction.seller_payout_method}

            </p>

            <p>

              <strong>Details:</strong>

              {" "}

              {transaction.seller_payout_details}

            </p>

          </div>
        )}

        {/* CHAT */}

        <div
          className="
            bg-slate-900
            border
            border-white/10
            rounded-3xl
            p-6
            h-[450px]
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
                      max-w-[80%]
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
                      {msg.sender}
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

        {/* MESSAGE INPUT */}

        <div className="flex flex-col md:flex-row gap-4 mb-10">

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
              py-4
              rounded-2xl
              font-bold
            "
          >
            Send
          </button>

        </div>

        {/* ACTIONS */}

        <div className="flex flex-wrap gap-5">

          {role === "seller" &&
            transaction.status === "pending" && (

            <div
              className="
                bg-slate-900
                border
                border-green-500/30
                rounded-3xl
                p-8
                w-full
                max-w-2xl
              "
            >

              <h2 className="text-3xl font-black mb-6">
                Accept Transaction
              </h2>

              <select
                value={sellerPayoutMethod}

                onChange={(e) =>
                  setSellerPayoutMethod(
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
                  mb-5
                "
              >

                <option value="">
                  Select payout method
                </option>

                <option>
                  Wise
                </option>

                <option>
                  USDT Crypto
                </option>

                <option>
                  Bank Transfer
                </option>

                <option>
                  PayPal
                </option>

                <option>
                  M-Pesa
                </option>

              </select>

              <textarea
                placeholder="Enter payout details"

                value={sellerPayoutDetails}

                onChange={(e) =>
                  setSellerPayoutDetails(
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
                  py-5
                  min-h-[140px]
                  mb-6
                "
              />

              <button
                onClick={sellerAccept}

                className="
                  bg-green-600
                  hover:bg-green-700
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                "
              >
                Accept Transaction
              </button>

            </div>
          )}

          {role === "buyer" &&
            transaction.status === "accepted" && (

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

          {role === "seller" &&
            transaction.status === "paid" && (

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
          )}

          {role === "buyer" &&
            transaction.status === "released" && (

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
                File Dispute
              </button>

            </>
          )}

          {role === "admin" && (

            <div className="flex flex-wrap gap-4">

              <button
                onClick={adminComplete}

                className="
                  bg-blue-600
                  hover:bg-blue-700
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                "
              >
                Force Complete
              </button>

              <button
                onClick={adminDispute}

                className="
                  bg-red-600
                  hover:bg-red-700
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                "
              >
                Force Dispute
              </button>

            </div>
          )}

        </div>

      </div>

    </main>
  );
}