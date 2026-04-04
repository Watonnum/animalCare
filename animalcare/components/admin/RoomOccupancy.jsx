import React from "react";

export default function RoomOccupancy() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-8">
        Room Occupancy Distribution
      </h3>
      <div className="flex items-center justify-between">
        {/* Circular Chart Placeholder using CSS */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 36 36"
          >
            {/* Background Circle */}
            <path
              className="text-gray-100"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
            />
            {/* Overlay Circle 82% */}
            <path
              className="text-teal-700"
              strokeDasharray="82, 100"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            />
          </svg>
          <div className="absoluteflex flex-col items-center justify-center inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
            <span className="text-xl font-extrabold text-gray-900 block pt-12">
              82%
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-4">
          <div className="flex items-center justify-between space-x-8">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-700"></span>
              <span className="text-sm font-bold text-gray-700">Occupied</span>
            </div>
            <span className="text-sm font-bold text-gray-900">32 Suites</span>
          </div>
          <div className="flex items-center justify-between space-x-8">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1C2536]"></span>
              <span className="text-sm font-bold text-gray-700">
                Maintenance
              </span>
            </div>
            <span className="text-sm font-bold text-gray-900">6 Suites</span>
          </div>
          <div className="flex items-center justify-between space-x-8">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-200"></span>
              <span className="text-sm font-bold text-gray-700">Available</span>
            </div>
            <span className="text-sm font-bold text-gray-900">10 Suites</span>
          </div>
        </div>
      </div>
    </div>
  );
}
