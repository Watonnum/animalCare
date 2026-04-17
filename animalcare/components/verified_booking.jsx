import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

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

const AnimatedSuccessBadge = () => (
  <div className="relative w-24 h-24 mb-4 flex items-center justify-center shrink-0">
    <motion.div
      className="absolute inset-0 bg-[#00B4FF] rounded-full"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />

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

    <svg
      className="w-12 h-12 relative z-20 text-[#ffffff]"
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
const Verified_booking = ({ router, isVisible = true, bookingData }) => {
  const receiptRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!bookingData) return null;

  const downloadPDF = async () => {
    if (!receiptRef.current) return;
    setIsDownloading(true);

    setTimeout(async () => {
      try {
        const canvas = await html2canvas(receiptRef.current, {
          scale: 2,
          backgroundColor: "#ffffff",
          useCORS: true,
          logging: false,
          windowWidth: receiptRef.current.scrollWidth,
          windowHeight: receiptRef.current.scrollHeight,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Booking_Receipt_${Date.now()}.pdf`);
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Could not generate PDF. Please try again.");
      } finally {
        setIsDownloading(false);
      }
    }, 150);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={receiptRef}
            className="bg-[#ffffff] p-8 md:p-10 rounded-[2.5rem] shadow-2xl flex flex-col items-center relative max-w-lg w-full border-8 border-[#DDF3FF] my-8"
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 20, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
          >
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

            <AnimatedSuccessBadge />

            <motion.h2
              className="text-3xl font-extrabold text-[#000000] mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Booking Confirmed!
            </motion.h2>

            <motion.p
              className="text-center text-[#6B7280] text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Your reservation has been successfully placed. Here is your
              receipt.
            </motion.p>

            <motion.div
              id="receipt-content"
              className="w-full bg-[#FCFBF8] rounded-2xl p-6 border border-[#EBE2D3] mb-8 text-left"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex justify-between items-center border-b border-[#EBE2D3] pb-3 mb-4">
                <h3 className="font-bold text-[#38261A] text-lg">
                  Booking Receipt
                </h3>
                {bookingData.user && (
                  <div className="text-right">
                    <p className="text-xs text-[#78716C]">Booked by</p>
                    <p className="text-sm font-bold text-[#38261A]">
                      {bookingData.user.name || bookingData.user.email}
                    </p>
                  </div>
                )}
              </div>

              <div
                className="space-y-4 mb-6"
                style={{
                  maxHeight: isDownloading ? "none" : "30vh",
                  overflowY: isDownloading ? "visible" : "auto",
                }}
              >
                {bookingData.pets.map((pet, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-start text-sm"
                  >
                    <div className="text-[#38261A]">
                      <span className="font-bold">{pet.name || "Unnamed"}</span>{" "}
                      ({pet.size}) x{pet.amount}
                      <p className="text-xs text-[#78716C] mt-1">
                        In: {pet.checkIn} <br />
                        Out: {pet.checkOut}
                      </p>
                      <p className="text-xs text-[#78716C] mt-0.5">
                        {pet.specialService === "morningService"
                          ? "Morning Care"
                          : pet.specialService === "afternoonService"
                            ? "Afternoon Care"
                            : "Full Day Care"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#EBE2D3] pt-4 space-y-2 text-sm text-[#38261A]">
                <div className="flex justify-between">
                  <span className="text-[#57534E]">Subtotal</span>
                  <span className="font-medium">
                    ${bookingData.pricing.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#57534E]">Tax (8%)</span>
                  <span className="font-medium">
                    ${bookingData.pricing.tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E5E7EB] mt-2">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-extrabold text-lg">
                    ${bookingData.pricing.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>

            {!isDownloading && (
              <motion.div
                className="flex gap-4 w-full px-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <button
                  type="button"
                  onClick={downloadPDF}
                  disabled={isDownloading}
                  className="flex-1 bg-white border-2 border-[#00B4FF] text-[#00B4FF] hover:bg-[#F0FAFF] font-bold py-3 px-2 rounded-3xl transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>{isDownloading ? "⏳" : "📄"}</span>{" "}
                  {isDownloading ? "Saving..." : "Download PDF"}
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="flex-1 bg-[#00B4FF] hover:bg-[#009CE0] text-white font-bold py-3 px-2 rounded-3xl transition-colors shadow-md text-center"
                >
                  Close & Home
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Verified_booking;
