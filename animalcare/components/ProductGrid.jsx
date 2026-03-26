"use client";
import React, { useState } from "react";
import ProductCard from "./ProductCard";

// Mock data to test the component
const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Wild Atlantic Salmon",
    price: 42.0,
    description:
      "Grain-free, cold-pressed recipe rich in Omega-3 for a shiny coat.",
    image: "/shop/wild_atlantic_salmon.jpg", // replace with actual image URL later
    badge: "TOP RATED",
    tags: ["ORGANIC", "ALL AGES"],
  },
  {
    id: 2,
    title: "Golden Turmeric Chews",
    price: 28.5,
    description:
      "Natural anti-inflammatory chews for joint mobility and comfort.",
    image: "/shop/golden_tumeric_chew.jpg",
    badge: "NEW",
    tags: ["HERBAL", "SENIORS"],
  },
  {
    id: 3,
    title: "Artisan Leather Collar",
    price: 55.0,
    description:
      "Vegetable-tanned leather handcrafted for lasting comfort and style.",
    image: "/shop/artisan_leather_collar.jpg",
    badge: null,
    tags: ["SUSTAINABLE", "MEDIUM-LARGE"],
  },
  {
    id: 4,
    title: "Puppy Growth Feast",
    price: 34.99,
    description:
      "High-protein formula with DHA for healthy brain and muscle growth.",
    image: "/shop/puppy_growth_feast.jpg",
    badge: null,
    tags: ["GROWTH", "PUPPY"],
  },
  {
    id: 5,
    title: "Zen Calm Hemp Oil",
    price: 19.0,
    description: "Premium full-spectrum hemp oil to reduce anxiety and stress.",
    image: "/shop/zen_calm_hemp_oil.jpg",
    badge: null,
    tags: ["NATURAL", "ANXIETY"],
  },
  {
    id: 6,
    title: "Sweet Potato Bites",
    price: 12.0,
    description:
      "Single-ingredient dehydrated sweet potato treats. No fillers.",
    image: "/shop/sweet_poatatos_bites.jpg",
    badge: "LOW STOCK",
    tags: ["SINGLE INGREDIENT", "VEGAN"],
  },
];

const ProductGrid = ({ products = MOCK_PRODUCTS }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sizeFilter, setSizeFilter] = useState("All Sizes");
  const [healthFilter, setHealthFilter] = useState("Any Need");

  return (
    <div className="w-full flex flex-col py-10 gap-8">
      {/* Filter Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full rounded-3xl py-6 px-6 bg-[#F8F3EB]">
        {/* Search */}
        <div className="flex flex-col w-full md:w-1/2 gap-2">
          <label className="text-sm font-bold text-gray-500">
            Search Supplies
          </label>
          <div className="relative w-full">
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <input
              type="text"
              placeholder="Salmon, Grain-free, Puppies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#E7E2D7] rounded-full outline-none focus:ring-2 focus:ring-[#9c5a1a]/50 text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Dropdowns */}
        <div className="flex gap-4 w-full md:w-auto">
          <div className="flex flex-col gap-2 w-full md:w-40">
            <label className="text-sm font-bold text-gray-500">Dog Size</label>
            <select
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
              className="w-full px-4 py-3 bg-[#E7E2D7] rounded-full outline-none appearance-none cursor-pointer"
            >
              <option value="All Sizes">All Sizes</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-40">
            <label className="text-sm font-bold text-gray-500">
              Health Needs
            </label>
            <select
              value={healthFilter}
              onChange={(e) => setHealthFilter(e.target.value)}
              className="w-full px-4 py-3 bg-[#e8e4db] rounded-full outline-none appearance-none cursor-pointer"
            >
              <option value="Any Need">Any Need</option>
              <option value="Joint Support">Joint Support</option>
              <option value="Anxiety">Anxiety</option>
              <option value="Skin & Coat">Skin & Coat</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
