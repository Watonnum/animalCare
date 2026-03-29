"use client";

import Shop_landing from "@/components/shop_landing";
import ProductGrid from "@/components/ProductGrid";
import React from "react";
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
      className="flex flex-col items-center mt-6 mx-[5%]"
    >
      <motion.div variants={itemVariants} className="w-full">
        <Shop_landing />
      </motion.div>
      <motion.div variants={itemVariants} className="w-full w-full mt-8">
        <ProductGrid />
      </motion.div>
    </motion.div>
  );
};

export default page;
