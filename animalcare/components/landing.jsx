import Image from "next/image";
import React from "react";
import dogKidImage from "../public/dogKid.jpg";
import user_fake1 from "../public/user_fake1.jpg";
import user_fake2 from "../public/user_fake2.jpg";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

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
        <div className="w-3/6 bottom-40 mx-6 z-10 absolute h-20 border bg-[#EDEAE0] blur-xs rounded-3xl opacity-85"></div>
        <Image
          src={user_fake1}
          alt="user_fake1.jpg"
          className="rounded-4xl z-10 absolute bottom-45 left-60 border border-white p-1 bg-white"
          width={48}
          height={48}
        />
        <Image
          src={user_fake2}
          alt="user_fake1.jpg"
          className="rounded-4xl z-10 absolute bottom-43 left-67 border border-white p-1 bg-white"
          width={48}
          height={48}
        />
        <div className="flex flex-col absolute bottom-45 z-10 left-85">
          <p className="font-extralight text-lg">Loved by 2000+ Pets</p>
          <div className="flex justify-start items-center gap-2 text-amber-600">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
