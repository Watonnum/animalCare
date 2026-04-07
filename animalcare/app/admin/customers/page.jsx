"use client";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import CustomerHeader from "@/components/admin/CustomerHeader";
import CustomerCard from "@/components/admin/CustomerCard";

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
      <CustomerHeader />

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
              <CustomerCard key={customer._id} customer={customer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
