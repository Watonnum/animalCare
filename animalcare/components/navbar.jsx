"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
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
  const pathname = usePathname(); // ดึง path ปัจจุบัน
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
    // {
    //   id: 3,
    //   name: "Shop",
    //   path: "/shop",
    // },
    {
      id: 3,
      name: "Book",
      path: "/book",
    },
  ];

  useEffect(() => {
    console.log("Session auth: ", session, "Status auth: ", status);
  }, [session, status]);

  return (
    <div className="flex flex-col xl:flex-row justify-between items-center gap-4 bg-[#F6F6F6] px-4 md:px-8 py-4 md:py-3 rounded-2xl w-full select-none transition-opacity duration-300 font-extrabold text-xl text-[#945318]">
      {/* Left component */}
      <Link
        className="lobster-regular cursor-pointer text-4xl lg:text-5xl whitespace-nowrap"
        href="/"
      >
        Wipawan
      </Link>

      {/* middle component */}
      <div className="flex justify-center items-center gap-6 lg:gap-12 xl:border-x-2 px-2 md:px-6 py-2 md:py-0 whitespace-nowrap border-[#945318]/50">
        {menuNav.map((x) => (
          <MenuItem item={x} key={x.id} />
        ))}
      </div>

      {/* Right component */}
      <div className="flex justify-center items-center gap-4 whitespace-nowrap">
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
                // ส่ง callbackUrl เป็นพารามิเตอร์ไปหน้า login
                router.push(`/login?callbackUrl=/book`);
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
            <span className="text-base md:text-lg font-semibold text-amber-900 truncate max-w-30 sm:max-w-50">
              Hi, {session.user?.name}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })} // 4. กดแล้ว Logout
              className="px-4 md:px-6 py-2 border rounded-xl hover:cursor-pointer hover:scale-105 delay-50 transition-all text-[#945318] bg-transparent border-[#945318]"
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
