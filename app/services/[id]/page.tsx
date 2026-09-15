"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useServices } from "@/hooks/useServices";
import { useCreateBooking } from "@/hooks/useCreateBooking";
import { useBookedSlots } from "@/hooks/useBookedSlots";
import { getApiErrorMessage } from "@/lib/error";


export default function ServiceDetailsPage() {
  const params = useParams();
  const { data: services = [], isLoading, isError } = useServices();

  const service = services.find(
    (item) => item.id === params.id
  );
  const createBookingMutation = useCreateBooking();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [address, setAddress] = useState("");

const availability = service?.technician?.availability ?? []; 


const {data: bookedSlots = [], isLoading: isBookedSlotsLoading,
} = useBookedSlots(
  service?.technician?.id ?? "",
  selectedDate
);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="rounded-xl border bg-white p-8 text-center">
            <p className="text-gray-600">
              Loading service details...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
            Failed to load service details.
          </div>
        </div>
      </main>
    );
  }

  if (!service) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="rounded-xl border bg-white p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Service not found
            </h1>

            <p className="mt-2 text-gray-600">
              The service you are looking for does not exist.
            </p>
          </div>
        </div>
      </main>
    );
  }
  const getAvailableTimeSlots = () => {
  if (!selectedDate) return [];

  const date = new Date(`${selectedDate}T00:00:00`);
  const dayOfWeek = (date.getDay() + 6) % 7;

  const dayAvailability = availability.find(
    (slot) => slot.dayOfWeek === dayOfWeek
  );

  if (!dayAvailability) return [];

  const slots: string[] = [];

  const [startHour, startMinute] =
    dayAvailability.startTime.split(":").map(Number);

  const [endHour, endMinute] =
    dayAvailability.endTime.split(":").map(Number);

  let currentMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  while (currentMinutes < endMinutes) {
    const hour = Math.floor(currentMinutes / 60);
    const minute = currentMinutes % 60;

    slots.push(
      `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
    );

    currentMinutes += 60;
  }

  return slots;
};

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-xl border bg-white p-8 shadow-sm">

          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
            {service.category.name}
          </span>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            {service.title}
          </h1>

          <p className="mt-4 text-gray-600">
            {service.description}
          </p>

          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Technician
            </h2>

            <p className="mt-3 text-lg font-semibold text-gray-900">
              {service.technician.user.name}
            </p>

            <p className="mt-2 text-gray-600">
              {service.technician.bio}
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Location
                </p>

                <p className="font-semibold">
                  {service.technician.location}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Experience
                </p>

                <p className="font-semibold">
                  {service.technician.experience} years
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Rating
                </p>

                <p className="font-semibold">
                  ⭐ {service.technician.avgRating}
                </p>
              </div>
            </div>
          </div>

         <div className="mt-8 border-t pt-6">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">
        Service price
      </p>

      <p className="text-2xl font-bold text-blue-600">
        Tk. {service.price}
      </p>
    </div>
  </div>

  <div className="mt-6 grid gap-4">
   <div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Select Date
  </label>

  <input
    type="date"
    value={selectedDate}
    onChange={(e) => {
      setSelectedDate(e.target.value);
      setSelectedTime("");
    }}
    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
  />
</div>
{selectedDate && (
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700">
      Available Time Slots
    </label>

    {getAvailableTimeSlots().length === 0 ? (
      <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
        No available time slots for this date.
      </p>
    ) : (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {getAvailableTimeSlots().map((time) => {
  const isBooked = bookedSlots.includes(time);

  return (
    <button
      key={time}
      type="button"
      disabled={isBooked || isBookedSlotsLoading}
      onClick={() => setSelectedTime(time)}
      className={`rounded-lg border px-4 py-3 text-sm font-semibold transition ${
        isBooked
          ? "cursor-not-allowed border-red-200 bg-red-50 text-red-500"
          : selectedTime === time
          ? "border-blue-600 bg-blue-600 text-white"
          : "border-gray-200 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50"
      }`}
    >
      {isBooked ? `${time} - Booked` : time}
    </button>
  );
})}
      </div>
    )}
  </div>
)}

    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Service address
      </label>

      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter the address where the service is needed"
        rows={3}
        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
      />
    </div>

    <button
  onClick={() => {
    createBookingMutation.mutate({
      serviceId: service.id,
      scheduledAt: `${selectedDate}T${selectedTime}`,
      address,
    });
  }}
  disabled={
    !selectedDate ||
    !selectedTime ||
    !address.trim() ||
    createBookingMutation.isPending
  }
  className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
>
  {createBookingMutation.isPending
    ? "Booking..."
    : "Book Now"}
</button>

    {createBookingMutation.isSuccess && (
      <div className="rounded-lg bg-green-50 p-4 text-green-700">
        Booking created successfully!
      </div>
    )}

    {createBookingMutation.isError && (
  <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
    {getApiErrorMessage(
      createBookingMutation.error,
      "Failed to create booking. Please try again."
    )}
  </div>
)}
  </div>
</div>
        </div>
      </section>
    </main>
  );
}