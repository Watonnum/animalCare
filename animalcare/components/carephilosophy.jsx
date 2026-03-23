import React from "react";
import { FaLeaf } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa";

const CarePhilosophy = () => {
  return (
    <div className="w-full py-16 px-8 bg-[#F9F5F2]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Care Philosophy
            </h2>
            <p className="text-gray-600 mb-6">
              We believe every dog deserves a space that feels like home. Our
              approach combines state-of-the-art medical monitoring with the
              warm touch of experienced pet enthusiasts.
            </p>
          </div>
          <div className="text-right">
            <a
              href="/services"
              className="text-amber-800 font-semibold hover:underline"
            >
              Learn about our standards &rarr;
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-8 rounded-2xl shadow-md text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <FaLeaf className="text-orange-500 text-2xl" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Stress-Free Environment
            </h3>
            <p className="text-gray-600">
              Acoustic paneling and pheromone diffusers keep the environment
              calm, even during peak boarding seasons.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <FaPlusSquare className="text-blue-500 text-2xl" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              24/7 Health Monitoring
            </h3>
            <p className="text-gray-600">
              Certified veterinary technicians on-site around the clock to
              ensure your pet{"'"},s health is never compromised.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gray-200 rounded-full">
                <FaUtensils className="text-gray-600 text-2xl" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Gourmet Nutrition
            </h3>
            <p className="text-gray-600">
              Customized meal plans featuring premium human-grade ingredients
              and specialized dietary options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarePhilosophy;
