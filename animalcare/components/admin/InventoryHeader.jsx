import React from "react";
import { MdAdd } from "react-icons/md";

export default function InventoryHeader({ onAddClick }) {
  return (
    <div className="flex justify-between items-end mb-8">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Products Inventory
        </h2>
        <p className="text-gray-500 mt-2 font-medium">
          Manage your products and stock.
        </p>
      </div>
      <button
        onClick={onAddClick}
        className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2.5 px-5 rounded-lg flex items-center shadow-sm transition-colors"
      >
        <MdAdd className="mr-2 text-xl" /> Add Item
      </button>
    </div>
  );
}
