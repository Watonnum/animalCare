"use client";
import React, { useEffect, useState } from "react";
import { MdPeople, MdSearch, MdEmail, MdPhone } from "react-icons/md";

// Mock data
// const customers = [
//   {
//     id: 1,
//     name: "Marcus Aurelius",
//     pet: "Rex (German Shepherd)",
//     phone: "+1 (555) 019-2045",
//     email: "marcus@example.com",
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "Elena Vance",
//     pet: "Luna (Golden Retriever)",
//     phone: "+1 (555) 837-1293",
//     email: "elena@example.com",
//     status: "Active",
//   },
//   {
//     id: 3,
//     name: "Gordon Freeman",
//     pet: "Barny & 2 others",
//     phone: "+1 (555) 902-3841",
//     email: "gordon@example.com",
//     status: "New",
//   },
// ];

export default function CustomersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto pb-10">
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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-8">
        <div className="flex justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Client Directory</h3>
          <div className="relative w-64">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-500 font-medium">
            Loading customers data...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((customer) => (
              <div
                key={customer._id}
                className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-gray-50/50"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-[#1C2536] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
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
                </div>
                <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm">
                    <span className="font-bold text-gray-900 mr-2">Role:</span>
                    <span className="text-gray-600 font-medium uppercase">
                      {customer.role || "user"}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 font-medium">
                    <MdPhone className="text-gray-400 mr-2" />{" "}
                    {customer.phone || "No phone provided"}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 font-medium">
                    <MdEmail className="text-gray-400 mr-2" /> {customer.email}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
