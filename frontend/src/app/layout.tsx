import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/Footer";
import ToastProvider from "@/providers/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Contact Book - A Contact Management App",
  description: "Developed by ~Zain-ul-Abdin",
  creator: "Muhammad Zain-ul-Abdin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-w-[350px]`}>
        <ToastProvider />
        <Navbar />
        <main>{children}</main>
        <div className="w-full fixed bottom-0">
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
