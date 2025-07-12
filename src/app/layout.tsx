// src/app/layout.tsx
// Root layout of the entire application
import React from 'react';
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Analytics from './_components/Analytics';

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Real Estate Application",
  description: "Real estate management and listing application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body className={`bg-gray-50 min-h-screen antialiased ${raleway.variable} font-sans`}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
