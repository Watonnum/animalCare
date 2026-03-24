import React from "react";
import Image from "next/image";
import { FaUtensils, FaCheckCircle } from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";
import dogFood from "@/public/dog_food.jpg";

const NutritionSafety = () => {
  return (
    <div className="w-full mx-auto flex flex-col lg:flex-row gap-6 select-none my-6">
      {/* Left Card: Science-Backed Nutrition */}
      <div className="flex-1 bg-[#F9F5F2] rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 shadow-sm border border-[#eae0d5]">
        <div className="flex-1 space-y-6">
          <FaUtensils className="text-4xl text-[#904E0D]" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Science-Backed <br className="hidden lg:block" />
            Nutrition
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our nutritionists craft personalized meal plans using premium
            organic ingredients. From grain-free options to raw diets, we ensure
            every bowl supports digestive health and vibrant energy.
          </p>
          <ul className="space-y-4 pt-4">
            <li className="flex items-center gap-3 text-gray-700 font-bold">
              <FaCheckCircle className="text-[#904E0D] text-lg shrink-0" />
              Freshly prepared daily meals
            </li>
            <li className="flex items-center gap-3 text-gray-700 font-bold">
              <FaCheckCircle className="text-[#904E0D] text-lg shrink-0" />
              Specialized diet management
            </li>
          </ul>
        </div>

        {/* Right side Image (Dog Food) */}
        <div className="w-full md:w-[45%] lg:w-[40%] bg-white rounded-[2rem] aspect-square flex items-center justify-center p-6 shadow-sm">
          <Image
            src={dogFood}
            alt="Dog Food Bowl"
            width={400}
            height={400}
            className="object-contain w-full h-full rounded-3xl"
          />
        </div>
      </div>

      {/* Right Card: Safety First Protocol */}
      <div className="w-full lg:w-[35%] bg-[#7AC4FF] rounded-[2rem] p-8 md:p-12 flex flex-col justify-between shadow-sm relative overflow-hidden">
        <div className="space-y-6 z-10">
          <div className="w-fit p-1 rounded-full text-gray-800">
            <BsShieldCheck className="text-4xl" strokeWidth={0.5} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            Safety First Protocol
          </h2>
          <p className="text-gray-800 text-lg leading-relaxed font-medium">
            24/7 onsite veterinary support and advanced security monitoring for
            absolute peace of mind.
          </p>
        </div>

        {/* Live Status Pill */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-5 mt-16 w-full shadow-sm border border-white/10 z-10">
          <p className="text-[11px] font-extrabold text-gray-700 tracking-widest mb-3 uppercase">
            Live Status
          </p>
          <div className="flex items-center gap-3">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-gray-900 text-[15px]">
              Medical Staff Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionSafety;
