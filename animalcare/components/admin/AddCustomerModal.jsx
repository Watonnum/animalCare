"use client";
import React, { useState } from "react";
import { MdCheckCircle } from "react-icons/md";

export default function AddCustomerModal({ isOpen, onClose }) {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputPhoneNum, setInputPhoneNum] = useState("");
  const [inputRole, setInputRole] = useState("user");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!inputName || !inputEmail || !inputPassword) {
      alert("Please fill in all required fields (Name, Email, Password)");
      return;
    }

    setIsLoading(true);
    const newCustomer = {
      name: inputName,
      email: inputEmail,
      password: inputPassword,
      role: inputRole,
      phoneNum: inputPhoneNum,
    };

    try {
      const res = await fetch(`/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer),
      });

      if (!res.ok) {
        throw new Error("Failed to create user");
      }

      console.log(`Create successful\n${newCustomer}`);
      onClose(); // ปิด Modal
      window.location.reload(); // รีเฟรชหน้าเพื่อให้ข้อมูลใหม่แสดง
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl relative mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900">Add New Customer</h3>
          <p className="text-gray-500 text-sm mt-1">
            Create a new account profile.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Display Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Phone Number
              </label>
              <div className="flex items-center px-4 py-3 rounded-xl border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-teal-500">
                <span className="text-xl mr-2">🇹🇭</span>
                <span className="text-gray-400 mr-2 font-medium">+66</span>
                <input
                  type="text"
                  placeholder="0123456789"
                  value={inputPhoneNum}
                  onChange={(e) => setInputPhoneNum(e.target.value)}
                  className="w-full bg-transparent border-none focus:outline-none text-gray-900 font-medium flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Role
              </label>
              <select
                value={inputRole}
                onChange={(e) => setInputRole(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 font-medium"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end items-center mt-10 space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-200 rounded-xl font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors text-sm"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-6 py-3 rounded-xl font-bold text-white bg-teal-500 hover:bg-teal-600 transition-colors shadow-sm text-sm disabled:bg-teal-300"
          >
            {isLoading ? "Creating..." : "Create Customer"}
          </button>
        </div>
      </div>
    </div>
  );
}
