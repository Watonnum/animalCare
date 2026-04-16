import React from "react";

export default function SpecialCareSelector({
  isSameDay,
  specialService,
  setSpecialService,
  prices,
}) {
  return (
    <div className="bg-[#F5F2EC] rounded-3xl p-6 flex flex-col gap-4">
      <h3 className="font-bold flex items-center gap-2 text-lg">
        <span className="text-xl">🏥</span> Specialized Care
      </h3>
      <div className="flex flex-col gap-3">
        {/* Morning Service */}
        <div
          onClick={() => {
            if (isSameDay) setSpecialService("morningService");
          }}
          className={`flex items-center justify-between p-4 bg-white rounded-2xl border-2 transition-all 
          ${
            specialService === "morningService"
              ? "border-[#75390E]/20"
              : "border-transparent"
          }
          ${!isSameDay ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#FCEBE7] text-[#E0866A] flex items-center justify-center">
              <span className="text-xl">🌅</span>
            </div>
            <div>
              <h4 className="font-bold text-sm">Morning Care (3 Hrs)</h4>
              <p className="text-xs text-stone-500">
                Available between 9:00 AM - 12:00 PM
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold text-sm">
              ${prices.morningService.toFixed(2)}
            </span>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
            ${
              specialService === "morningService"
                ? "bg-[#9A561D] border-[#9A561D]"
                : "border-stone-300"
            }`}
            >
              {specialService === "morningService" && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Afternoon Service */}
        <div
          onClick={() => {
            if (isSameDay) setSpecialService("afternoonService");
          }}
          className={`flex items-center justify-between p-4 bg-white rounded-2xl border-2 transition-all 
          ${
            specialService === "afternoonService"
              ? "border-[#75390E]/20"
              : "border-transparent"
          }
          ${!isSameDay ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#E5FAFD] text-[#54A1C8] flex items-center justify-center">
              <span className="text-xl">🌤️</span>
            </div>
            <div>
              <h4 className="font-bold text-sm">Afternoon Care (3 Hrs)</h4>
              <p className="text-xs text-stone-500">
                Available between 1:00 PM - 4:00 PM
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold text-sm">
              ${prices.afternoonService.toFixed(2)}
            </span>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
            ${
              specialService === "afternoonService"
                ? "bg-[#9A561D] border-[#9A561D]"
                : "border-stone-300"
            }`}
            >
              {specialService === "afternoonService" && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Full Day Service */}
        <div
          onClick={() => setSpecialService("fullDayService")}
          className={`flex items-center justify-between p-4 bg-white rounded-2xl cursor-pointer border-2 transition-all 
          ${
            specialService === "fullDayService"
              ? "border-[#75390E]/20"
              : "border-transparent"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#FFF3E0] text-[#DCA259] flex items-center justify-center">
              <span className="text-xl">☀️</span>
            </div>
            <div>
              <h4 className="font-bold text-sm">Full Day Care (24 Hrs)</h4>
              <p className="text-xs text-stone-500">
                24-hour full day care service
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold text-sm">
              ${prices.fullDayService.toFixed(2)}
            </span>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
            ${
              specialService === "fullDayService"
                ? "bg-[#9A561D] border-[#9A561D]"
                : "border-stone-300"
            }`}
            >
              {specialService === "fullDayService" && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
