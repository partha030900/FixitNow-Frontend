"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useBookings } from "@/hooks/useBookings";

export default function CustomerDashboard() {
  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useBookings();

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-10">
          <p className="font-semibold text-blue-600">
            CUSTOMER DASHBOARD
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            My Bookings
          </h1>

          <p className="mt-4 text-gray-600">
            Track your service bookings and payment status.
          </p>
        </div>

        {isLoading && (
          <div className="rounded-xl border bg-white p-8 text-center">
            <p className="text-gray-600">
              Loading bookings...
            </p>
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
            Failed to load bookings. Please try again.
          </div>
        )}

        {!isLoading && !isError && bookings.length === 0 && (
          <div className="rounded-xl border bg-white p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              No bookings yet
            </h2>

            <p className="mt-2 text-gray-600">
              Browse our services and book a technician.
            </p>
          </div>
        )}

        {!isLoading && !isError && bookings.length > 0 && (
          <div className="grid gap-6">
            {bookings.map((booking) => (
  <div
    key={booking.id}
    className="rounded-xl border bg-white p-6 shadow-sm"
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          {booking.service.title}
        </h2>

        <p className="mt-2 text-gray-600">
          {booking.service.description}
        </p>
      </div>

      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          booking.status === "COMPLETED"
            ? "bg-green-100 text-green-700"
            : booking.status === "ACCEPTED"
            ? "bg-blue-100 text-blue-700"
            : booking.status === "DECLINED"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {booking.status}
      </span>
    </div>

    <div className="mt-6 grid gap-4 text-sm text-gray-600 sm:grid-cols-2">
      <div>
        <p className="font-medium text-gray-900">
          Scheduled
        </p>

        <p>
          {new Date(booking.scheduledAt).toLocaleString()}
        </p>
      </div>

      <div>
        <p className="font-medium text-gray-900">
          Address
        </p>

        <p>{booking.address}</p>
      </div>

      <div>
        <p className="font-medium text-gray-900">
          Technician
        </p>

        <p>{booking.technician.user.name}</p>
      </div>

      <div>
        <p className="font-medium text-gray-900">
          Location
        </p>

        <p>{booking.technician.location}</p>
      </div>
    </div>

    <div className="mt-6 flex items-center justify-between border-t pt-4">
      <span className="font-semibold text-blue-600">
        Tk. {booking.service.price}
      </span>

     <Link
  href={`/bookings/${booking.id}`}
  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
>
  View Details
</Link>
    </div>
  </div>
))}
          </div>
        )}

      </section>
    </main>
  );
}