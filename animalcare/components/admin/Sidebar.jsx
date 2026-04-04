import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdInventory,
  MdCalendarMonth,
  MdPeople,
  MdSettings,
  MdHelpOutline,
} from "react-icons/md";

export default function Sidebar() {
  const pathname = usePathname();

  const getLinkClass = (path) => {
    return pathname === path
      ? "flex items-center space-x-3 px-4 py-3 rounded-lg bg-[#202939] text-[#14B8A6] font-bold transition-colors"
      : "flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#202939] hover:text-white font-medium transition-colors";
  };

  return (
    <aside className="w-64 bg-[#111928] text-white flex flex-col justify-between md:flex shrink-0 relative z-20">
      <div>
        {/* Logo & Title */}
        <div className="p-6 mb-4">
          <h1 className="text-2xl font-extrabold tracking-wide text-white">
            AnimalCare Admin
          </h1>
          <p className="text-xs text-gray-400 mt-2 uppercase font-bold tracking-widest">
            Management Portal
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 px-4">
          <Link href="/admin" className={getLinkClass("/admin")}>
            <MdDashboard className="text-xl" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/inventory"
            className={getLinkClass("/admin/inventory")}
          >
            <MdInventory className="text-xl" />
            <span>Inventory</span>
          </Link>
          <Link
            href="/admin/schedules"
            className={getLinkClass("/admin/schedules")}
          >
            <MdCalendarMonth className="text-xl" />
            <span>Schedules</span>
          </Link>
          <Link
            href="/admin/customers"
            className={getLinkClass("/admin/customers")}
          >
            <MdPeople className="text-xl" />
            <span>Customers</span>
          </Link>
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 px-6 space-y-4">
        <button className="w-full bg-[#14B8A6] hover:bg-teal-500 text-gray-900 font-bold py-3 rounded-lg transition-colors">
          New Report
        </button>

        <div className="space-y-3 pt-4 border-t border-gray-700/50">
          <Link
            href="/admin/settings"
            className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
          >
            <MdSettings className="text-xl" />
            <span>Settings</span>
          </Link>
          <Link
            href="/admin/support"
            className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
          >
            <MdHelpOutline className="text-xl" />
            <span>Support</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
