import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

export default function InventoryTable({
  filteredProducts,
  onEditClick,
  onDeleteClick,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
            <th className="px-6 py-4 font-bold">Item Name</th>
            <th className="px-6 py-4 font-bold">Category</th>
            <th className="px-6 py-4 font-bold">Price</th>
            <th className="px-6 py-4 font-bold">Stock</th>
            <th className="px-6 py-4 font-bold">Status</th>
            <th className="px-6 py-4 font-bold">Last Updated</th>
            <th className="px-6 py-4 font-bold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                onClick={() => onEditClick(item)}
              >
                <td className="px-6 py-4 flex items-center space-x-3">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.brand}
                      className="w-10 h-10 object-cover rounded-lg bg-gray-100 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-gray-400 text-xs font-bold">
                        Img
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="font-bold text-gray-900 block relative group">
                      {item.brand}{" "}
                      {Array.isArray(item.formula)
                        ? item.formula.join(" & ")
                        : item.formula}
                    </span>
                    {item.weight_kg && (
                      <span className="text-xs text-gray-500 font-medium">
                        {item.weight_kg} kg
                      </span>
                    )}
                  </div>
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
                      (item.status || "").toLowerCase() === "active"
                        ? "bg-teal-100 text-teal-800"
                        : (item.status || "").toLowerCase() === "low stock"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {(item.status || "").toLowerCase() === "active"
                      ? "In Stock"
                      : (item.status || "").toLowerCase() === "low stock"
                        ? "Low Stock"
                        : "Out of Stock"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                  {item.updatedAt
                    ? new Date(item.updatedAt).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "-"}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button
                      className="p-2 text-gray-400 hover:text-teal-600 transition-colors bg-gray-50 hover:bg-teal-50 rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditClick(item);
                      }}
                    >
                      <MdEdit className="text-lg" />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-gray-50 hover:bg-red-50 rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onDeleteClick) onDeleteClick(item);
                      }}
                    >
                      <MdDelete className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="px-6 py-12 text-center text-gray-500 bg-gray-50 font-medium"
              >
                No items found matching your criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
