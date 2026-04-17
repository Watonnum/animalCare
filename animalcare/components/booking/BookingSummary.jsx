import React from "react";

export default function BookingSummary({
  pets,
  subtotal,
  tax,
  total,
  prices,
  handleCompleteBooking,
  isButtonDisabled,
}) {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-[#FCFBF8] rounded-3xl p-8 flex flex-col shadow-sm border border-[#EBE2D3]">
        <h2 className="text-xl font-bold mb-6 text-[#38261A]">Booking Summary</h2>

        <div className="flex flex-col gap-6 mb-6 border-b border-[#EBE2D3] pb-6">
          {pets.map((pet, index) => {
            const start = new Date(pet.checkIn);
            const end = new Date(pet.checkOut);
            let nights = 0;
            if (start && end && end.getTime() >= start.getTime()) {
              const diffTime = Math.abs(end.getTime() - start.getTime());
              nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            }
            const serviceDays = nights === 0 ? 1 : nights;
            const itemTotal = serviceDays * prices[pet.size] * pet.amount;

            return (
              <div key={pet.id} className="flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-sm text-[#38261A]">
                      Pet {index + 1}: {pet.name || "Unnamed"} ({pet.size === "small" ? "Small" : "Large"})
                    </h4>
                    <p className="text-xs text-stone-500 mt-1">
                      x{pet.amount} - {serviceDays} {serviceDays === 1 ? "Day" : "Days"}
                    </p>
                  </div>
                  <span className="font-semibold text-sm text-[#38261A]">
                    ${itemTotal.toFixed(2)}
                  </span>
                </div>
                
                {pet.specialService && (
                  <div className="flex justify-between items-start mt-1">
                    <div>
                      <h4 className="text-sm text-[#38261A]">
                        {pet.specialService === "morningService" && "Morning Care (3 Hrs)"}
                        {pet.specialService === "afternoonService" && "Afternoon Care (3 Hrs)"}
                        {pet.specialService === "fullDayService" && "Full Day Care (24 Hrs)"}
                      </h4>
                      <p className="text-xs text-stone-500 mt-1">
                        x{pet.amount} - {serviceDays} {serviceDays === 1 ? "Day" : "Days"}
                      </p>
                    </div>
                    <span className="text-sm text-[#38261A]">
                      ${(prices[pet.specialService] * serviceDays * pet.amount).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-stone-600">Subtotal</span>
          <span className="text-sm font-semibold text-[#38261A]">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-stone-600">Tax (8%)</span>
          <span className="text-sm font-semibold text-[#38261A]">
            ${tax.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center mb-8 pt-6 border-t border-[#EBE2D3]">
          <span className="text-lg font-bold text-[#38261A]">Total</span>
          <span className="text-2xl font-extrabold text-[#38261A]">
            ${total.toFixed(2)}
          </span>
        </div>

        <button
          onClick={handleCompleteBooking}
          disabled={isButtonDisabled}
          className="w-full py-4 bg-[#38261A] text-white rounded-xl font-bold text-lg hover:bg-[#2C1D13] transition-colors flex items-center justify-center gap-2 disabled:bg-stone-300 disabled:cursor-not-allowed"
        >
          Complete Booking →
        </button>

        <p className="text-center text-[10px] font-bold tracking-widest text-stone-500 mt-4 uppercase">
          SECURE PAYMENT GUARANTEED
        </p>
      </div>
    </div>
  );
}
