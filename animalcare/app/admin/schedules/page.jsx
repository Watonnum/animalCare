"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ScheduleItem from "@/components/admin/schedules/ScheduleItem";
import BulkActionToolbar from "@/components/admin/schedules/BulkActionToolbar";

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await fetch("/api/services");
        if (!res.ok) throw new Error("Failed to fetch schedules");
        const data = await res.json();

        await new Promise((resolve) => setTimeout(resolve, 400));
        setSchedules(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(schedules.map((sch) => sch._id));
    } else {
      setSelectedIds([]);
    }
  };

  // Example API call for updating multiple statuses
  const handleBulkUpdateStatus = async (newStatus) => {
    if (!selectedIds.length) return;

    // Show loading while updating
    setLoading(true);

    try {
      // Loop over selected and update via API (assuming PUT /api/services or /api/services/[id])
      // You may need to adjust this fetch logc to match your API endpoint design
      await Promise.all(
        selectedIds.map((id) =>
          fetch(`/api/services/${id}`, {
            method: "PUT", // or "PUT" depending on your API
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
          }),
        ),
      );

      // Local state update after successful DB save
      setSchedules((prev) =>
        prev.map((sch) =>
          selectedIds.includes(sch._id) ? { ...sch, status: newStatus } : sch,
        ),
      );

      // Clear selection
      setSelectedIds([]);
      alert(`Updated status to ${newStatus} successfully.`);
    } catch (error) {
      console.error("Failed to bulk update status:", error);
      alert("Error updating status. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Schedules & Appointments
          </h2>
          <p className="text-gray-500 mt-2 font-medium">
            Manage upcoming service appointments and boarding schedules.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-8 min-h-[400px]">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h3 className="text-xl font-bold text-gray-900">
              Upcoming Appointments
            </h3>

            {/* Bulk Action Toolbar */}
            {selectedIds.length > 0 && (
              <BulkActionToolbar
                selectedCount={selectedIds.length}
                onConfirm={() => handleBulkUpdateStatus("Confirmed")}
                onCancel={() => handleBulkUpdateStatus("Cancelled")}
                onClear={() => setSelectedIds([])}
              />
            )}
          </div>

          {/* Select All Checkbox (Optional: only if you want it outside list) */}
          {!loading && schedules.length > 0 && (
            <div className="flex items-center px-4 py-2 border border-gray-100 rounded-xl bg-gray-50">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedIds.length === schedules.length}
                className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 cursor-pointer"
              />
              <span className="ml-3 text-sm font-bold text-gray-700">
                Select All
              </span>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 w-full">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-12 h-12 border-4 border-gray-200 border-t-teal-500 rounded-full"
              />
              <p className="mt-4 text-gray-500 font-medium">
                Loading appointments...
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {schedules.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  No schedules found.
                </div>
              ) : (
                schedules.map((schedule, index) => (
                  <ScheduleItem
                    key={schedule._id}
                    schedule={schedule}
                    isSelected={selectedIds.includes(schedule._id)}
                    onToggle={toggleSelect}
                    index={index}
                  />
                ))
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
