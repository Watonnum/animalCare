import TheHealthyCare from "@/components/theHealthyCare";
import NutritionSafety from "@/components/nutritionSafety";
import PlayAndFacilities from "@/components/playAndFacilities";
import TailoredExperience from "@/components/tailoredExperience";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center">
      <TheHealthyCare />
      <NutritionSafety />
      <PlayAndFacilities />
      <TailoredExperience />
    </div>
  );
};

export default page;
