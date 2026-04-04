import React from "react";

export default function RevenueChart() {
  return (
    <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Revenue Trends</h3>
          <p className="text-sm text-gray-500 font-medium">
            Annual projection based on Q3 performance
          </p>
        </div>
        <div className="flex space-x-2 bg-gray-50 p-1 border border-gray-200 rounded-lg">
          <button className="px-5 py-1.5 text-xs font-bold bg-white shadow text-gray-900 rounded bg-white">
            Week
          </button>
          <button className="px-5 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors">
            Month
          </button>
          <button className="px-5 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors">
            Year
          </button>
        </div>
      </div>
      {/* Simple Chart visualization using SVG */}
      <div className="h-64 flex items-end relative w-full overflow-hidden">
        {/* Chart Background Gradient */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-teal-50 to-transparent"></div>

        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pt-10 pb-6 opacity-30">
          {[1, 2, 3, 4].map((line) => (
            <div
              key={line}
              className="border-b border-gray-200 border-dashed w-full h-0"
            ></div>
          ))}
        </div>

        <svg
          viewBox="0 0 800 200"
          className="w-full h-full relative z-10 drop-shadow-md"
          preserveAspectRatio="none"
        >
          <path
            d="M0 150 C100 120, 200 140, 300 100 C400 80, 500 100, 600 150 C700 180, 750 100, 800 70"
            fill="none"
            stroke="#14B8A6"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="300" cy="100" r="5" fill="#14B8A6" />
          <circle cx="500" cy="100" r="5" fill="#14B8A6" />
          <circle cx="600" cy="150" r="5" fill="#14B8A6" />
          <circle cx="800" cy="70" r="5" fill="#14B8A6" />
        </svg>
      </div>
      {/* Labels */}
      <div className="flex justify-between text-xs text-gray-400 font-bold uppercase mt-6 pt-4 border-t border-gray-50 px-2">
        <span>MON</span>
        <span>TUE</span>
        <span>WED</span>
        <span>THU</span>
        <span>FRI</span>
        <span>SAT</span>
        <span>SUN</span>
      </div>
    </div>
  );
}
