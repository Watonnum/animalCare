"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Verified_booking from "./verified_booking";
import BookingSummary from "./booking/BookingSummary";
import SpecialCareSelector from "./booking/SpecialCareSelector";

const prices = {
  small: 100,
  large: 150,
  morningService: 50,
  afternoonService: 50,
  fullDayService: 100,
};

const defaultPet = () => ({
  id: Date.now() + Math.random(),
  name: "",
  breed: "",
  size: "large",
  amount: 1,
  checkIn: new Date().toISOString().split("T")[0],
  checkOut: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  allergies: "",
  instructions: "",
  specialService: "fullDayService",
});

const BookingForm = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const today = new Date().toLocaleDateString("en-CA");

  const [showSuccess, setShowSuccess] = useState(false);
  const [pets, setPets] = useState([defaultPet()]);

  const updatePet = (id, field, value) => {
    setPets((prevPets) =>
      prevPets.map((pet) => {
        if (pet.id === id) {
          const newPet = { ...pet, [field]: value };
          if (field === "checkIn") {
            if (newPet.checkOut < value) {
              newPet.checkOut = value;
            }
            if (
              newPet.checkIn !== newPet.checkOut &&
              (newPet.specialService === "morningService" ||
                newPet.specialService === "afternoonService")
            ) {
              newPet.specialService = "fullDayService";
            }
          }
          if (field === "checkOut") {
            if (
              newPet.checkIn !== newPet.checkOut &&
              (newPet.specialService === "morningService" ||
                newPet.specialService === "afternoonService")
            ) {
              newPet.specialService = "fullDayService";
            }
          }
          return newPet;
        }
        return pet;
      }),
    );
  };

  const addPet = () => {
    setPets([...pets, defaultPet()]);
  };

  const removePet = (id) => {
    if (pets.length > 1) {
      setPets(pets.filter((pet) => pet.id !== id));
    }
  };

  // Calculate pricing
  let subtotal = 0;

  pets.forEach((pet) => {
    const start = new Date(pet.checkIn);
    const end = new Date(pet.checkOut);
    let nights = 0;

    if (start && end && end.getTime() >= start.getTime()) {
      const diffTime = Math.abs(end.getTime() - start.getTime());
      nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    const serviceDays = nights === 0 ? 1 : nights;

    // Base price
    const basePrice = prices[pet.size] * serviceDays * pet.amount;
    const specialServicePrice = pet.specialService
      ? prices[pet.specialService] * serviceDays * pet.amount
      : 0;
    subtotal += basePrice + specialServicePrice;
  });

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCompleteBooking = async () => {
    const bookingData = {
      pets,
      pricing: {
        subtotal,
        tax,
        total,
      },
      user: session?.user,
      status: "pending",
    };

    console.log("Submitting Booking Data:", bookingData);

    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 2500);
      } else {
        const result = await response.json();
        alert("Booking failed: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Error processing your booking.");
    }
  };

  const isButtonDisabled = pets.some((pet) => {
    const start = new Date(pet.checkIn);
    const end = new Date(pet.checkOut);
    return !pet.checkIn || !pet.checkOut || end.getTime() < start.getTime();
  });

  return (
    <>
      {showSuccess && <Verified_booking router={router} />}

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full text-amber-950">
        {/* Left Column: Form Setup */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col gap-2 mb-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#38261A] tracking-tight font-serif">
              Boarding Reservation
            </h1>
          </div>

          {pets.map((pet, index) => (
            <div
              key={pet.id}
              className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#EBE2D3] relative"
            >
              {pets.length > 1 && (
                <button
                  onClick={() => removePet(pet.id)}
                  className="absolute top-6 right-6 text-red-500 hover:text-red-700 text-sm font-bold"
                >
                  Remove
                </button>
              )}

              <h2 className="text-xl font-bold text-[#38261A] mb-6">
                Pet Details {pets.length > 1 ? `#${index + 1}` : ""}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-stone-600">
                    Pet Name
                  </label>
                  <input
                    type="text"
                    value={pet.name}
                    onChange={(e) => updatePet(pet.id, "name", e.target.value)}
                    placeholder="Buddy"
                    className="w-full p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C4A0F]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-stone-600">
                    Breed
                  </label>
                  <input
                    type="text"
                    value={pet.breed}
                    onChange={(e) => updatePet(pet.id, "breed", e.target.value)}
                    placeholder="Golden Retriever"
                    className="w-full p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C4A0F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-stone-600">
                    Size
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updatePet(pet.id, "size", "small")}
                      className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-xl transition-all ${
                        pet.size === "small"
                          ? "border-[#8C4A0F] bg-[#FDFBF7] shadow-sm"
                          : "border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <span>🐕</span>
                      <div className="text-left">
                        <div className="font-bold text-sm">Small</div>
                        <div className="text-[10px] text-stone-500">
                          Under 15kg
                        </div>
                      </div>
                      <div
                        className={`ml-auto w-10 h-6 rounded-full flex items-center p-1 ${pet.size === "small" ? "bg-stone-400" : "bg-stone-200"}`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transition-transform ${pet.size === "small" ? "translate-x-4" : ""}`}
                        ></div>
                      </div>
                    </button>
                    <button
                      onClick={() => updatePet(pet.id, "size", "large")}
                      className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-xl transition-all ${
                        pet.size === "large"
                          ? "border-[#8C4A0F] bg-[#FDFBF7] shadow-sm"
                          : "border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <span>🐕</span>
                      <div className="text-left">
                        <div className="font-bold text-sm">Large</div>
                        <div className="text-[10px] text-stone-500">
                          Over 15kg
                        </div>
                      </div>
                      <div
                        className={`ml-auto w-10 h-6 rounded-full flex items-center p-1 ${pet.size === "large" ? "bg-stone-400" : "bg-stone-200"}`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transition-transform ${pet.size === "large" ? "translate-x-4" : ""}`}
                        ></div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-stone-600">
                    Amount
                  </label>
                  <div className="flex items-center gap-4 h-[60px]">
                    <button
                      onClick={() =>
                        updatePet(pet.id, "amount", Math.max(1, pet.amount - 1))
                      }
                      className="w-10 h-10 rounded-xl border border-stone-200 flex items-center justify-center text-xl hover:bg-stone-50"
                    >
                      -
                    </button>
                    <span className="text-lg font-bold w-4 text-center">
                      {pet.amount}
                    </span>
                    <button
                      onClick={() =>
                        updatePet(pet.id, "amount", pet.amount + 1)
                      }
                      className="w-10 h-10 rounded-xl border border-stone-200 flex items-center justify-center text-xl hover:bg-stone-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <h3 className="text-md font-bold text-[#38261A] mb-4">
                Dates & Schedule
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-stone-600">
                    Check-in Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={today}
                      value={pet.checkIn}
                      onChange={(e) =>
                        updatePet(pet.id, "checkIn", e.target.value)
                      }
                      className="w-full p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C4A0F] appearance-none"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-stone-600">
                    Check-out Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={pet.checkIn || today}
                      value={pet.checkOut}
                      onChange={(e) =>
                        updatePet(pet.id, "checkOut", e.target.value)
                      }
                      className="w-full p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C4A0F] appearance-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-stone-600">
                    Food/Medication Allergies
                  </label>
                  <textarea
                    value={pet.allergies}
                    onChange={(e) =>
                      updatePet(pet.id, "allergies", e.target.value)
                    }
                    placeholder="None"
                    className="w-full p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C4A0F] min-h-[80px] resize-none"
                  ></textarea>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-stone-600">
                    Special Instructions
                  </label>
                  <textarea
                    value={pet.instructions}
                    onChange={(e) =>
                      updatePet(pet.id, "instructions", e.target.value)
                    }
                    placeholder="Needs daily brushing"
                    className="w-full p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C4A0F] min-h-[80px] resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="-mx-2 md:mx-0">
                <SpecialCareSelector
                  isSameDay={pet.checkIn === pet.checkOut}
                  specialService={pet.specialService}
                  setSpecialService={(val) =>
                    updatePet(pet.id, "specialService", val)
                  }
                  prices={prices}
                />
              </div>
            </div>
          ))}

          <button
            onClick={addPet}
            className="w-full py-4 bg-[#00BA53] hover:bg-[#00A349] text-white rounded-2xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span className="text-xl leading-none">+</span> Add Another Pet
          </button>
        </div>

        {/* Right Column: Summary */}
        <div className="w-full lg:w-[400px]">
          <BookingSummary
            pets={pets}
            subtotal={subtotal}
            tax={tax}
            total={total}
            prices={prices}
            handleCompleteBooking={handleCompleteBooking}
            isButtonDisabled={isButtonDisabled}
          />
        </div>
      </div>
    </>
  );
};

export default BookingForm;
