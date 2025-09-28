// src/app/layout.tsx

import ThemeInitializer from "./providers/ThemeInitializer";
import AuthProvider from "./providers/AuthProvider";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purchase Tracker",
  description: "New Project from viktor_srhk on Instagram.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full bg-white dark:bg-gray-900"
      suppressHydrationWarning
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <ThemeInitializer />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
