import React from "react";
import bg_theHealthyCare from "@/public/bg_theHealthyCare.jpg";

const TheHealthyCare = () => {
  return (
    <div
      className="w-full flex flex-col p-20 bg-cover bg-center text-white mt-6"
      style={{
        backgroundImage: `linear-gradient(rgba(100, 50, 20, 0.7), rgba(100, 50, 20, 0.7)), url(${bg_theHealthyCare.src})`,
      }}
    >
      <div className="mb-6">
        <p className="text-7xl font-bold">The Healthy Care</p>
        <p className="text-7xl font-bold">Approach</p>
      </div>
      <p className="font-light">
        More than just a stay{"-"}it{"'"}s a holistic wellness retreat designed
        specifically for your dog{"'"}s physiological and emotional needs.
      </p>
    </div>
  );
};

export default TheHealthyCare;
