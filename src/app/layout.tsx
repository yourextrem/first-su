import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RPG Game",
  description: "A simple RPG game built with Next.js and Phaser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js" strategy="beforeInteractive" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}