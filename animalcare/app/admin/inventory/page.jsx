"use client";
import React, { useState } from "react";
import { MdAdd, MdEdit, MdDelete, MdSearch } from "react-icons/md";

// Mock data related to frontend products/services
const initialItems = [
  {
    id: 1,
    name: "Premium Dog Food",
    category: "Product",
    price: "$45.00",
    stock: 120,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Standard Grooming",
    category: "Service",
    price: "$60.00",
    stock: "-",
    status: "Active",
  },
  {
    id: 3,
    name: "Cat Tree Tower",
    category: "Product",
    price: "$120.00",
    stock: 15,
    status: "Low Stock",
  },
  {
    id: 4,
    name: "Pet Boarding (Night)",
    category: "Service",
    price: "$80.00",
    stock: "-",
    status: "Active",
  },
  {
    id: 5,
    name: "Chew Toys Assorted",
    category: "Product",
    price: "$15.00",
    stock: 0,
    status: "Out of Stock",
  },
];

export default function InventoryPage() {
  const [filter, setFilter] = useState("All");

  const filteredItems =
    filter === "All"
      ? initialItems
      : initialItems.filter((item) => item.category === filter);

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Products & Services
          </h2>
          <p className="text-gray-500 mt-2 font-medium">
            Manage your inventory and offered services.
          </p>
        </div>
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2.5 px-5 rounded-lg flex items-center shadow-sm transition-colors">
          <MdAdd className="mr-2 text-xl" /> Add Item
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter("All")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filter === "All" ? "bg-[#111928] text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
            >
              All Items
            </button>
            <button
              onClick={() => setFilter("Product")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filter === "Product" ? "bg-[#111928] text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
            >
              Products
            </button>
            <button
              onClick={() => setFilter("Service")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filter === "Service" ? "bg-[#111928] text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
            >
              Services
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search inventory..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Item Name</th>
                <th className="px-6 py-4 font-bold">Category</th>
                <th className="px-6 py-4 font-bold">Price</th>
                <th className="px-6 py-4 font-bold">Stock</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900">{item.name}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-bold">
                    {item.price}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                    {item.stock}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === "In Stock" || item.status === "Active"
                          ? "bg-teal-100 text-teal-800"
                          : item.status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button className="p-2 text-gray-400 hover:text-teal-600 transition-colors bg-gray-50 hover:bg-teal-50 rounded-lg">
                        <MdEdit className="text-lg" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-gray-50 hover:bg-red-50 rounded-lg">
                        <MdDelete className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
