"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { MdCheckCircle, MdEdit, MdDelete } from "react-icons/md";

export default function EditCustomerModal({ customer, isOpen, onClose }) {
  const [form, setForm] = useState({});
  const [inputName, setInputName] = useState(customer?.name || "");
  const [inputEmail, setInputEmail] = useState(customer?.email || "");
  const [inputPhoneNum, setInputPhoneNum] = useState(
    customer?.phone ? customer.phone.replace("+66", "").trim() : "",
  );

  if (!isOpen) return null;

  // Extract a fallback username from name
  const username =
    customer.name?.toLowerCase().replace(/\s/g, "") || "username";
  const defaultImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    customer.name || "User",
  )}&background=f3f4f6&color=4b5563`;

  const handleSubmit = async () => {
    const updatedForm = {
      name: inputName,
      email: inputEmail,
      role: customer?.role,
      phoneNum: inputPhoneNum,
    };
    setForm(updatedForm);

    // console.log("Submitted Data:", updatedForm);
    try {
      const res = await fetch(`/api/users/${customer._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedForm),
      });

      if (!res.ok) {
        throw new Error("Failed to update user");
      }

      console.log(`Update data successful at _id:${customer.id}`);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating user:", error);
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
        {/* Header / Avatar */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative cursor-pointer group">
            <div className="h-20 w-20 rounded-full flex items-center justify-center text-2xl font-bold bg-gray-100 overflow-hidden">
              <img
                src={customer.image || defaultImage}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-[#FFF1F2] text-red-500 p-1.5 rounded-full border-2 border-white shadow-sm hover:scale-105 transition-transform">
              <MdEdit size={16} />
            </button>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {customer.name || "Unknown User"}
            </h3>
            <p className="text-gray-500 text-sm">
              {customer?.role.charAt(0).toUpperCase() +
                customer.role.slice(1) || "user"}
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Display Name
            </label>
            <input
              type="text"
              placeholder={customer.name}
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
                console.log(inputName);
              }}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Email
            </label>
            <div className="flex items-center px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-gray-300">
              <input
                type="email"
                value={customer?.email}
                disabled={true}
                className="w-full bg-transparent border-none focus:outline-none text-gray-900 font-medium flex-1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Phone Number
            </label>
            <div className="flex items-center px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-gray-300">
              <span className="text-xl mr-2">🇹🇭</span>
              <input
                type="text"
                placeholder={customer.phoneNum ? customer.phoneNum.trim() : ""}
                value={inputPhoneNum}
                onChange={(e) => {
                  setInputPhoneNum(e.target.value);
                  console.log(inputPhoneNum);
                }}
                className="w-full bg-transparent border-none focus:outline-none text-gray-900 font-medium flex-1"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-10">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-200 rounded-xl font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              className="px-6 py-3 rounded-xl font-bold text-white bg-[#1C2536] hover:bg-[#2a364d] transition-colors shadow-sm text-sm"
              onClick={() => {
                handleSubmit();
              }}
            >
              Save Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
