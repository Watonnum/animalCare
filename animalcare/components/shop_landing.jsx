import Image from "next/image";
import React from "react";
import face_dog from "@/public/face_dog.jpg";

const Shop_landing = () => {
  return (
    <div className="flex justify-center items-center w-full select-none">
      <div className="w-full flex flex-col justify-center items-start gap-8">
        {/* welcome */}
        <div className="text-8xl libre-baskerville">
          <p>Nourishment as</p>
          <p>
            Nature <span className="text-[#602F00]">Intended</span>
          </p>
        </div>
        {/* detail */}
        <div className="text-gray-400">
          Curated selections of organic dog food, cold-pressed supplements, and
          sustainable accessories designed for the modern canine lifestyle.
        </div>
        {/* shop btn */}
        <div className="flex justify-center items-center gap-4 font-bold">
          {/* <button className="p-4 text-xl text-white border border-[#904E0D] rounded-2xl hover:scale-105 cursor-pointer transition-all delay-75 bg-[#904E0D]">
            {`Explore Supplies`}
          </button>
          <button className="p-4 text-xl border rounded-2xl hover:scale-105 cursor-pointer transition-all delay-75 bg-[#78C6FD] border-[#78C6FD]">
            Our Philosophy
          </button> */}
        </div>
      </div>
      {/* Picture */}
      <div className="flex justify-center items-center w-full">
        <Image
          src={face_dog}
          alt="face_dog"
          className="rounded-4xl scale-75 rotate-12"
          width={560}
          height={630}
          // placeholder="blur"
        />
      </div>
    </div>
  );
};

export default Shop_landing;
