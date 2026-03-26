import React from "react";
import Link from "next/link";

const Letbooking = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-[#FFAF71] rounded-3xl p-12 gap-6 w-full">
      <p className="text-5xl font-bold">Ready to Book Their Vacation ?</p>
      <div className="flex flex-col justify-center items-center text-2xl">
        <p>
          Spaces fill up quickly. Secure your dog{"'"}s spot at HealthyCaredog
        </p>
        <p>today and give them the care they deserve</p>
      </div>
      <div className="flex justify-center items-center">
        <Link
          className="rounded-4xl py-4 px-6 font-bold text-3xl bg-white hover:scale-110 transition-all duration-200"
          href="/book"
        >
          Book now
        </Link>
      </div>
    </div>
  );
};

export default Letbooking;
