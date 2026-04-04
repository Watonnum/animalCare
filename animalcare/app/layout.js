"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import "./globals.css";
import NextAuthProvider from "./provider/nextAuthProvider";

export default function RootLayout({ children }) {
  const path = usePathname();
  console.log(path);
  return (
    <html lang="en">
      <body
        className={`${path?.startsWith("/admin") ? "" : "mx-[5%] mt-6 bg-[#FEF9F2]"}`}
      >
        <NextAuthProvider>
          {path?.startsWith("/admin") ? null : <Navbar />}
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
