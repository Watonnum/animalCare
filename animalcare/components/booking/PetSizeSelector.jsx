import React from "react";

export default function PetSizeSelector({ petSize, setPetSize }) {
  return (
    <div className="bg-[#F5F2EC] rounded-3xl p-6 flex flex-col gap-4">
      <h3 className="font-bold flex items-center gap-2 text-lg">
        <span className="text-xl">🐾</span> Pet Size
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Small Select */}
        <div
          onClick={() => setPetSize("small")}
          className={`p-5 rounded-2xl cursor-pointer transition-all border-2 
          ${
            petSize === "small"
              ? "bg-white border-[#75390E] shadow-sm"
              : "bg-white/50 border-transparent hover:bg-white"
          }`}
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
          ${
            petSize === "large"
              ? "bg-white border-[#75390E] shadow-sm"
              : "bg-white/50 border-transparent hover:bg-white"
          }`}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-[#75390E]">Large</span>
            <span className="text-[#75390E]">🌲</span>
          </div>
          <p className="text-xs text-stone-500">Over 15kg • Spacious kennel</p>
        </div>
      </div>
    </div>
  );
}
