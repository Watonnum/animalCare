import React from "react";

const Card = ({ card }) => {
  return (
    <div
      className={`w-96 h-48 border rounded-2xl p-2 flex hover:scale-110 transition-all cursor-pointer overflow-hidden relative bg-[#F2EBEB] z-1`}
    >
      <div className="w-[55%] flex flex-col justify-between">
        {/* partition 1*/}
        <div>
          <p className="text-[#ACAAA9]">{`Fate ${card.percenOff}% Off`}</p>
          <p className="text-2xl">{card.title}</p>
        </div>
        {/* partition 2*/}
        <button
          className="bg-amber-300 text-black font-bold p-2 rounded-lg border-amber-300
        hover:bg-black hover:cursor-pointer hover:border hover:border-black hover:text-amber-300 hover:stroke-amber-300"
        >
          Views Offers
        </button>
      </div>
      <img
        src={`/${card.bgImg}`}
        width={300}
        // alt={card.type}
        className={`absolute -z-10 ${card.bgSetting}`}
      />
    </div>
  );
};

export default Card;
