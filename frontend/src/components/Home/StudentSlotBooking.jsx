import React, { useState } from "react";
import { toast } from "sonner";

const StudentSlotBooking = () => {
  const [slots, setSlots] = useState([
    {
      id: 1,
      date: "2025-05-12",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      isBooked: false,
    },
    {
      id: 2,
      date: "2025-05-12",
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      isBooked: false,
    },
    {
      id: 3,
      date: "2025-05-13",
      startTime: "2:00 PM",
      endTime: "3:00 PM",
      isBooked: false,
    },
  ]);

  const handleBook = (id) => {
    setSlots((prev) =>
      prev.map((slot) =>
        slot.id === id ? { ...slot, isBooked: true } : slot
      )
    );
    toast.success("Slot booked successfully!");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold mb-4 text-[#3b66ff]">
        Book a Counselling Slot
      </h3>
      {slots.filter((slot) => !slot.isBooked).length === 0 ? (
        <p className="text-gray-500 text-lg">No available slots.</p>
      ) : (
        slots.map((slot) =>
          !slot.isBooked ? (
            <div
              key={slot.id}
              className="flex items-center justify-between bg-white shadow-md border border-gray-200 p-5 rounded-xl"
            >
              <div>
                <p className="font-medium text-lg text-gray-700">
                  {slot.date} — {slot.startTime} to {slot.endTime}
                </p>
              </div>
              <button
                onClick={() => handleBook(slot.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Book Now
              </button>
            </div>
          ) : null
        )
      )}
    </div>
  );
};

export default StudentSlotBooking;
