import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// 1. แยก Component ก้อนเมฆออกมาให้ดูง่ายขึ้น
const CloudIcon = ({ width, height, className, delay = 0, yOffset = 10 }) => (
  <motion.div
    className={className}
    initial={{ y: 0 }}
    animate={{ y: [0, -yOffset, 0] }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
  >
    <svg width={width} height={height} viewBox="0 0 40 25" fill="#00B4FF">
      <path d="M10,25 C4.477,25 0,20.523 0,15 C0,9.477 4.477,5 10,5 C10.963,5 11.892,5.137 12.77,5.39 C15.022,2.096 18.913,0 23.333,0 C30.697,0 36.666,5.969 36.666,13.333 C36.666,13.882 36.633,14.423 36.568,14.954 C38.544,16.29 40,18.49 40,21 C40,23.209 38.209,25 36,25 L10,25 Z" />
    </svg>
  </motion.div>
);

// 2. แยก Component เครื่องหมายถูก (Success Badge) แบบใช้ Framer Motion
const AnimatedSuccessBadge = () => (
  <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
    {/* Outer Waves Effects */}
    <motion.div
      className="absolute inset-0 bg-[#00B4FF] rounded-full"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Main Circles */}
    <motion.div
      className="absolute inset-2 bg-[#FFD700] rounded-full z-10 border-4 border-[#00A1E4]"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    />
    <motion.div
      className="absolute inset-3 bg-[#42C889] rounded-full z-10"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
    />

    {/* Checkmark Line (วาดเส้นด้วย Framer Motion) */}
    <svg
      className="w-16 h-16 relative z-20 text-white"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M5 13l4 4L19 7"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      />
    </svg>
  </div>
);

// 3. Component หลักที่สะอาดและอ่านง่ายขึ้นมาก
const Verified_booking = ({ router, isVisible = true }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Main Modal Card */}
          <motion.div
            className="bg-white p-10 rounded-[2.5rem] shadow-2xl flex flex-col justify-center items-center relative overflow-hidden max-w-sm w-full border-8 border-[#DDF3FF]"
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 20, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
          >
            {/* Decorative Clouds */}
            <CloudIcon
              width="40"
              height="25"
              className="absolute top-6 left-6 opacity-30"
              yOffset={8}
            />
            <CloudIcon
              width="30"
              height="18"
              className="absolute top-8 right-8 opacity-30"
              delay={1}
              yOffset={-10}
            />

            {/* Success Animation */}
            <AnimatedSuccessBadge />

            {/* Text Content */}
            <motion.h2
              className="text-[32px] font-extrabold text-black mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Success
            </motion.h2>

            <motion.div
              className="text-center text-gray-800 text-sm font-medium mb-8 space-y-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p>Your booking is verified and fully updated.</p>
              <p>Thank you for completing this step.</p>
            </motion.div>

            {/* Action Button */}
            <motion.button
              type="button"
              onClick={() => router.push("/")}
              className="bg-[#00B4FF] hover:bg-[#009CE0] text-white font-bold py-3 px-8 w-3/4 rounded-4xl transition-colors shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Done
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Verified_booking;
