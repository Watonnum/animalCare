import React from "react";
import OverviewCards from "@/components/admin/OverviewCards";
import RevenueChart from "@/components/admin/RevenueChart";
import RecentActivity from "@/components/admin/RecentActivity";
import RoomOccupancy from "@/components/admin/RoomOccupancy";
import SpotlightSuite from "@/components/admin/SpotlightSuite";

const page = () => {
  return (
    <div className="max-w-7xl mx-auto pb-10">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Overview Dashboard
        </h2>
        <p className="text-gray-500 mt-2 font-medium">
          Real-time performance metrics and operational capacity for the current
          facility business cycle.
        </p>
      </div>

      <OverviewCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <RevenueChart />
        <RecentActivity />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RoomOccupancy />
        <SpotlightSuite />
      </div>
    </div>
  );
};

export default page;
