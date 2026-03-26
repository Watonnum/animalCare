import React from "react";
import Image from "next/image";
import { FaDumbbell } from "react-icons/fa";

// Since I don't have the exact images, I'll use placeholders.
// Please replace these imports with your actual image paths.
import dogJump from "@/public/dog_jump.jpg";
import bedRoom from "@/public/dog_room.jpg";
import dogPark from "@/public/dog_park.jpg";

const PlayAndFacilities = () => {
  return (
    <div className="w-full text-[#4a4238] flex flex-col lg:flex-row gap-6 select-none mb-6">
      {/* Left Card: Active Play & Exercise */}
      <div className="w-full lg:w-[35%] bg-[#FFDBCE] rounded-4xl flex flex-col justify-between shadow-sm p-6">
        <div className="space-y-6">
          <div className="text-4xl text-[#7a6452]">
            <FaDumbbell />
          </div>
          <h2 className="text-3xl font-bold">Active Play & Exercise</h2>
          <p className="text-lg leading-relaxed font-medium">
            Guided agility sessions and social playgroups curated by breed and
            temperament.
          </p>
        </div>

        <div className="mt-8 rounded-4xl overflow-hidden h-64 relative bg-black/10">
          {/* Replace this div with actual Next/Image */}
          <Image
            src={dogJump}
            alt="Dog jumping"
            fill
            className="object-cover"
          />
          {/* <div className="absolute inset-0 flex items-center justify-center text-sm opacity-50">
            [Image: Dog Jumping]
          </div> */}
        </div>
      </div>

      {/* Right Card: Elite Facilities */}
      <div className="flex-1 bg-[#EAE8E1] rounded-4xl p-8 md:p-12 flex flex-col justify-between shadow-sm border border-[#e0ddD4]">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-bold">Elite Facilities</h2>
            <p className="text-lg leading-relaxed font-medium">
              Our state-of-the-art facility features climate-controlled suites,
              specialized soundproofing to reduce anxiety, and orthopaedic
              bedding for maximum comfort.
            </p>

            {/* Stats Pills */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="bg-[#F5F4F0] px-6 py-4 rounded-3xl min-w-50">
                <p className="text-2xl font-bold text-[#A66E38]">12k+</p>
                <p className="text-[10px] font-extrabold tracking-widest mt-1">
                  SQ FT OUTDOOR SPACE
                </p>
              </div>
              <div className="bg-[#F5F4F0] px-6 py-4 rounded-3xl min-w-50">
                <p className="text-2xl font-bold text-[#A66E38]">Cooling</p>
                <p className="text-[10px] font-extrabold tracking-widest mt-1">
                  INDOOR PLAY AREAS
                </p>
              </div>
            </div>
          </div>

          {/* Top Right Image */}
          <div className="w-full md:w-70 h-45 bg-black/10 rounded-4xl overflow-hidden relative shrink-0">
            <Image
              src={bedRoom}
              alt="Dog Bed Room"
              fill
              className="object-cover"
            />
            {/* <div className="absolute inset-0 flex items-center justify-center text-sm opacity-50">
              [Image: Bed Room]
            </div> */}
          </div>
        </div>

        {/* Bottom Right Image */}
        <div className="w-full md:w-[320px] h-50 bg-black/10 rounded-4xl overflow-hidden relative self-end mt-8">
          <Image
            src={dogPark}
            alt="Dog Water Park"
            fill
            className="object-cover"
          />
          {/* <div className="absolute inset-0 flex items-center justify-center text-sm opacity-50">
            [Image: Dog Park]
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PlayAndFacilities;
