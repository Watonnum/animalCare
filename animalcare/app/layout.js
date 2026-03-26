import Navbar from "@/components/navbar";
import "./globals.css";
import NextAuthProvider from "./provider/nextAuthProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="mx-[5%] mt-6 bg-[#FEF9F2]">
        <NextAuthProvider>
          <Navbar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
