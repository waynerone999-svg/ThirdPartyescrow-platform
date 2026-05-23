import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3rdParty Escrow",
  description:
    "Secure global escrow platform for buyers and sellers worldwide.",

  keywords: [
    "escrow",
    "secure payments",
    "online escrow",
    "buyer protection",
    "seller protection",
    "crypto escrow",
    "USDT escrow",
    "international payments",
  ],

  authors: [
    {
      name: "3rdParty Escrow",
    },
  ],

  openGraph: {
    title: "3rdParty Escrow",
    description:
      "Secure global escrow platform for buyers and sellers worldwide.",

    url:
      "https://third-partyescrow-platform.vercel.app",

    siteName:
      "3rdParty Escrow",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "3rdParty Escrow",

    description:
      "Secure global escrow platform for buyers and sellers worldwide.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        h-full
        antialiased
      `}
    >

      <body
        className="
          min-h-full
          bg-slate-950
          text-white
          flex
          flex-col
        "
      >

        {children}

      </body>

    </html>
  );
}