"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const MenuItem = ({ item }) => {
  const [isHover, setIsHover] = useState(false);
  const pathname = usePathname();
  return (
    <Link
      className={`${pathname === item.path ? "text-amber-800 scale-105" : "text-gray-300"} cursor-pointer transition-all`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      href={item.path}
    >
      <p
        className={`${isHover ? "text-amber-800 font-bold scale-120 transition-all duration-500" : ""}`}
      >
        {item.name}
      </p>
    </Link>
  );
};

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
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
      <Link className="lobster-regular cursor-pointer text-5xl" href="/">
        Wipawan
      </Link>

      {/* middle component */}
      <div className="flex justify-center items-center gap-12 border-x-2 px-6">
        {menuNav.map((x) => (
          <MenuItem item={x} key={x.id} />
        ))}
      </div>

      {/* Right component */}
      <div className="flex justify-center items-center gap-4">
        {status === "loading" && (
          // แสดง Placeholder ขณะกำลังโหลดข้อมูล session
          <div className="animate-pulse bg-gray-300 rounded-full h-9 w-9"></div>
        )}

        {status === "unauthenticated" && (
          // กรณีที่ยังไม่ได้ล็อคอิน
          <>
            {/* <FaUserCircle className="text-4xl text-[#904E0D]" /> */}
            <button
              onClick={() => {
                // signIn()
                router.push("/login");
              }}
              className="px-8 py-2 border rounded-xl hover:cursor-pointer hover:scale-105 delay-50 transition-all text-white bg-[#945318] border-[#945318]"
            >
              Book now
            </button>
          </>
        )}

        {status === "authenticated" && (
          // กรณีที่ล็อคอินแล้ว
          <>
            <span className="text-lg font-semibold text-amber-900">
              Hi, {session.user?.name}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })} // 4. กดแล้ว Logout
              className="px-6 py-2 border rounded-xl hover:cursor-pointer hover:scale-105 delay-50 transition-all text-[#945318] bg-transparent border-[#945318]"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
