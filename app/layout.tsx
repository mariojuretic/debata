import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/Header";
import NextAuthProvider from "@/components/NextAuthProvider";
import ApolloWrapper from "@/components/ApolloWrapper";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Debata: Explore Interests, Share Views",
  description: "Generated by Mario Juretić",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-screen overflow-y-scroll bg-slate-200 text-slate-900`}
      >
        <NextAuthProvider>
          <ApolloWrapper>
            <Header />
            <main>{children}</main>
          </ApolloWrapper>
        </NextAuthProvider>
      </body>
    </html>
  );
}
