import React from "react";

export default function SpotlightSuite() {
  return (
    <div className="bg-[#1C2536] rounded-2xl p-8 shadow-md relative overflow-hidden flex flex-col justify-end min-h-[300px]">
      {/* Background gradient simulating image overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
      {/* Dummy background image area */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=2928&auto=format&fit=crop')",
        }}
      ></div>

      <div className="relative z-20">
        <span className="inline-block bg-teal-400 text-[#1C2536] text-[10px] uppercase font-black px-3 py-1.5 rounded tracking-widest mb-4">
          SPOTLIGHT SUITE
        </span>
        <h3 className="text-3xl font-extrabold text-white mb-2">
          The Presidential Sky-Suite
        </h3>
        <p className="text-sm text-gray-300 font-medium mb-6 leading-relaxed max-w-md">
          Currently hosting: &quot;Luna&quot; (Golden Retriever). Checkout
          scheduled for tomorrow 10:00 AM.
        </p>
        <div className="flex space-x-3">
          <button className="bg-white text-[#1C2536] font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-gray-100 transition-colors">
            Manage Booking
          </button>
          <button className="bg-black/50 text-white font-bold px-6 py-2.5 rounded-lg text-sm border border-white/20 hover:bg-black/70 transition-colors">
            Full Details
          </button>
        </div>
      </div>
    </div>
  );
}
