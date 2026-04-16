import React from "react";

export default function BookingSummary({
  petSize,
  serviceDays,
  specialService,
  subtotal,
  tax,
  total,
  prices,
  handleCompleteBooking,
  isButtonDisabled,
}) {
  return (
    <div className="w-full lg:w-100 flex flex-col gap-6">
      <div className="bg-[#EBE2D3] rounded-4xl p-8 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">Booking Summary</h2>

        <div className="flex flex-col gap-6 mb-8 border-b border-[#D6CBB9] pb-8">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-sm">
                Premium Suite ({petSize === "small" ? "Small" : "Large"})
              </h4>
              <p className="text-xs text-stone-500">
                {serviceDays} {serviceDays === 1 ? "Day" : "Days"} • $
                {prices[petSize]}/day
              </p>
            </div>
            <span className="font-bold text-sm">
              ${(serviceDays * prices[petSize]).toFixed(2)}
            </span>
          </div>

          {specialService && (
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-sm">
                  {specialService === "morningService" &&
                    "Morning Care (3 Hrs)"}
                  {specialService === "afternoonService" &&
                    "Afternoon Care (3 Hrs)"}
                  {specialService === "fullDayService" &&
                    "Full Day Care (24 Hrs)"}
                </h4>
                <p className="text-xs text-stone-500">
                  {serviceDays} {serviceDays === 1 ? "Day" : "Days"} • $
                  {prices[specialService]}/day
                </p>
              </div>
              <span className="font-bold text-sm">
                ${(prices[specialService] * serviceDays).toFixed(2)}
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-stone-600">Subtotal</span>
          <span className="text-sm font-bold text-stone-800">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center mb-8">
          <span className="text-sm font-bold text-stone-600">Tax (8%)</span>
          <span className="text-sm font-bold text-stone-800">
            ${tax.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center mb-8">
          <span className="text-xl font-bold">Total</span>
          <span className="text-2xl font-extrabold text-[#9A561D]">
            ${total.toFixed(2)}
          </span>
        </div>

        <button
          onClick={handleCompleteBooking}
          disabled={isButtonDisabled}
          className="w-full py-4 bg-[#8C4A0F] text-white rounded-2xl font-bold text-lg hover:bg-[#723C0C] transition-colors flex items-center justify-center gap-2 shadow-md disabled:bg-stone-400 disabled:cursor-not-allowed"
        >
          Complete Booking
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </button>

        <p className="text-center text-[10px] font-bold tracking-widest text-stone-500 mt-4 uppercase">
          SECURE PAYMENT GUARANTEED
        </p>
      </div>

      {/* Small Badges below summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#F5F2EC] py-3 px-2 rounded-2xl flex flex-col items-center justify-center gap-1">
          <span className="text-[#9A561D] text-lg">🛡️</span>
          <span className="text-[10px] font-bold text-stone-600">
            Certified Care
          </span>
        </div>
        <div className="bg-[#F5F2EC] py-3 px-2 rounded-2xl flex flex-col items-center justify-center gap-1">
          <span className="text-[#9A561D] text-lg">🤝</span>
          <span className="text-[10px] font-bold text-stone-600">
            24/7 Support
          </span>
        </div>
      </div>
    </div>
  );
}
