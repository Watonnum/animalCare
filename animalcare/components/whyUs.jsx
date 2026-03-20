import Image from "next/image";
import React from "react";

const WhyUs = () => {
  return (
    <div className="flex gap-y-10 bg-[#34322B] justify-center items-center w-full rounded-3xl">
      {/* Widget */}
      <div className="w-1/2 p-10 flex">
        {/* Pic 1st col */}
        <div className="w-1/2 flex flex-col gap-4 justify-center items-end pr-2">
          <Image
            src="/worker.jpg"
            alt=""
            width={300}
            height={500}
            className="rounded-2xl"
          />
          <Image
            src="/puppy_hangUp.jpg"
            alt=""
            width={300}
            height={200}
            className="rounded-2xl"
          />
          {/* <div className="w-[300] h-[100] rounded-2xl"></div> */}
        </div>
        {/* Pic 2nd col */}
        <div className="w-1/2 flex flex-col gap-4 justify-center items-start pl-2">
          <div className=" w-[300] h-[100] rounded-2xl"></div>
          <Image
            src="/playground2.jpg"
            alt=""
            width={300}
            height={300}
            className="rounded-2xl"
          />
          <Image
            src="/playground.jpg"
            alt=""
            width={300}
            height={500}
            className="rounded-2xl"
          />
        </div>
      </div>

      {/* Dialog */}
      <div className="text-4xl text-white font-extrabold w-1/2 flex flex-col justify-center items-center">
        <p>Why choose WIPAWAN</p>
        <p className="text-[#FFAF71]">Safety & Best Practices</p>
      </div>
    </div>
  );
};

export default WhyUs;
