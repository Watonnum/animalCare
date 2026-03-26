"use client";
import React, { useState, useEffect } from "react";

// Base Prices (Can be fetched from API later or stored as constants outside component)
const prices = {
  small: 40,
  large: 60,
  morningService: 25,
  afternoonService: 25,
  fullDayService: 50,
};

const BookingForm = () => {
  // Get today's date formatted as YYYY-MM-DD
  const today = new Date().toLocaleDateString("en-CA"); // 'en-CA' outputs YYYY-MM-DD consistently

  // State for form fields
  const [petSize, setPetSize] = useState("small");
  const [checkIn, setCheckIn] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [checkOut, setCheckOut] = useState(
    new Date().toISOString().split("T")[0],
  );

  // State for add-on services (mutually exclusive)
  const [specialService, setSpecialService] = useState("fullDayService");

  const isSameDay = checkIn === checkOut;

  // Handlers for date changes
  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);
    if (
      newCheckIn !== checkOut &&
      (specialService === "morningService" ||
        specialService === "afternoonService")
    ) {
      setSpecialService("fullDayService");
    }
  };

  const handleCheckOutChange = (e) => {
    const newCheckOut = e.target.value;
    setCheckOut(newCheckOut);
    if (
      checkIn !== newCheckOut &&
      (specialService === "morningService" ||
        specialService === "afternoonService")
    ) {
      setSpecialService("fullDayService");
    }
  };

  // --- Derived State Calculations ---
  // 1. Calculate days
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  let nights = 0;

  if (start && end && end.getTime() >= start.getTime()) {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Treat 0 nights (same day) as 1 service day
  const serviceDays = nights === 0 ? 1 : nights;

  // 2. Calculate Subtotal
  let subtotal = serviceDays * prices[petSize];
  if (specialService) {
    subtotal += prices[specialService] * serviceDays;
  }

  const tax = subtotal * 0.08;

  // 4. Calculate Total
  const total = subtotal + tax;

  // Mock Submit Function - Replace with actual API Call
  const handleCompleteBooking = async () => {
    const bookingData = {
      petSize,
      checkIn,
      checkOut,
      specialService,
      serviceDays,
      pricing: {
        subtotal,
        tax,
        total,
      },
    };

    console.log("Submitting Booking Data to API:", bookingData);
    alert("Booking processing... Check console for data payload.");

    // Example API Call:
    // try {
    //   const response = await fetch('/api/bookings', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(bookingData)
    //   });
    //   const result = await response.json();
    //   if (result.success) {
    //      // Handle success
    //   }
    // } catch (error) {
    //   console.error("Booking failed:", error);
    // }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full text-amber-950">
      {/* Left Column: Form Setup */}
      <div className="flex-1 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#75390E] tracking-tight">
            Boarding Reservation
          </h1>
          <p className="text-[#6C635B] text-lg max-w-2xl">
            Give your pet a vacation of their own. Our premium boarding
            facilities offer 24/7 care, play sessions, and specialized wellness
            checks.
          </p>
        </div>

        {/* 1. Pet Size */}
        <div className="bg-[#F5F2EC] rounded-3xl p-6 flex flex-col gap-4">
          <h3 className="font-bold flex items-center gap-2 text-lg">
            <span className="text-xl">🐾</span> Pet Size
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Small Select */}
            <div
              onClick={() => setPetSize("small")}
              className={`p-5 rounded-2xl cursor-pointer transition-all border-2 
                ${petSize === "small" ? "bg-white border-[#75390E] shadow-sm" : "bg-white/50 border-transparent hover:bg-white"}`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-[#75390E]">Small</span>
                <span className="text-[#75390E]">🪴</span>
              </div>
              <p className="text-xs text-stone-500">Under 15kg • Cozy suite</p>
            </div>
            {/* Large Select */}
            <div
              onClick={() => setPetSize("large")}
              className={`p-5 rounded-2xl cursor-pointer transition-all border-2 
                ${petSize === "large" ? "bg-white border-[#75390E] shadow-sm" : "bg-white/50 border-transparent hover:bg-white"}`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-[#75390E]">Large</span>
                <span className="text-[#75390E]">🌲</span>
              </div>
              <p className="text-xs text-stone-500">
                Over 15kg • Spacious kennel
              </p>
            </div>
          </div>
        </div>

        {/* 2. Dates & Schedule */}
        <div className="bg-[#F5F2EC] rounded-3xl p-6 flex flex-col gap-4">
          <h3 className="font-bold flex items-center gap-2 text-lg">
            <span className="text-xl">📅</span> Dates & Schedule
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
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

        {/* 3. Specialized Care */}
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
                ${specialService === "morningService" ? "border-[#75390E]/20" : "border-transparent"}
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
                  ${specialService === "morningService" ? "bg-[#9A561D] border-[#9A561D]" : "border-stone-300"}`}
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
                ${specialService === "afternoonService" ? "border-[#75390E]/20" : "border-transparent"}
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
                  ${specialService === "afternoonService" ? "bg-[#9A561D] border-[#9A561D]" : "border-stone-300"}`}
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
                ${specialService === "fullDayService" ? "border-[#75390E]/20" : "border-transparent"}`}
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
                  ${specialService === "fullDayService" ? "bg-[#9A561D] border-[#9A561D]" : "border-stone-300"}`}
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
      </div>

      {/* Right Column: Summary */}
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
            disabled={
              serviceDays <= 0 || !start || end.getTime() < start.getTime()
            }
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
    </div>
  );
};

export default BookingForm;
