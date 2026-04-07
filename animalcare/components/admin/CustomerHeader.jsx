import React from "react";
import { MdPeople } from "react-icons/md";

export default function CustomerHeader() {
  return (
    <div className="flex justify-between items-end mb-8">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Customers
        </h2>
        <p className="text-gray-500 mt-2 font-medium">
          Manage pet owners and their profiles.
        </p>
      </div>
      <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2.5 px-5 rounded-lg flex items-center shadow-sm transition-colors">
        <MdPeople className="mr-2 text-xl" /> Add Customer
      </button>
    </div>
  );
}
