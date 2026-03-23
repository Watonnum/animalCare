import Image from "next/image";
import React from "react";
import dogKidImage from "../public/dogKid.jpg";

const Landing = () => {
  return (
    <div className="grid grid-cols-2 justify-center items-center w-full select-none">
      <div className="w-full flex flex-col justify-center items-start gap-8">
        {/* welcome */}
        <div className="text-8xl libre-baskerville">
          <p>
            Luxury <span className="text-amber-800">Rest</span> for
          </p>
          <p>Your Best Friend</p>
        </div>
        {/* detail */}
        <div className="text-gray-400">
          Premium boarding and holistic care tailored for every breed. From
          sprawling suites to boutique grooming, we treat your pet like family.
        </div>
        {/* shop btn */}
        <div className="flex justify-center items-center gap-4">
          <button className="p-4 text-xl text-white border border-[#904E0D] rounded-2xl hover:scale-105 cursor-pointer transition-all delay-75 bg-[#904E0D]">
            {`Shop now >`}
          </button>
          <button className="p-4 text-xl border rounded-2xl hover:scale-105 cursor-pointer transition-all delay-75">
            Explore Pets
          </button>
        </div>
      </div>
      {/* Picture */}
      <div className="flex justify-center items-center w-full">
        <Image
          src={dogKidImage}
          alt="dogKid"
          className="rounded-4xl scale-70"
          width={700}
          height={800}
          // placeholder="blur"
        />
      </div>
    </div>
  );
};

export default Landing;
