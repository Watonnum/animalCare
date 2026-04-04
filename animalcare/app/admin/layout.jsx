"use client";
import React from "react";
import Sidebar from "@/components/admin/Sidebar";
import TopNavbar from "@/components/admin/TopNavbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <div className="flex-1 overflow-y-auto px-8 pb-8">{children}</div>
      </main>
    </div>
  );
}
