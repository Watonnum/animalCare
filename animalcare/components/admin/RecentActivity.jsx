import React from "react";
import {
  MdCheckCircle,
  MdAccountBalanceWallet,
  MdPersonAdd,
  MdWarning,
} from "react-icons/md";

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>

      <div className="space-y-6 flex-1">
        {/* Activity Item 1 */}
        <div className="flex space-x-4">
          <div className="mt-1 bg-teal-100 p-2.5 rounded-full flex items-center justify-center h-10 w-10 flex-shrink-0">
            <MdCheckCircle className="text-teal-600 text-lg" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">
              Booking #8924 Confirmed
            </h4>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              Marcus Aurelius - Luxury Suite
            </p>
            <p className="text-[10px] text-gray-400 uppercase font-bold mt-1.5 tracking-wider">
              2 MINUTES AGO
            </p>
          </div>
        </div>

        {/* Activity Item 2 */}
        <div className="flex space-x-4">
          <div className="mt-1 bg-[#1C2536] p-2.5 rounded-full flex items-center justify-center h-10 w-10 flex-shrink-0">
            <MdAccountBalanceWallet className="text-teal-400 text-lg" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">
              Payment Received
            </h4>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              $450.00 from Elena Vance
            </p>
            <p className="text-[10px] text-gray-400 uppercase font-bold mt-1.5 tracking-wider">
              45 MINUTES AGO
            </p>
          </div>
        </div>

        {/* Activity Item 3 */}
        <div className="flex space-x-4">
          <div className="mt-1 bg-gray-100 p-2.5 rounded-full flex items-center justify-center h-10 w-10 flex-shrink-0">
            <MdPersonAdd className="text-gray-500 text-lg" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">
              New Client Registered
            </h4>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              Gordon Freeman (3 Pets)
            </p>
            <p className="text-[10px] text-gray-400 uppercase font-bold mt-1.5 tracking-wider">
              2 HOURS AGO
            </p>
          </div>
        </div>

        {/* Activity Item 4 */}
        <div className="flex space-x-4">
          <div className="mt-1 bg-red-100 p-2.5 rounded-full flex items-center justify-center h-10 w-10 flex-shrink-0">
            <MdWarning className="text-red-600 text-lg" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">Service Alert</h4>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              Suite 12 Maintenance Required
            </p>
            <p className="text-[10px] text-gray-400 uppercase font-bold mt-1.5 tracking-wider">
              5 HOURS AGO
            </p>
          </div>
        </div>
      </div>

      <button className="w-full py-3 mt-6 text-sm font-bold text-teal-800 bg-[#F0FBFA] hover:bg-teal-100 rounded-lg transition-colors border border-teal-100">
        View All History
      </button>
    </div>
  );
}
