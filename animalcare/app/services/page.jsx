"use client";

import TheHealthyCare from "@/components/theHealthyCare";
import NutritionSafety from "@/components/nutritionSafety";
import PlayAndFacilities from "@/components/playAndFacilities";
import TailoredExperience from "@/components/tailoredExperience";
import React from "react";
import Letbooking from "@/components/letbooking";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const page = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center py-8"
    >
      <motion.div variants={itemVariants} className="w-full">
        <TheHealthyCare />
      </motion.div>
      <motion.div variants={itemVariants} className="w-full">
        <NutritionSafety />
      </motion.div>
      <motion.div variants={itemVariants} className="w-full">
        <PlayAndFacilities />
      </motion.div>
      <motion.div variants={itemVariants} className="w-full">
        <TailoredExperience />
      </motion.div>
      <motion.div variants={itemVariants} className="w-full">
        <Letbooking />
      </motion.div>
    </motion.div>
  );
};

export default page;
