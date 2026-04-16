import React from "react";

export default function DateSelector({
  today,
  checkIn,
  checkOut,
  handleCheckInChange,
  handleCheckOutChange,
}) {
  return (
    <div className="bg-[#F5F2EC] rounded-3xl p-6 flex flex-col gap-4">
      <h3 className="font-bold flex items-center gap-2 text-lg">
        <span className="text-xl">📅</span> Dates & Schedule
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Check-in */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-stone-600">
            Check-in Date
          </label>
          <div className="relative">
            <input
              type="date"
              min={today}
              value={checkIn}
              onChange={handleCheckInChange}
              className="w-full bg-[#EAE5DA] px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#75390E]/50 text-stone-700"
            />
          </div>
        </div>
        {/* Check-out */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-stone-600">
            Check-out Date
          </label>
          <div className="relative">
            <input
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={handleCheckOutChange}
              className="w-full bg-[#EAE5DA] px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#75390E]/50 text-stone-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
