// src/app/layout.tsx

"use client"; 

import { SessionProvider } from "next-auth/react"; // Importer SessionProvider
import { metadata } from './metadata'; // Importer metadata depuis le fichier metadata.ts
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-white dark:bg-gray-900">
      <head>
        <meta name="description" content={metadata.description} />
        <meta name="title" content={metadata.title} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
