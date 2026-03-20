import React from "react";
import Card from "./card";

const ShowcardOffer = () => {
  const arr = [
    {
      id: 1,
      percenOff: 25,
      title: "Cute Dogs Collections",
      type: "Dogs",
      bgImg: "dogWglasses.jpg",
      bgSetting: "-right-14 bottom-[10%]",
    },
    {
      id: 2,
      percenOff: 20,
      title: "Cute Cats Collections",
      type: "Cats",
      bgImg: "cat.jpg",
      bgSetting: "-right-20 -bottom-[90%] -rotate-20",
    },
    {
      id: 3,
      percenOff: 20,
      title: "First service",
      type: "Animals",
      bgImg: "firstService.jpg",
      bgSetting: "-right-10 -bottom-5",
    },
    {
      id: 4,
      percenOff: 10,
      title: "Service difference Animal types",
      type: "any",
      bgImg: "",
      bgSetting: "",
    },
    {
      id: 5,
      percenOff: 10,
      title: "Gift Card",
      type: "any",
      bgImg: "",
      bgSetting: "",
    },
    {
      id: 6,
      percenOff: 10,
      title: "Gift Card",
      type: "any",
      bgImg: "",
      bgSetting: "",
    },
  ];
  return (
    <div className="grid xl:grid-cols-3 2xl:grid-cols-4 gap-4 w-full my-20">
      {arr.map((item) => (
        <Card card={item} key={item.id} />
      ))}
    </div>
  );
};

export default ShowcardOffer;
