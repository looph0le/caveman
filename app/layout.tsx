import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Navbar from "./components/navbar";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { NextAuthProvider } from './providers';
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "@/components/ui/toaster"
import GlobalLoader from "./components/globalLoader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Caveman",
  description: "Be Unfazed",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authConfig);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <NextAuthProvider>
          {session ? <Navbar /> : null}
          <div className="my-[100px]">
            <GlobalLoader />
            {children}
          </div>
          <Toaster />
        </NextAuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
