/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { MdSearch, MdNotifications, MdApps } from "react-icons/md";

export default function TopNavbar() {
  const { data: session } = useSession();
  const user = session?.user;
  const [imgLoading, setImgLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const hasDisplayImage =
    user?.image && user.image !== "" && user.image !== "null";

  console.log(user);
  return (
    <header className="h-20 bg-white md:bg-transparent px-8 flex items-center justify-between border-b md:border-none border-gray-200 py-6">
      <div className="flex-1 max-w-xl relative">
        <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <input
          type="text"
          placeholder="Search analytics..."
          className="w-full pl-12 pr-4 py-2.5 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium text-gray-700"
        />
      </div>
      <div className="flex items-center space-x-6 pl-4">
        <button className="text-gray-400 hover:text-gray-700 relative">
          <MdNotifications className="text-2xl" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="text-gray-400 hover:text-gray-700">
          <MdApps className="text-2xl" />
        </button>
        <div className="hidden md:block bg-[#111928] text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors select-none">
          {user ? user.name : <>Loading...</>}
        </div>
        <div className="relative h-14 w-14 rounded-full border-2 border-white shadow-sm shrink-0 flex flex-col items-center justify-center bg-[#111928] text-white font-bold text-xl overflow-hidden">
          {hasDisplayImage && !imgError ? (
            <>
              {imgLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse z-10"></div>
              )}
              <img
                src={user.image}
                alt="User Profile"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  imgLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setImgLoading(false)}
                onError={() => {
                  setImgError(true);
                  setImgLoading(false);
                }}
              />
            </>
          ) : (
            <span className="select-none tracking-widest">
              {getInitials(user?.name)}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
