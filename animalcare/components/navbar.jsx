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
      className={`${isHover ? "text-black" : "text-[#EBEBEB]"} cursor-pointer transition-all ${pathname === item.path ? "text-black" : ""}`}
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
      path: "/",
    },
    {
      id: 2,
      name: "Dog",
      path: "/dog",
    },
    {
      id: 3,
      name: "Dog Food",
      path: "/dogfood",
    },
    {
      id: 4,
      name: "About",
      path: "/about",
    },
    {
      id: 5,
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <div className="flex justify-between items-center gap-4 text-xl bg-[#F6F6F6] px-4 py-2 rounded-2xl w-full select-none">
      {/* Left component */}
      <Link className="cursor-pointer" href="/">
        WIPAWAN
      </Link>
      {/* middle component */}
      <div className="flex justify-center items-center gap-12">
        {menuNav.map((x) => (
          <MenuItem item={x} key={x.id} />
        ))}
      </div>
      {/* Right component */}
      <div className="flex justify-center items-center gap-4">
        <FaUserCircle className="text-4xl text-[#F7C52F]" />
        <div className="px-8 py-2 border rounded-xl hover:cursor-pointer hover:scale-103 delay-50 transition-all">
          Sign In
        </div>
      </div>
    </div>
  );
};

export default Navbar;
