import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/navigation/Navbar";
import Footer from "@/navigation/Footer";
import StoreProvider from "@/store/StoreProvider";
import Provider from "@/lib/Provider";
import {Toaster} from "@/components/ui/sonner";
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Topflight Apps Assignment",
  description: "Created by Sujith Varughese",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          <StoreProvider>
            <Navbar />
              {children}
            <Footer />
            <Toaster />
            <Analytics />
          </StoreProvider>
        </Provider>
      </body>
    </html>
  );
}
