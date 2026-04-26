"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScheduleItem from "@/components/admin/schedules/ScheduleItem";
import BulkActionToolbar from "@/components/admin/schedules/BulkActionToolbar";

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedScheduleForModal, setSelectedScheduleForModal] =
    useState(null);

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

  const handleBulkUpdateStatus = async (newStatus) => {
    if (!selectedIds.length) return;

    setLoading(true);

    try {
      await Promise.all(
        selectedIds.map((id) =>
          fetch(`/api/services/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
          }),
        ),
      );

      setSchedules((prev) =>
        prev.map((sch) =>
          selectedIds.includes(sch._id) ? { ...sch, status: newStatus } : sch,
        ),
      );

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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-8 min-h-100">
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
                    onViewDetails={setSelectedScheduleForModal}
                    index={index}
                  />
                ))
              )}
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedScheduleForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedScheduleForModal(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-sm z-10">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Booking Details
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Client: {selectedScheduleForModal.user?.name || "Unknown"} (
                    {selectedScheduleForModal.user?.email || "N/A"})
                  </p>
                </div>
                <button
                  onClick={() => setSelectedScheduleForModal(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-500">Total Price</p>
                    <p className="text-xl font-bold text-teal-700">
                      ฿{selectedScheduleForModal.pricing?.total || 0}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="text-sm font-bold capitalize mt-1">
                      {selectedScheduleForModal.status || "Pending"}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
                    Pets ({selectedScheduleForModal.pets?.length || 0})
                  </h4>
                  <div className="space-y-4">
                    {selectedScheduleForModal.pets?.map((pet, idx) => (
                      <div
                        key={idx}
                        className="bg-white border rounded-xl p-4 shadow-sm relative"
                      >
                        <div className="absolute top-4 right-4 bg-teal-50 text-teal-700 text-xs font-bold px-2 py-1 rounded-lg">
                          x{pet.amount || 1}
                        </div>
                        <h5 className="font-bold text-gray-900 text-base mb-1">
                          {pet.name || "Unnamed"}{" "}
                          <span className="text-gray-400 font-normal text-sm">
                            ({pet.breed || "Unknown Breed"})
                          </span>
                        </h5>
                        <div className="grid grid-cols-2 gap-y-2 mt-4 text-sm">
                          <div>
                            <span className="text-gray-500">Size:</span>{" "}
                            <span className="font-medium capitalize">
                              {pet.size}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Special Care:</span>{" "}
                            <span className="font-medium">
                              {pet.specialService === "morningService"
                                ? "Morning"
                                : pet.specialService === "afternoonService"
                                  ? "Afternoon"
                                  : "Full Day"}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Check-In:</span>{" "}
                            <span className="font-medium">{pet.checkIn}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Check-Out:</span>{" "}
                            <span className="font-medium">{pet.checkOut}</span>
                          </div>
                        </div>

                        {(pet.allergies || pet.instructions) && (
                          <div className="mt-4 pt-4 border-t space-y-2 text-sm">
                            {pet.allergies && (
                              <div className="flex gap-2">
                                <span className="text-red-500 font-bold shrink-0">
                                  Allergies:
                                </span>
                                <span className="text-gray-700">
                                  {pet.allergies}
                                </span>
                              </div>
                            )}
                            {pet.instructions && (
                              <div className="flex gap-2">
                                <span className="text-amber-600 font-bold shrink-0">
                                  Instructions:
                                </span>
                                <span className="text-gray-700">
                                  {pet.instructions}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
