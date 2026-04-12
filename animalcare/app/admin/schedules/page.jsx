"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MdCalendarMonth,
  MdCheckCircle,
  MdSchedule,
  MdPets,
} from "react-icons/md";

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const getStatusColor = (status) => {
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
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Upcoming Appointments
          </h3>

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
                schedules.map((schedule) => (
                  <div
                    key={schedule._id}
                    className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
                  >
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
                      <p className="text-gray-900 font-medium text-sm">
                        Duration
                      </p>
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
                        className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(schedule.status)}`}
                      >
                        {schedule.status || "Pending"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
