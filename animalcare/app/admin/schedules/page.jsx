import React from "react";
import { MdCalendarMonth, MdCheckCircle } from "react-icons/md";

//Mock data
const schedules = [
  {
    id: 1,
    service: "Dog Boarding",
    client: "Elena Vance (Luna)",
    date: "Oct 24, 2024",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    service: "Cat Grooming",
    client: "John Smith (Whiskers)",
    date: "Oct 24, 2024",
    time: "11:30 AM",
    status: "Pending",
  },
  {
    id: 3,
    service: "Vet Checkup",
    client: "Marcus Aurelius (Rex)",
    date: "Oct 25, 2024",
    time: "09:00 AM",
    status: "Confirmed",
  },
];

export default function SchedulesPage() {
  return (
    <div className="max-w-7xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Schedules & Appointments
          </h2>
          <p className="text-gray-500 mt-2 font-medium">
            Manage upcoming service appointments and boarding schedules.
          </p>
        </div>
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2.5 px-5 rounded-lg flex items-center shadow-sm transition-colors">
          <MdCalendarMonth className="mr-2 text-xl" /> New Appointment
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Upcoming Appointments
          </h3>
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center shrink-0">
                  <MdCalendarMonth className="text-teal-600 text-xl" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold text-sm">
                    {schedule.service}
                  </h4>
                  <p className="text-gray-500 font-medium text-xs mt-1">
                    {schedule.client}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-900 font-bold text-sm">
                  {schedule.date}
                </p>
                <p className="text-gray-500 font-medium text-xs mt-1">
                  {schedule.time}
                </p>
              </div>
              <div>
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full ${
                    schedule.status === "Confirmed"
                      ? "bg-teal-100 text-teal-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {schedule.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
