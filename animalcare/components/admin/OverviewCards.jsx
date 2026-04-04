import React from "react";
import { MdShowChart, MdHourglassEmpty } from "react-icons/md";

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* Total Bookings */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            TOTAL BOOKINGS
          </span>
          <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 flex items-center justify-center rounded-full font-bold">
            +12.5%
          </span>
        </div>
        <div className="mt-4">
          <h3 className="text-4xl font-extrabold text-gray-900">1,284</h3>
          <p className="text-xs text-gray-400 mt-2 font-medium">
            Updated 4 mins ago
          </p>
        </div>
      </div>

      {/* Monthly Revenue */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            MONTHLY REVENUE
          </span>
          <MdShowChart className="text-teal-600 text-xl" />
        </div>
        <div className="mt-4">
          <h3 className="text-4xl font-extrabold text-gray-900">$42.8k</h3>
          <p className="text-xs text-gray-400 mt-2 font-medium">
            Growth: $5.2k this month
          </p>
        </div>
      </div>

      {/* Active Boarding */}
      <div className="bg-[#1C2536] rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <span className="h-2 w-2 rounded-full bg-teal-400 block"></span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
            ACTIVE BOARDING
          </span>
        </div>
        <div className="mt-4">
          <h3 className="text-4xl font-extrabold text-teal-400">86%</h3>
          <p className="text-xs text-gray-400 mt-2 font-medium">
            42 active suites
          </p>
        </div>
      </div>

      {/* Waitlist */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            WAITLIST
          </span>
          <MdHourglassEmpty className="text-gray-400 text-xl" />
        </div>
        <div className="mt-4">
          <h3 className="text-4xl font-extrabold text-gray-900">14</h3>
          <p className="text-xs text-gray-400 mt-2 font-medium">
            Avg. wait: 12 days
          </p>
        </div>
      </div>
    </div>
  );
}
