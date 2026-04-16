import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EditInventoryModal({
  editingItem,
  setEditingItem,
  editForm,
  setEditForm,
  handleSaveEdit,
  isSaving,
}) {
  return (
    <AnimatePresence>
      {editingItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setEditingItem(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden my-auto max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-sm z-10">
              <h3 className="text-xl font-bold text-gray-800">
                Edit Item Details
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-gray-400 hover:text-gray-600 bg-gray-100/50 hover:bg-gray-100 p-2 rounded-full transition-all"
                type="button"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Brand
                  </label>
                  <input
                    type="text"
                    value={editForm.brand || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, brand: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 focus:bg-white transition-all text-gray-800 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editForm.category || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 focus:bg-white transition-all text-gray-800 sm:text-sm"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Formula{" "}
                    <span className="text-gray-400 font-normal">
                      (Use comma for subtypes)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={editForm.formula || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, formula: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 focus:bg-white transition-all text-gray-800 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Status
                  </label>
                  <select
                    value={editForm.status || "Active"}
                    onChange={(e) =>
                      setEditForm({ ...editForm, status: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 focus:bg-white transition-all text-gray-800 sm:text-sm appearance-none"
                  >
                    <option value="Active">Active / In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Price (฿)
                  </label>
                  <input
                    type="number"
                    value={editForm.price || 0}
                    onChange={(e) =>
                      setEditForm({ ...editForm, price: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 focus:bg-white transition-all text-gray-800 sm:text-sm"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Stock Amount
                  </label>
                  <input
                    type="number"
                    value={editForm.stock || 0}
                    onChange={(e) =>
                      setEditForm({ ...editForm, stock: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 focus:bg-white transition-all text-gray-800 sm:text-sm"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={editForm.weight_kg || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, weight_kg: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 focus:bg-white transition-all text-gray-800 sm:text-sm"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={editForm.image || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, image: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 focus:bg-white transition-all text-gray-800 sm:text-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Description
                  </label>
                  <textarea
                    value={editForm.description || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    rows="3"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 focus:bg-white transition-all text-gray-800 sm:text-sm resize-y"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-8 pt-5 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors sm:text-sm shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 text-white bg-teal-600 hover:bg-teal-700 rounded-lg font-medium transition-all disabled:opacity-50 flex items-center sm:text-sm shadow-sm"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
