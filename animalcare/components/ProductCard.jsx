import Image from "next/image";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer">
      {/* Image container relative for badge */}
      <div className="relative w-full aspect-square bg-[#f8f6f0] overflow-hidden">
        {product.badge && (
          <div
            className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full text-white z-10 
            ${
              product.badge === "TOP RATED"
                ? "bg-[#9c5a1a]"
                : product.badge === "NEW"
                  ? "bg-[#5ebef5]"
                  : "bg-[#e8605d]"
            }`}
          >
            {product.badge}
          </div>
        )}
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover rounded-t-3xl group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col grow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg text-gray-800">{product.title}</h3>
          <span className="font-bold text-[#9c5a1a]">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-10">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-[#f3efe6] text-[#9c5a1a] text-xs font-bold rounded-full uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
