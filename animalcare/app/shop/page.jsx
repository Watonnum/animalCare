import Shop_landing from "@/components/shop_landing";
import ProductGrid from "@/components/ProductGrid";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center mt-6 mx-[5%]">
      <Shop_landing />
      <ProductGrid />
    </div>
  );
};

export default page;
