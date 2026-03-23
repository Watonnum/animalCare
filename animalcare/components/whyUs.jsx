import Image from "next/image";
import React from "react";
import Link from "next/link";
import playground2Image from "@/public/playground2.jpg";
import playgroundImage from "@/public/playground.jpg";
import workerImage from "@/public/worker.jpg";
import puppy_hangUp from "@/public/puppy_hangUp.jpg";
import { FaCheck } from "react-icons/fa";

const WhyUs = () => {
  return (
    <div className="bg-[#34322B] w-full py-20 lg:py-28 overflow-hidden select-none border-t border-[#46433a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
        {/* Left Side - Image Collage */}
        <div className="w-full lg:w-5/12 flex gap-4 sm:gap-6 justify-center">
          {/* Collage Column 1 */}
          <div className="flex flex-col gap-4 sm:gap-6 mt-12 w-1/2">
            <Image
              src={workerImage}
              alt="Worker bonding with dog"
              width={300}
              height={450}
              className="rounded-3xl object-cover w-full h-auto shadow-2xl hover:scale-105 transition-transform duration-500"
            />
            <Image
              src={puppy_hangUp}
              alt="Happy puppy"
              width={300}
              height={250}
              className="rounded-3xl object-cover w-full h-auto shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Collage Column 2 */}
          <div className="flex flex-col gap-4 sm:gap-6 mb-12 w-1/2">
            <Image
              src={playground2Image}
              alt="Dog playing"
              width={300}
              height={300}
              className="rounded-3xl object-cover w-full h-auto shadow-2xl hover:scale-105 transition-transform duration-500"
            />
            <Image
              src={playgroundImage}
              alt="Dog playground"
              width={300}
              height={400}
              className="rounded-3xl object-cover w-full h-auto shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center items-start space-y-8">
          <div className="space-y-3">
            <h4 className="text-[#FFAF71] font-extrabold tracking-widest uppercase text-sm">
              Safety & Best Practices
            </h4>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight">
              Why choose <span className="text-[#FFAF71]">WIPAWAN</span>
            </h2>
          </div>

          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
            We prioritize your beloved pet{"'"}s happiness and safety above all
            else. Our dedicated team of professionals ensures a clean,
            stimulating, and loving environment so you can have total peace of
            mind while you are away.
          </p>

          <ul className="space-y-5">
            {[
              "24/7 Professional Supervision & Care",
              "Spacious, Clean & Secure Play Areas",
              "Personalized Health & Nutrition Plans",
              "Expert Grooming & Spa Services",
            ].map((text, idx) => (
              <li
                key={idx}
                className="flex items-center text-gray-200 text-lg gap-4 font-medium"
              >
                <span className="w-8 h-8 shrink-0 rounded-full bg-[#FFAF71]/20 flex items-center justify-center text-[#FFAF71] shadow-sm">
                  <FaCheck className="text-sm" />
                </span>
                {text}
              </li>
            ))}
          </ul>

          <Link
            className="mt-4 px-10 py-4 bg-[#FFAF71] hover:bg-[#ffc191] text-[#34322B] font-bold cursor-pointer rounded-full transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_20px_rgba(255,175,113,0.3)]"
            href="/services"
          >
            Explore Our Facility
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
