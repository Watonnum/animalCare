"use client";
import React, { useState } from "react";
import { MdEmail, MdPhone } from "react-icons/md";
import { AiOutlineEllipsis } from "react-icons/ai";
import { IoMdArrowDropright } from "react-icons/io";
import { motion } from "framer-motion";
import EditCustomerModal from "@/components/admin/EditCustomerModal";

export default function CustomerCard({ customer }) {
  const [edit, setEdit] = useState(false);
  const [roleHover, setRoleHover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/users/${customer._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to create user");
      }

      console.log(`DELETE successful id:${customer._id}`);
      window.location.reload(); // รีเฟรชหน้าเพื่อให้ข้อมูลใหม่แสดง
    } catch (error) {
      console.error("Error DELETE user:", error);
      alert("Error DELETE user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0 * 0.05 }}
      className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-gray-50/50"
      onMouseLeave={() => {
        if (edit) setEdit(false);
      }}
    >
      <div className="flex items-center space-x-4 mb-4 relative">
        <div className="h-12 w-12 rounded-full bg-[#1C2536] text-white flex items-center justify-center font-bold text-lg shrink-0">
          {customer.name?.charAt(0).toUpperCase() || "?"}
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900">
            {customer.name || "Unknown User"}
          </h4>
          <span
            className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full mt-1 inline-block ${
              customer.role === "admin"
                ? "bg-purple-100 text-purple-800"
                : "bg-teal-100 text-teal-800"
            }`}
          >
            {customer.role || "active"}
          </span>
        </div>
        {/* MenuDropdown Button */}
        <button
          className="absolute top-0 right-0 font-bold border border-transparent rounded-2xl p-1 text-gray-400 hover:text-black focus:border-black cursor-pointer transition-colors"
          onClick={() => setEdit((prev) => !prev)}
        >
          <AiOutlineEllipsis className="text-lg" />
          {edit && (
            <div className="absolute right-0 top-8 w-28 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 z-10 text-sm font-medium">
              <div
                className="px-4 py-2.5 hover:bg-gray-100 cursor-pointer transition-colors text-left text-slate-700"
                onClick={() => {
                  setIsModalOpen(true);
                  setEdit(false);
                }}
              >
                Edit
              </div>
              <div
                className="px-4 py-2.5 hover:bg-red-100 cursor-pointer transition-colors text-left text-red-600 font-semibold"
                onClick={handleDelete}
              >
                Delete
              </div>
              <div
                className="relative flex justify-between items-center px-4 py-2.5 bg-white hover:bg-purple-100 cursor-pointer transition-colors text-left"
                onMouseEnter={() => setRoleHover(true)}
                onMouseLeave={() => setRoleHover(false)}
              >
                <span className="text-purple-600 font-semibold">Role</span>
                <IoMdArrowDropright className="text-purple-600 text-lg" />

                {roleHover && (
                  <div className="absolute top-0 left-full w-28 bg-white shadow-lg border border-gray-100 z-10 text-sm font-medium">
                    <div className="px-4 py-2 hover:bg-[#F3E8FF] cursor-pointer transition-colors text-left text-gray-700 ">
                      Admin
                    </div>
                    <div className="px-4 py-2 hover:bg-[#CBFCF1] cursor-pointer transition-colors text-left text-gray-700">
                      User
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </button>
      </div>
      <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center text-sm">
          <span className="font-bold text-gray-900 mr-2">Role:</span>
          <span className="text-gray-600 font-medium uppercase">
            {customer.role || "user"}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600 font-medium">
          <MdPhone className="text-gray-400 mr-2" /> {/* Edit Modal */}
          <EditCustomerModal
            customer={customer}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          {customer.phoneNum || "No phone provided"}
        </div>
        <div className="flex items-center text-sm text-gray-600 font-medium">
          <MdEmail className="text-gray-400 mr-2" /> {customer.email}
        </div>
      </div>
    </motion.div>
  );
}
