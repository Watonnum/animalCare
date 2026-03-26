"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, Suspense } from "react";

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
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Sign In
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-[#945318] hover:bg-amber-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Sign In
          </button>
        </div>
        <p className="text-center text-gray-500 text-xs mt-6">
          Don{"'"}t have an account?{" "}
          <a href="/register" className="text-amber-800 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

// ใช้ Suspense ครอบ Client Component ที่มีการเรียกใช้ useSearchParams เพื่อไม่ให้เกิดปัญหากับ SSR ตอน Build ของ Next.js
const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
};

export default Page;
