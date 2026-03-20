"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const MenuItem = ({ item }) => {
  const [isHover, setIsHover] = useState(false);
  const pathname = usePathname();
  return (
    <Link
      className={`${isHover ? "text-amber-720 scale-105" : "text-[#EBEBEB]"} cursor-pointer transition-all ${pathname === item.path ? "text-amber-800 font-extrabold scale-105" : ""}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      href={item.path}
    >
      {item.name}
    </Link>
  );
};

const Navbar = () => {
  const menuNav = [
    {
      id: 1,
      name: "Home",
      path: "/" || "",
    },
    {
      id: 2,
      name: "Service",
      path: "/services",
    },
    {
      id: 3,
      name: "Shop",
      path: "/shop",
    },
  ];

  return (
    <div className="flex justify-between items-center gap-4 bg-[#F6F6F6] px-4 py-2 rounded-2xl w-full select-none transition-opacity duration-300 font-extrabold text-xl text-[#945318]">
      {/* Left component */}
      <Link className="cursor-pointer text-3xl" href="/">
        WIPAWAN
      </Link>

      {/* middle component */}
      <div className="flex justify-center items-center gap-12 border-x-2 px-6">
        {menuNav.map((x) => (
          <MenuItem item={x} key={x.id} />
        ))}
      </div>

      {/* Right component */}
      <div className="flex justify-center items-center gap-4">
        <FaUserCircle className="text-4xl text-[#904E0D] border-[#945318]" />
        <div className="px-8 py-2 border rounded-xl hover:cursor-pointer hover:scale-103 delay-50 transition-all text-white bg-[#945318] border-[#945318]">
          Sign In
        </div>
      </div>
    </div>
  );
};

export default Navbar;
