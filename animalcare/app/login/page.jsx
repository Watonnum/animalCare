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
            className="bg-[#945318] hover:bg-amber-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full hover:cursor-pointer"
          >
            Sign In
          </button>
        </div>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex items-center w-full mt-4 bg-[#4285F4] hover:bg-[#3367D6] active:bg-[#2a56c6] text-white rounded shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#4285F4] active:scale-[0.98] transition-all duration-200 group hover: cursor-pointer"
        >
          <div className="flex items-center justify-center bg-white p-2 m-0.5 rounded-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          </div>

          <span className="flex-1 text-center font-medium font-roboto text-lg tracking-wide">
            Sign in with Google
          </span>
        </button>

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
