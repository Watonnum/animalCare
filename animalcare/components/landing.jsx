import Image from "next/image";
import React from "react";
import dogKidImage from "../public/dogKid.jpg";
import user_fake1 from "../public/user_fake1.jpg";
import user_fake2 from "../public/user_fake2.jpg";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

const Landing = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center w-full select-none gap-12 lg:gap-0 mt-8 lg:mt-0">
      <div className="w-full flex flex-col justify-center items-center lg:items-start gap-8 text-center lg:text-left">
        {/* welcome */}
        <div className="text-5xl md:text-6xl lg:text-8xl libre-baskerville">
          <p>
            Luxury <span className="text-amber-800">Rest</span> for
          </p>
          <p>Your Best Friend</p>
        </div>
        {/* detail */}
        <div className="text-gray-400 px-4 lg:px-0">
          Premium boarding and holistic care tailored for every breed. From
          sprawling suites to boutique grooming, we treat your pet like family.
        </div>
        {/* shop btn */}
        <div className="flex justify-center items-center gap-4 font-bold">
          <Link
            className="py-4 px-10 text-xl text-white border border-[#904E0D] rounded-2xl hover:scale-105 cursor-pointer transition-all delay-75 bg-[#904E0D]"
            href="/services"
          >
            {`Our services`}
          </Link>
        </div>
      </div>
      {/* Picture */}
      <div className="flex justify-center items-center w-full relative">
        <Image
          src={dogKidImage}
          alt="dogKid"
          className="rounded-4xl scale-70"
          width={800}
          height={900}
          // placeholder="blur"
        />
        <div className="absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4 bg-white/70 backdrop-blur-md border border-white/50 shadow-xl rounded-full px-6 py-3 min-w-max">
          <div className="flex -space-x-3">
            <Image
              src={user_fake1}
              alt="user1"
              className="rounded-full border-2 border-white object-cover w-12 h-12"
              width={48}
              height={48}
            />
            <Image
              src={user_fake2}
              alt="user2"
              className="rounded-full border-2 border-white object-cover w-12 h-12"
              width={48}
              height={48}
            />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-gray-800 text-sm md:text-base whitespace-nowrap">
              Loved by 2000+ Pets
            </p>
            <div className="flex justify-start items-center gap-1 text-amber-500 text-sm">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
