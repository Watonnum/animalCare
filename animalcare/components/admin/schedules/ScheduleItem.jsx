import React from "react";
import { MdPets } from "react-icons/md";
import { motion } from "framer-motion";

// Move utility function here or pass as prop.
export const getStatusColor = (status) => {
  switch (status) {
    case "Confirmed":
      return "bg-teal-100 text-teal-800";
    case "Pending":
    case undefined:
    case null:
      return "bg-yellow-100 text-yellow-800";
    case "Completed":
      return "bg-blue-100 text-blue-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function ScheduleItem({
  schedule,
  isSelected,
  onToggle,
  index = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex items-center p-4 border rounded-xl hover:bg-gray-50 transition-colors ${
        isSelected ? "border-teal-500 bg-teal-50/30" : "border-gray-100"
      }`}
    >
      {/* Checkbox */}
      <div className="flex items-center shrink-0 mr-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(schedule._id)}
          className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 cursor-pointer"
        />
      </div>

      <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center shrink-0">
            <MdPets className="text-teal-600 text-xl" />
          </div>
          <div>
            <h4 className="text-gray-900 font-bold text-sm">
              {schedule.specialService || "Standard Service"} (
              {schedule.petSize} pet)
            </h4>
            <p className="text-gray-500 font-medium text-xs mt-1">
              {schedule.user?.name || "Unknown Client"}{" "}
              {schedule.user?.email && `- ${schedule.user.email}`}
            </p>
          </div>
        </div>

        <div className="text-center hidden md:block">
          <p className="text-gray-900 font-medium text-sm">Duration</p>
          <p className="text-gray-500 text-xs mt-1 font-mono">
            {schedule.serviceDays} Day(s)
          </p>
        </div>

        <div className="text-center hidden md:block">
          <p className="text-gray-900 font-medium text-sm">Price</p>
          <p className="text-gray-500 text-xs mt-1 font-mono">
            ฿{schedule.pricing?.total || "N/A"}
          </p>
        </div>

        <div className="text-right">
          <p className="text-gray-900 font-bold text-sm">
            In: {schedule.checkIn}
          </p>
          <p className="text-gray-500 font-medium text-xs mt-1">
            Out: {schedule.checkOut}
          </p>
        </div>

        <div className="w-24 text-right">
          <span
            className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(
              schedule.status,
            )}`}
          >
            {schedule.status || "Pending"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
