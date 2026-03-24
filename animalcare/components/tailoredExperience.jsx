import React from "react";
import Image from "next/image";
import dog_smallNhuge from "@/public/dog_smallNhuge.jpg";

const TailoredExperience = () => {
  return (
    <div className="w-full py-16 md:px-8 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center select-none">
      {/* Left Content */}
      <div className="flex-1 space-y-10 w-full">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Tailored Experience <br className="hidden lg:block" /> for Every
            Size
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
            We understand that a Great Dane and a Toy Poodle have vastly
            different needs. Our facility is physically zoned to ensure safety
            and comfort for all.
          </p>
        </div>

        <div className="space-y-6">
          {/* Card 1: The Tiny Paws Wing */}
          <div className="bg-[#F6F4EC] rounded-3xl p-8 relative overflow-hidden pl-10 shadow-sm">
            <div className="absolute top-0 bottom-0 left-0 w-3 bg-[#8C4B18]"></div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
              The Tiny Paws Wing
            </h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              Exclusive area for small breeds with low-impact flooring,
              smaller-scale play equipment, and constant gentle supervision.
            </p>
          </div>

          {/* Card 2: The Big Bark Meadow */}
          <div className="bg-[#F6F4EC] rounded-3xl p-8 relative overflow-hidden pl-10 shadow-sm">
            <div className="absolute top-0 bottom-0 left-0 w-3 bg-[#0B5C92]"></div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
              The Big Bark Meadow
            </h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              Wide-open high-energy spaces for large breeds to run, explore, and
              participate in high-intensity exercise.
            </p>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-[45%] bg-white rounded-[2.5rem] overflow-hidden aspect-[4/5] relative flex items-center justify-center shadow-lg border border-[#f0ebe1]">
        {/* Placeholder for the Twin Dogs image */}
        <Image
          src={dog_smallNhuge}
          alt="Two sitting dogs"
          fill
          className="object-cover"
        />
        {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50">
          <svg
            className="w-16 h-16 mb-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm font-medium">[Image: Twin Dogs]</p>
        </div> */}
      </div>
    </div>
  );
};

export default TailoredExperience;
