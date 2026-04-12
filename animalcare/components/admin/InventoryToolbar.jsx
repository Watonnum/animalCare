import React from "react";
import { MdSearch } from "react-icons/md";

export default function InventoryToolbar({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
      <div className="flex space-x-2">
        <button
          onClick={() => setFilter("All")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filter === "All" ? "bg-[#111928] text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
        >
          All Items
        </button>
      </div>

      <div className="relative w-full sm:w-72">
        <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search inventory..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium"
        />
      </div>
    </div>
  );
}
