"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const ActivityContext = createContext();

export function ActivityProvider({ children }) {
  const { status } = useSession();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = async () => {
    // Only fetch if admin/user is logged in
    if (status === "authenticated") {
      try {
        const res = await fetch("/api/activities");
        if (res.ok) {
          const data = await res.json();
          setActivities(data);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchActivities();

      // Real-time update (Poll every 5 seconds)
      const interval = setInterval(fetchActivities, 3000);
      return () => clearInterval(interval);
    } else {
      setLoading(false);
    }
  }, [status]);

  const markAsRead = async (id) => {
    const target = activities.find((a) => a._id === id);
    if (!target || target.isRead) return;

    // 1. Optimistic UI update (Change to read immediately)
    setActivities((prev) =>
      prev.map((activity) =>
        activity._id === id ? { ...activity, isRead: true } : activity,
      ),
    );

    // 2. Background DB Update
    try {
      const res = await fetch(`/api/activities/${id}`, { method: "PUT" });
      if (!res.ok) {
        throw new Error("Failed to mark as read");
      }
    } catch (error) {
      console.error(error);
      // If error, you could revert the optimistic update here
    }
  };

  const unreadCount = activities.filter((a) => !a.isRead).length;

  return (
    <ActivityContext.Provider
      value={{
        activities,
        unreadCount,
        markAsRead,
        fetchActivities,
        loading,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export const useActivities = () => useContext(ActivityContext);
