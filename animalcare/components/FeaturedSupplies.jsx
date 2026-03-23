import React from "react";
import Image from "next/image";
import dogFood_product from "@/public/dogFood_product.jpg";
import harnnesses from "@/public/harnnesses.jpg";
import bedDog from "@/public/bedDog.jpg";
import beltDog from "@/public/beltDog.jpg";
import Link from "next/link";

const products = [
  {
    name: "Luxury dog belt",
    price: "$24.00",
    image: beltDog,
    tag: "NEW ARRIVAL",
    tagColor: "bg-yellow-600 text-white",
  },
  {
    name: "Luxury dog bed",
    price: "$68.00",
    image: dogFood_product,
  },
  {
    name: "Orthopedic Cloud Bed",
    price: "$125.00",
    image: bedDog,
    tag: "BEST SELLER",
    tagColor: "bg-blue-500 text-white",
  },
  {
    name: "Luxury dog Harnnesses",
    price: "$32.00",
    image: harnnesses,
  },
];

const FeaturedSupplies = () => {
  return (
    <div className="w-full py-16 px-8 bg-[#FEF9F2] rounded-3xl">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Featured Supplies
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Hand-picked gear and wellness products tested and approved by our
          resident canine experts.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {products.map((product, index) => (
            <div key={index} className="text-left">
              <div
                className={`relative rounded-2xl ${product.bgColor} flex items-center justify-center h-64 overflow-hidden`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={800}
                  height={800}
                  className="object-cover h-full w-full"
                />
                {product.tag && (
                  <div
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${product.tagColor}`}
                  >
                    {product.tag}
                  </div>
                )}
              </div>
              <h3 className="font-bold text-lg mt-4">{product.name}</h3>
              <p className="text-amber-600 font-bold">{product.price}</p>
            </div>
          ))}
        </div>
        <Link
          className="px-8 py-3 border-2 border-amber-800 rounded-full text-gray-700 font-semibold hover:bg-[#f2ede6] transition hover:cursor-pointer"
          href="/shop"
        >
          View All Supplies
        </Link>
      </div>
    </div>
  );
};

export default FeaturedSupplies;
