import React from "react";
import { MdSearch, MdNotifications, MdApps } from "react-icons/md";

export default function TopNavbar() {
  return (
    <header className="h-20 bg-white md:bg-transparent px-8 flex items-center justify-between border-b md:border-none border-gray-200 py-6">
      <div className="flex-1 max-w-xl relative">
        <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <input
          type="text"
          placeholder="Search analytics..."
          className="w-full pl-12 pr-4 py-2.5 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium text-gray-700"
        />
      </div>
      <div className="flex items-center space-x-6 pl-4">
        <button className="text-gray-400 hover:text-gray-700 relative">
          <MdNotifications className="text-2xl" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="text-gray-400 hover:text-gray-700">
          <MdApps className="text-2xl" />
        </button>
        <button className="hidden md:block bg-[#111928] text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
          Add Entry
        </button>
        <div
          className="h-10 w-10 rounded-full bg-cover bg-center border-2 border-white shadow-sm"
          style={{
            backgroundImage:
              "url('https://randomuser.me/api/portraits/women/44.jpg')",
          }}
        ></div>
      </div>
    </header>
  );
}
