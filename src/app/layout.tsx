import "./globals.css";
import type { Metadata } from "next";
import { Cairo, Poppins, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cairo   = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });
const poppins = Poppins({ weight: ["400","600"], subsets: ["latin"], variable: "--font-poppins" });
const inter   = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Sahara • Morocco",
  description: "UN Resolution • Culture • Timeline",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} ${poppins.variable} ${inter.variable} font-[family-name:var(--font-cairo)]`}>
        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
