import TheHealthyCare from "@/components/theHealthyCare";
import NutritionSafety from "@/components/nutritionSafety";
import PlayAndFacilities from "@/components/playAndFacilities";
import TailoredExperience from "@/components/tailoredExperience";
import React from "react";
import Letbooking from "@/components/letbooking";

const page = () => {
  return (
    <div className="flex flex-col items-center py-8">
      <TheHealthyCare />
      <NutritionSafety />
      <PlayAndFacilities />
      <TailoredExperience />
      <Letbooking />
    </div>
  );
};

export default page;
