"use client";
import React, { useEffect, useState } from "react";
import { MdAdd, MdEdit, MdDelete, MdSearch } from "react-icons/md";

export default function InventoryPage() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal and Edit states
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/shop");
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();

        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const filteredProducts = product.filter((item) => {
    const matchesFilter =
      filter === "All" ||
      (item.category &&
        String(item.category).toLowerCase().includes(filter.toLowerCase()));

    const searchLower = searchQuery.toLowerCase();
    const brandStr = item.brand ? String(item.brand).toLowerCase() : "";
    const formulaStr = item.formula ? String(item.formula).toLowerCase() : "";
    const categoryStr = item.category
      ? String(item.category).toLowerCase()
      : "";
    const priceStr = item.price ? String(item.price).toLowerCase() : "";

    const matchesSearch =
      brandStr.includes(searchLower) ||
      formulaStr.includes(searchLower) ||
      categoryStr.includes(searchLower) ||
      priceStr.includes(searchLower);
    return matchesFilter && matchesSearch;
  });

  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditForm({
      ...item,
      formula: Array.isArray(item.formula)
        ? item.formula.join(", ")
        : item.formula || "",
      category: Array.isArray(item.category)
        ? item.category.join(", ")
        : item.category || "",
    });
  };

  const handleSaveEdit = async (e) => {
    console.log(editingItem);
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        ...editForm,
        formula:
          typeof editForm.formula === "string"
            ? editForm.formula
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : editForm.formula,
        category:
          typeof editForm.category === "string"
            ? editForm.category
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : editForm.category,
        price: Number(editForm.price),
        stock: Number(editForm.stock),
      };

      const res = await fetch(`/api/shop/${editingItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setProduct(
          product.map((p) =>
            p._id === editingItem._id ? { ...p, ...payload } : p,
          ),
        );
        setEditingItem(null);
      } else {
        console.error("Failed to update item");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                    onClick={() => handleEditClick(item)}
                  >
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-900">
                        {item.brand}{" "}
                        {Array.isArray(item.formula)
                          ? item.formula.join(" & ")
                          : item.formula}
                      </span>
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
                          item.status.toLowerCase() === "active"
                            ? "bg-teal-100 text-teal-800"
                            : item.status.toLowerCase() === "low stock"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.status.toLowerCase() === "active"
                          ? "In Stock"
                          : "In stock"
                            ? "In Stock"
                            : "In maintainance"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          className="p-2 text-gray-400 hover:text-teal-600 transition-colors bg-gray-50 hover:bg-teal-50 rounded-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(item);
                          }}
                        >
                          <MdEdit className="text-lg" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-gray-50 hover:bg-red-50 rounded-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Future Delete functionality
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
                    colSpan="6"
                    className="px-6 py-12 text-center text-gray-500 bg-gray-50 font-medium"
                  >
                    No items found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">
                Edit Item Details
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    value={editForm.brand || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, brand: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editForm.category || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Formula (Use comma for subtypes)
                  </label>
                  <input
                    type="text"
                    value={editForm.formula || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, formula: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={editForm.status || "Active"}
                    onChange={(e) =>
                      setEditForm({ ...editForm, status: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Active">Active / In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (฿)
                  </label>
                  <input
                    type="number"
                    value={editForm.price || 0}
                    onChange={(e) =>
                      setEditForm({ ...editForm, price: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Amount
                  </label>
                  <input
                    type="number"
                    value={editForm.stock || 0}
                    onChange={(e) =>
                      setEditForm({ ...editForm, stock: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                    min="0"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 text-white bg-teal-500 hover:bg-teal-600 shadow-sm shadow-teal-500/30 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
