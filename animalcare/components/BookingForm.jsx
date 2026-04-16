"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Verified_booking from "./verified_booking";
import PetSizeSelector from "./booking/PetSizeSelector";
import DateSelector from "./booking/DateSelector";
import SpecialCareSelector from "./booking/SpecialCareSelector";
import BookingSummary from "./booking/BookingSummary";

const prices = {
  small: 100,
  large: 150,
  morningService: 50,
  afternoonService: 50,
  fullDayService: 100,
};

const BookingForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  // Get today's date formatted as YYYY-MM-DD
  const today = new Date().toLocaleDateString("en-CA"); // 'en-CA' outputs YYYY-MM-DD consistently

  // State for form fields
  const [showSuccess, setShowSuccess] = useState(false);
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
      user: session?.user,
      status: "pending",
    };

    console.log("Submitting Booking Data to API:", bookingData);

    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/shop");
        }, 2500); // รอ 2.5 วินาที
      } else {
        const result = await response.json();
        alert("Booking failed: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Error processing your booking.");
    }
  };

  return (
    <>
      {showSuccess && <Verified_booking router={router} />}

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
              facilities offer 24/7 care, play sessions, and specialized
              wellness checks.
            </p>
          </div>

          <PetSizeSelector petSize={petSize} setPetSize={setPetSize} />

          <DateSelector
            today={today}
            checkIn={checkIn}
            checkOut={checkOut}
            handleCheckInChange={handleCheckInChange}
            handleCheckOutChange={handleCheckOutChange}
          />

          <SpecialCareSelector
            isSameDay={isSameDay}
            specialService={specialService}
            setSpecialService={setSpecialService}
            prices={prices}
          />
        </div>

        {/* Right Column: Summary */}
        <BookingSummary
          petSize={petSize}
          serviceDays={serviceDays}
          specialService={specialService}
          subtotal={subtotal}
          tax={tax}
          total={total}
          prices={prices}
          handleCompleteBooking={handleCompleteBooking}
          isButtonDisabled={
            serviceDays <= 0 || !start || end.getTime() < start.getTime()
          }
        />
      </div>
    </>
  );
};

export default BookingForm;
