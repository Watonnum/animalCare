"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InventoryHeader from "@/components/admin/InventoryHeader";
import InventoryToolbar from "@/components/admin/InventoryToolbar";
import InventoryTable from "@/components/admin/InventoryTable";
import EditInventoryModal from "@/components/admin/EditInventoryModal";
import AddInventoryModal from "@/components/admin/AddInventoryModal";

export default function InventoryPage() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal and Edit states
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [addForm, setAddForm] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/shop");
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();

        // Artificial delay for smooth loading animation
        await new Promise((resolve) => setTimeout(resolve, 400));
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
        weight_kg: editForm.weight_kg ? Number(editForm.weight_kg) : 0,
        description: editForm.description || "",
        image: editForm.image || "",
        updatedAt: new Date().toISOString(),
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

  const handleSaveAdd = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        ...addForm,
        formula:
          typeof addForm.formula === "string"
            ? addForm.formula
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : addForm.formula || [],
        category:
          typeof addForm.category === "string"
            ? addForm.category
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : addForm.category || [],
        price: Number(addForm.price),
        stock: Number(addForm.stock),
        weight_kg: addForm.weight_kg ? Number(addForm.weight_kg) : 0,
        description: addForm.description || "",
        image: addForm.image || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const res = await fetch("/api/shop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const newItem = await res.json();
        const itemWithId = newItem.product ||
          newItem.result || {
            ...payload,
            _id: newItem.insertedId || Date.now().toString(),
          };
        setProduct([...product, itemWithId]);
        setIsAddingItem(false);
        setAddForm({});
      } else {
        console.error("Failed to add item");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = async (item) => {
    if (!window.confirm(`Are you sure you want to delete ${item.brand}?`))
      return;

    try {
      const res = await fetch(`/api/shop/${item._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProduct((prev) => prev.filter((p) => p._id !== item._id));
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <InventoryHeader onAddClick={() => setIsAddingItem(true)} />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative min-h-100">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full min-h-100 w-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-12 h-12 border-4 border-gray-200 border-t-teal-500 rounded-full"
            />
            <p className="mt-4 text-gray-500 font-medium">
              Loading inventory...
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <InventoryToolbar
              filter={filter}
              setFilter={setFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <InventoryTable
              filteredProducts={filteredProducts}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          </motion.div>
        )}
      </div>

      <EditInventoryModal
        editingItem={editingItem}
        setEditingItem={setEditingItem}
        editForm={editForm}
        setEditForm={setEditForm}
        handleSaveEdit={handleSaveEdit}
        isSaving={isSaving}
      />

      <AddInventoryModal
        isAddingItem={isAddingItem}
        setIsAddingItem={setIsAddingItem}
        addForm={addForm}
        setAddForm={setAddForm}
        handleSaveAdd={handleSaveAdd}
        isSaving={isSaving}
      />
    </div>
  );
}
