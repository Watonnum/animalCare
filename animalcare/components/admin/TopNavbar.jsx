/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession } from "next-auth/react";
import React, { useState, useRef, useEffect } from "react";
import {
  MdSearch,
  MdNotifications,
  MdApps,
  MdCheckCircle,
  MdInventory,
  MdWarning,
  MdPersonAdd,
} from "react-icons/md";
import { useActivities } from "@/app/provider/ActivityProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function TopNavbar() {
  const { data: session } = useSession();
  const user = session?.user;
  const [imgLoading, setImgLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  // Notification States
  const { activities, unreadCount, markAsRead } = useActivities();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name) => {
    // ...
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const hasDisplayImage =
    user?.image && user.image !== "" && user.image !== "null";

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds

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
    <header className="h-20 bg-white md:bg-transparent px-8 flex items-center justify-between border-b md:border-none border-gray-200 py-6 relative z-50">
      <div className="flex-1 max-w-xl relative">
        <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <input
          type="text"
          placeholder="Search analytics..."
          className="w-full pl-12 pr-4 py-2.5 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium text-gray-700"
        />
      </div>
      <div className="flex items-center space-x-6 pl-4">
        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            className="text-gray-400 hover:text-gray-700 relative p-1"
            onClick={() => setIsNotifOpen((prev) => !prev)}
          >
            <MdNotifications className="text-2xl" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full ring-2 ring-[#FEF9F2] md:ring-transparent"></span>
            )}
          </button>

          <AnimatePresence>
            {isNotifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-[-4rem] md:right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900 text-lg">
                    Recent Activity
                  </h3>
                  {unreadCount > 0 && (
                    <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2 py-0.5 rounded-full">
                      {unreadCount} New
                    </span>
                  )}
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {activities?.length > 0 ? (
                    activities.slice(0, 5).map((activity) => {
                      const { icon, bg } = getIconProps(activity.type);
                      return (
                        <div
                          key={activity._id}
                          onMouseEnter={() => markAsRead(activity._id)}
                          className={`p-4 flex gap-4 cursor-pointer transition-colors border-b border-gray-50 last:border-none ${
                            !activity.isRead
                              ? "bg-teal-50/30"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${bg}`}
                          >
                            {icon}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm">
                              {activity.title}
                            </p>
                            <p className="text-gray-500 text-sm mt-0.5 leading-snug">
                              {activity.message}
                            </p>
                            <p className="text-gray-400 text-xs font-bold mt-2 tracking-wide">
                              {timeAgo(activity.createdAt)}
                            </p>
                          </div>
                          {!activity.isRead && (
                            <div className="w-2 h-2 bg-teal-500 rounded-full shrink-0 ml-auto mt-2"></div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-8 text-center text-gray-500 font-medium">
                      No recent activities.
                    </div>
                  )}
                </div>

                {activities?.length > 0 && (
                  <div className="p-3 border-t border-gray-100">
                    <button className="w-full py-2.5 bg-teal-50/50 hover:bg-teal-50 text-teal-700 font-bold rounded-xl transition-colors text-sm">
                      View All History
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button className="text-gray-400 hover:text-gray-700">
          <MdApps className="text-2xl" />
        </button>
        <div className="hidden md:block bg-[#111928] text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors select-none">
          {user ? user.name : <>Loading...</>}
        </div>
        <div className="relative h-14 w-14 rounded-full border-2 border-white shadow-sm shrink-0 flex flex-col items-center justify-center bg-[#111928] text-white font-bold text-xl overflow-hidden">
          {hasDisplayImage && !imgError ? (
            <>
              {imgLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse z-10"></div>
              )}
              <img
                src={user.image}
                alt="User Profile"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  imgLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setImgLoading(false)}
                onError={() => {
                  setImgError(true);
                  setImgLoading(false);
                }}
              />
            </>
          ) : (
            <span className="select-none tracking-widest">
              {getInitials(user?.name)}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
