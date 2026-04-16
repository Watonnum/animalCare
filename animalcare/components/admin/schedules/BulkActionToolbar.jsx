import React from "react";
import { motion } from "framer-motion";

export default function BulkActionToolbar({
  selectedCount,
  onConfirm,
  onCancel,
  onClear,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-2 bg-teal-50 px-4 py-2 rounded-lg border border-teal-100"
    >
      <span className="text-sm font-semibold text-teal-800 mr-2">
        {selectedCount} Selected
      </span>
      <button
        onClick={onConfirm}
        className="px-3 py-1.5 bg-teal-600 text-white text-xs font-bold rounded hover:bg-teal-700 transition"
      >
        Confirm
      </button>
      <button
        onClick={onCancel}
        className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700 transition"
      >
        Cancel
      </button>
      <button
        onClick={onClear}
        className="px-3 py-1.5 bg-white text-gray-600 text-xs font-bold rounded border border-gray-300 hover:bg-gray-50 transition"
      >
        Clear Selection
      </button>
    </motion.div>
  );
}
