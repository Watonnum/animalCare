import React from "react";

export default function AddInventoryModal({
  isAddingItem,
  setIsAddingItem,
  addForm,
  setAddForm,
  handleSaveAdd,
  isSaving,
}) {
  if (!isAddingItem) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">Add New Product</h3>
          <button
            onClick={() => setIsAddingItem(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSaveAdd} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <input
                type="text"
                value={addForm.brand || ""}
                onChange={(e) =>
                  setAddForm({ ...addForm, brand: e.target.value })
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
                value={addForm.category || ""}
                onChange={(e) =>
                  setAddForm({ ...addForm, category: e.target.value })
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
                value={addForm.formula || ""}
                onChange={(e) =>
                  setAddForm({ ...addForm, formula: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={addForm.status || "Active"}
                onChange={(e) =>
                  setAddForm({ ...addForm, status: e.target.value })
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
                value={addForm.price || ""}
                onChange={(e) =>
                  setAddForm({ ...addForm, price: e.target.value })
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
                value={addForm.stock || ""}
                onChange={(e) =>
                  setAddForm({ ...addForm, stock: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                value={addForm.weight_kg || ""}
                onChange={(e) =>
                  setAddForm({ ...addForm, weight_kg: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                min="0"
                step="0.01"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={addForm.image || ""}
                onChange={(e) =>
                  setAddForm({ ...addForm, image: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={addForm.description || ""}
                onChange={(e) =>
                  setAddForm({ ...addForm, description: e.target.value })
                }
                rows="3"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsAddingItem(false)}
              className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 text-white bg-teal-500 hover:bg-teal-600 shadow-sm shadow-teal-500/30 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center"
            >
              {isSaving ? "Saving..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
