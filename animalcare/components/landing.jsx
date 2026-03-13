import React from "react";

const Landing = () => {
  return (
    <div className="grid grid-cols-2 justify-center items-center w-full h-screen select-none">
      <div className="w-full flex flex-col justify-center items-start gap-8">
        {/* welcome */}
        <div className="text-8xl libre-baskerville">
          <p>Shop Cute Dogs</p>
          <p>& Cats Online</p>
        </div>
        {/* detail */}
        <div className="text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At est vitae
          error hic quo rerum qui impedit, repudiandae similique! Iure
          blanditiis reprehenderit quibusdam! Similique quas, modi, corrupti,
          dicta quo excepturi consequuntur delectus nostrum sed repellendus
          deleniti. Libero minus sit quae.
        </div>
        {/* shop btn */}
        <div className="flex justify-center items-center gap-4">
          <button className="p-4 text-xl border border-amber-300 rounded-2xl hover:scale-105 cursor-pointer transition-all delay-75 bg-amber-300">
            {`Shop now >`}
          </button>
          <button className="p-4 text-xl border rounded-2xl hover:scale-105 cursor-pointer transition-all delay-75">
            Explore Pets
          </button>
        </div>
      </div>
      {/* <div className="w-full"></div> */}
    </div>
  );
};

export default Landing;
