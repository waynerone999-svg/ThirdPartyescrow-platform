"use client";

import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TransactionChatPage() {

  const [user, setUser] =
    useState<any>(null);

  const [transactions, setTransactions] =
    useState<any[]>([]);

  const [messages, setMessages] =
    useState<any[]>([]);

  const [messageInputs, setMessageInputs] =
    useState<{ [key: number]: string }>({});

  async function getUser() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  }

  async function loadTransactions() {

    if (!user?.email) return;

    const { data } = await supabase
      .from("transactions")
      .select("*")
      .or(
        `buyer_email.eq.${user.email},seller_email.eq.${user.email}`
      )
      .order("id", {
        ascending: false,
      });

    setTransactions(data || []);
  }

  async function loadMessages() {

    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", {
        ascending: true,
      });

    setMessages(data || []);
  }

  async function sendMessage(
    transactionId: number,
    isBuyer: boolean
  ) {

    const message =
      messageInputs[transactionId];

    if (!message) return;

    await supabase
      .from("messages")
      .insert([
        {
          transaction_id:
            transactionId,

          sender: isBuyer
            ? "Buyer"
            : "Seller",

          message,
        },
      ]);

    setMessageInputs({
      ...messageInputs,
      [transactionId]: "",
    });

    loadMessages();
  }

  async function markPaid(id: number) {

    await supabase
      .from("transactions")
      .update({
        paid: true,
        status:
          "payment_submitted",
      })
      .eq("id", id);

    loadTransactions();
  }

  async function releaseTransaction(
    id: number
  ) {

    await supabase
      .from("transactions")
      .update({
        released: true,
        status: "released",
      })
      .eq("id", id);

    loadTransactions();
  }

  async function confirmReceived(
    id: number
  ) {

    await supabase
      .from("transactions")
      .update({
        received: true,
        status: "completed",
      })
      .eq("id", id);

    loadTransactions();
  }

  async function fileDispute(
    id: number
  ) {

    await supabase
      .from("transactions")
      .update({
        disputed: true,
        status: "disputed",
      })
      .eq("id", id);

    loadTransactions();
  }

  useEffect(() => {

    getUser();

  }, []);

  useEffect(() => {

    if (!user) return;

    loadTransactions();

    loadMessages();

    const interval =
      setInterval(() => {

        loadTransactions();

        loadMessages();

      }, 2000);

    return () =>
      clearInterval(interval);

  }, [user]);

  return (

    <main className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-6xl mx-auto">

        <div className="mb-10">

          <h1 className="text-5xl font-black mb-4">
            Escrow Transactions
          </h1>

          <p className="text-slate-400 text-lg">
            Secure escrow messaging
            workflow.
          </p>

        </div>

        {transactions.map(
          (transaction) => {

            const isBuyer =
              user?.email ===
              transaction.buyer_email;

            const isSeller =
              user?.email ===
              transaction.seller_email;

            const transactionMessages =
              messages.filter(
                (msg) =>
                  msg.transaction_id ===
                  transaction.id
              );

            return (

              <div
                key={transaction.id}
                className="
                  bg-slate-900
                  border
                  border-white/10
                  rounded-3xl
                  overflow-hidden
                  mb-10
                "
              >

                {/* TOP */}
                <div className="p-8 border-b border-white/10">

                  <div className="flex justify-between">

                    <div>

                      <div className="flex items-center gap-4 mb-4">

                        <h2 className="text-3xl font-bold">
                          {
                            transaction.transaction_name
                          }
                        </h2>

                        {isBuyer && (

                          <div
                            className="
                              bg-blue-500/20
                              text-blue-400
                              px-4
                              py-2
                              rounded-xl
                              font-bold
                            "
                          >
                            You are Buying
                          </div>

                        )}

                        {isSeller && (

                          <div
                            className="
                              bg-green-500/20
                              text-green-400
                              px-4
                              py-2
                              rounded-xl
                              font-bold
                            "
                          >
                            You are Selling
                          </div>

                        )}

                      </div>

                      <div className="space-y-2 text-slate-300">

                        <p>
                          <strong>
                            Escrow Code:
                          </strong>{" "}
                          {
                            transaction.transaction_code
                          }
                        </p>

                        <p>
                          <strong>
                            Amount:
                          </strong>{" "}
                          $
                          {
                            transaction.amount
                          }
                        </p>

                        <p>
                          <strong>
                            Status:
                          </strong>{" "}
                          {
                            transaction.status
                          }
                        </p>

                      </div>

                    </div>

                    {/* STATUS */}
                    <div>

                      {transaction.status ===
                      "completed" ? (

                        <div
                          className="
                            bg-green-500/20
                            text-green-400
                            px-5
                            py-3
                            rounded-2xl
                            font-bold
                          "
                        >
                          Completed
                        </div>

                      ) : transaction.status ===
                        "disputed" ? (

                        <div
                          className="
                            bg-red-500/20
                            text-red-400
                            px-5
                            py-3
                            rounded-2xl
                            font-bold
                          "
                        >
                          Disputed
                        </div>

                      ) : transaction.status ===
                        "released" ? (

                        <div
                          className="
                            bg-purple-500/20
                            text-purple-400
                            px-5
                            py-3
                            rounded-2xl
                            font-bold
                          "
                        >
                          Released
                        </div>

                      ) : transaction.status ===
                        "payment_submitted" ? (

                        <div
                          className="
                            bg-blue-500/20
                            text-blue-400
                            px-5
                            py-3
                            rounded-2xl
                            font-bold
                          "
                        >
                          Payment Submitted
                        </div>

                      ) : transaction.status ===
                        "accepted" ? (

                        <div
                          className="
                            bg-green-500/20
                            text-green-400
                            px-5
                            py-3
                            rounded-2xl
                            font-bold
                          "
                        >
                          Accepted
                        </div>

                      ) : (

                        <div
                          className="
                            bg-yellow-500/20
                            text-yellow-400
                            px-5
                            py-3
                            rounded-2xl
                            font-bold
                          "
                        >
                          Pending
                        </div>

                      )}

                    </div>

                  </div>

                </div>

                {/* CHAT */}
                <div className="p-8 space-y-5">

                  {transactionMessages.map(
                    (msg: any) => {

                      const buyerMessage =
                        msg.sender ===
                        "Buyer";

                      return (

                        <div
                          key={msg.id}
                          className={`
                            flex
                            ${
                              buyerMessage
                                ? "justify-end"
                                : "justify-start"
                            }
                          `}
                        >

                          <div
                            className={`
                              max-w-2xl
                              rounded-2xl
                              p-5
                              border

                              ${
                                buyerMessage

                                  ? `
                                    bg-blue-600/20
                                    border-blue-500/20
                                  `

                                  : `
                                    bg-green-600/20
                                    border-green-500/20
                                  `
                              }
                            `}
                          >

                            <div
                              className={`
                                font-bold
                                mb-2

                                ${
                                  buyerMessage
                                    ? "text-blue-400"
                                    : "text-green-400"
                                }
                              `}
                            >

                              {msg.sender}

                            </div>

                            <p>
                              {msg.message}
                            </p>

                          </div>

                        </div>

                      );
                    }
                  )}

                  {/* INPUT */}
                  <div className="flex gap-4 pt-4">

                    <input
                      type="text"
                      value={
                        messageInputs[
                          transaction.id
                        ] || ""
                      }
                      onChange={(e) =>
                        setMessageInputs({
                          ...messageInputs,

                          [transaction.id]:
                            e.target.value,
                        })
                      }
                      placeholder={
                        isBuyer

                          ? "Send message as buyer..."

                          : "Send message as seller..."
                      }
                      className="
                        flex-1
                        bg-slate-950
                        border
                        border-white/10
                        rounded-2xl
                        px-5
                        py-4
                      "
                    />

                    <button
                      onClick={() =>
                        sendMessage(
                          transaction.id,
                          isBuyer
                        )
                      }
                      className={`
                        px-8
                        rounded-2xl
                        font-bold

                        ${
                          isBuyer

                            ? `
                              bg-blue-600
                              hover:bg-blue-700
                            `

                            : `
                              bg-green-600
                              hover:bg-green-700
                            `
                        }
                      `}
                    >
                      Send
                    </button>

                  </div>
                  {/* SELLER ACCEPT */}
{isSeller &&
  transaction.status ===
    "pending" && (

  <button
    onClick={async () => {

      await supabase
        .from("transactions")
        .update({
          status: "accepted",
        })
        .eq("id", transaction.id);

      loadTransactions();
    }}
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

)}

                  {/* BUYER PAY */}
                  {isBuyer &&
                    transaction.status ===
                      "accepted" && (

                    <button
                      onClick={() =>
                        markPaid(
                          transaction.id
                        )
                      }
                      className="
                        bg-blue-600
                        hover:bg-blue-700
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
                  {isSeller &&
                    transaction.status ===
                      "payment_submitted" && (

                    <button
                      onClick={() =>
                        releaseTransaction(
                          transaction.id
                        )
                      }
                      className="
                        bg-green-600
                        hover:bg-green-700
                        px-8
                        py-4
                        rounded-2xl
                        font-bold
                      "
                    >
                      I Have Released
                    </button>

                  )}

                  {/* BUYER FINAL */}
                  {isBuyer &&
                    transaction.status ===
                      "released" && (

                    <div className="flex gap-4">

                      <button
                        onClick={() =>
                          confirmReceived(
                            transaction.id
                          )
                        }
                        className="
                          bg-green-600
                          hover:bg-green-700
                          px-8
                          py-4
                          rounded-2xl
                          font-bold
                        "
                      >
                        Item Received
                      </button>

                      <button
                        onClick={() =>
                          fileDispute(
                            transaction.id
                          )
                        }
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

                    </div>

                  )}

                </div>

              </div>

            );
          }
        )}

      </div>

    </main>
  );
}