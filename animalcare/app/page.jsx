"use client";

import CarePhilosophy from "@/components/carephilosophy";
import FeaturedSupplies from "@/components/FeaturedSupplies";
import Landing from "@/components/landing";
import WhyUs from "@/components/whyUs";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // หน่วงเวลาแต่ละ Component ให้ค่อยๆ โผล่มา
    },
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

export default function Home() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`flex flex-col items-center min-h-screen py-8`}
    >
      <motion.div variants={itemVariants} className="w-full">
        <Landing />
      </motion.div>
      <motion.div variants={itemVariants} className="w-full">
        <CarePhilosophy />
      </motion.div>
      <motion.div variants={itemVariants} className="w-full">
        <FeaturedSupplies />
      </motion.div>
      <motion.div variants={itemVariants} className="w-full">
        <WhyUs />
      </motion.div>
    </motion.div>
  );
}
