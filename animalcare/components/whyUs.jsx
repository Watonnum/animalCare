import React from "react";

const WhyUs = () => {
  return (
    <div className="flex flex-col gap-10 w-full">
      <p className="text-4xl">
        Why <span className="text-amber-300">choose</span> WIPAWAN
      </p>

      {/* Widget */}
      <div className="flex h-[500] w-full mb-10 gap-6">
        <div className="flex flex-col w-4/6 gap-6">
          <div className="flex w-full h-1/2 gap-6">
            {/* BLOCK 1 */}
            <div className="w-1/2 border h-full rounded-2xl hover:scale-105 transition-transform duration-300 ease-in-out"></div>
            {/* BLOCK 2 */}
            <div className="w-1/2 border h-full rounded-2xl hover:scale-105 transition-transform duration-300 ease-in-out"></div>
          </div>

          {/* BLOCK 3 (Horizontal) */}
          <div className="w-full border h-1/2 rounded-2xl hover:scale-105 transition-transform duration-300 ease-in-out"></div>
        </div>

        {/* BLOCK4 (Vertical)*/}
        <div className="w-2/6 h-full border rounded-2xl hover:scale-105 transition-transform duration-300 ease-in-out"></div>
      </div>
    </div>
  );
};

export default WhyUs;
