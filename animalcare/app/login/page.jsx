"use client";

import Btn_googleSignIn from "@/components/btn_googleSignIn";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, Suspense } from "react";
import { motion } from "framer-motion";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // ดึงค่า callbackUrl ออกมาจาก query ถ้าไม่มีให้ใช้ "/" เป็นค่าเริ่มต้น
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous errors

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setError("Invalid email or password. Please try again.");
        console.error("Sign-in error:", result.error);
      } else if (result.ok) {
        // ถ้าล็อคอินสำเร็จ, redirect กลับหน้าเดิมตาม callbackUrl
        router.push(callbackUrl);
        router.refresh(); // Refresh เพื่อให้ server session update
      }
    } catch (e) {
      console.error("Caught an exception: ", e);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  // 🌟 Framer Motion Variants สำหรับทำ Animation
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1, // ค่อยๆ โชว์ทีละส่วน
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-[#fdfbf7] to-[#f4ebe1] p-4 relative overflow-hidden">
      {/* ของตกแต่ง Background แบบเบลอๆ */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>

      <motion.form
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl p-8 rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm">
            Sign in to continue taking care of your pets.
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 text-center shadow-sm"
          >
            {error}
          </motion.div>
        )}

        <div className="space-y-5 mb-6">
          <motion.div variants={itemVariants}>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2 ml-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:border-[#945318] focus:ring-2 focus:ring-[#945318]/20 transition-all outline-none text-gray-700"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-2 ml-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:border-[#945318] focus:ring-2 focus:ring-[#945318]/20 transition-all outline-none text-gray-700 mb-2"
            />
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mb-6">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-[#945318] hover:bg-[#7a4414] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-[#945318]/20 transition-colors focus:outline-none focus:ring-4 focus:ring-[#945318]/30"
          >
            Sign In
          </motion.button>
        </motion.div>

        <motion.div variants={itemVariants} className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-400">
              Or continue with
            </span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Btn_googleSignIn />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-center text-gray-500 text-sm mt-8"
        >
          Don{"'"}t have an account?{" "}
          <a
            href="/register"
            className="text-[#945318] font-bold hover:underline transition-all"
          >
            Sign Up
          </a>
        </motion.p>
      </motion.form>
    </div>
  );
};

// ใช้ Suspense ครอบ Client Component ที่มีการเรียกใช้ useSearchParams เพื่อไม่ให้เกิดปัญหากับ SSR ตอน Build ของ Next.js
const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#fdfbf7]">
          <div className="w-8 h-8 border-4 border-[#945318] border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
};

export default Page;
