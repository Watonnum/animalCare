"use client";
import React from "react";
import {
  MdCheckCircle,
  MdInventory,
  MdPersonAdd,
  MdWarning,
  MdNotifications,
} from "react-icons/md";
import { useActivities } from "@/app/provider/ActivityProvider";

export default function RecentActivity() {
  const { activities, loading } = useActivities();

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return "JUST NOW";
    if (diff < 3600) return `${Math.floor(diff / 60)} MINUTES AGO`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} HOURS AGO`;
    return `${Math.floor(diff / 86400)} DAYS AGO`;
  };

  const getIconProps = (type) => {
    switch (type) {
      case "booking":
        return {
          icon: <MdCheckCircle className="text-teal-600 text-lg" />,
          bg: "bg-teal-100",
        };
      case "product":
        return {
          icon: <MdInventory className="text-gray-200 text-lg" />,
          bg: "bg-[#111928]",
        };
      case "alert":
        return {
          icon: <MdWarning className="text-red-600 text-lg" />,
          bg: "bg-red-100",
        };
      case "user":
        return {
          icon: <MdPersonAdd className="text-gray-600 text-lg" />,
          bg: "bg-gray-100",
        };
      default:
        return {
          icon: <MdNotifications className="text-gray-600 text-lg" />,
          bg: "bg-gray-100",
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col max-h-[500px] overflow-hidden relative">
      <h3 className="text-xl font-bold text-gray-900 mb-6 shrink-0">
        Recent Activity
      </h3>

      <div className="space-y-6 flex-1 overflow-y-auto pr-2 pb-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-sm font-medium text-gray-500">
              Loading activities...
            </p>
          </div>
        ) : activities?.length > 0 ? (
          activities.slice(0, 10).map((activity) => {
            const { icon, bg } = getIconProps(activity.type);
            return (
              <div key={activity._id} className="flex space-x-4">
                <div
                  className={`mt-1 ${bg} p-2.5 rounded-full flex items-center justify-center h-10 w-10 flex-shrink-0`}
                >
                  {icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">
                    {activity.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 font-medium leading-relaxed">
                    {activity.message}
                  </p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold mt-1.5 tracking-wider">
                    {timeAgo(activity.createdAt)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col justify-center items-center h-full text-center space-y-2">
            <MdNotifications className="text-gray-300 text-4xl" />
            <p className="text-sm font-medium text-gray-500">
              No recent activity found.
            </p>
          </div>
        )}
      </div>

      <div className="pt-4 mt-2 border-t border-gray-50 shrink-0">
        <button className="w-full py-3 text-sm font-bold text-teal-800 bg-[#F0FBFA] hover:bg-teal-100 rounded-lg transition-colors border border-teal-100">
          View All History
        </button>
      </div>
    </div>
  );
}
