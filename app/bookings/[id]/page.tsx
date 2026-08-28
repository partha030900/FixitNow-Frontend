"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useBookingById } from "@/hooks/useBookingById";
import { useCancelBooking } from "@/hooks/useCancelBooking";
import { useUpdateBookingStatus } from "@/hooks/useUpdateBookingStatus";
import { useAuthStore } from "@/store/authStore";


export default function BookingDetailsPage() {
  const params = useParams();
  const bookingId = params.id as string;

  const cancelBookingMutation = useCancelBooking();
  const updateStatusMutation = useUpdateBookingStatus();
  const user = useAuthStore((state) => state.user);

 
  const {
  data: booking,
  isLoading,
  isError,
} = useBookingById(bookingId);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="mx-auto max-w-4xl px-6 py-12">
          <p className="text-gray-600">
            Loading booking...
          </p>
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
            Failed to load booking.
          </div>
        </div>
      </main>
    );
  }

  if (!booking) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="rounded-xl border bg-white p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Booking not found
            </h1>

            <p className="mt-2 text-gray-600">
              We could not find this booking.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-12">
        <p className="font-semibold text-blue-600">
          BOOKING DETAILS
        </p>

        <h1 className="mt-2 text-4xl font-bold text-gray-900">
          {booking.service.title}
        </h1>

        <div className="mt-8 rounded-xl border bg-white p-8 shadow-sm">

          {/* Status */}
          <div className="flex items-center justify-between border-b pb-6">
            <div>
              <p className="text-sm text-gray-500">
                Booking Status
              </p>

              <span
                className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
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

            <div className="text-right">
              <p className="text-sm text-gray-500">
                Price
              </p>

              <p className="mt-1 text-xl font-bold text-blue-600">
                Tk. {booking.service.price}
              </p>
            </div>
          </div>

          {/* Service */}
          <div className="border-b py-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Service
            </h2>

            <p className="mt-2 text-gray-600">
              {booking.service.description}
            </p>
          </div>

          {/* Schedule */}
          <div className="grid gap-6 border-b py-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">
                Scheduled Date
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {new Date(
                  booking.scheduledAt
                ).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Address
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {booking.address}
              </p>
            </div>
          </div>

          {/* Technician Route */}
          {user?.role === "TECHNICIAN" ? (
  <div className="py-6">
    <h2 className="text-lg font-semibold text-gray-900">
      Customer
    </h2>

    <div className="mt-4 space-y-2 text-gray-600">
      <p>
        <span className="font-medium text-gray-900">
          Name:
        </span>{" "}
        {booking.customer?.name || "Unknown customer"}
      </p>

      <p>
        <span className="font-medium text-gray-900">
          Email:
        </span>{" "}
        {booking.customer?.email || "No email available"}
      </p>
    </div>
  </div>
) : (
  <div className="py-6">
    <h2 className="text-lg font-semibold text-gray-900">
      Technician
    </h2>

    <div className="mt-4 space-y-2 text-gray-600">
      <p>
        <span className="font-medium text-gray-900">
          Name:
        </span>{" "}
        {booking.technician.user.name}
      </p>

      <p>
        <span className="font-medium text-gray-900">
          Location:
        </span>{" "}
        {booking.technician.location}
      </p>

      <p>
        <span className="font-medium text-gray-900">
          Experience:
        </span>{" "}
        {booking.technician.experience} years
      </p>

      <p>
        <span className="font-medium text-gray-900">
          Rating:
        </span>{" "}
        ⭐ {booking.technician.avgRating}
      </p>
    </div>
  </div>
)}


     {user?.role === "TECHNICIAN" ? (
  <div className="border-t pt-6">
    {booking.status === "REQUESTED" && (
      <div className="flex gap-3">
        <button
          onClick={() =>
            updateStatusMutation.mutate({
              bookingId: booking.id,
              status: "ACCEPTED",
            })
          }
          disabled={updateStatusMutation.isPending}
          className="flex-1 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {updateStatusMutation.isPending
            ? "Updating..."
            : "Accept"}
        </button>

        <button
          onClick={() =>
            updateStatusMutation.mutate({
              bookingId: booking.id,
              status: "DECLINED",
            })
          }
          disabled={updateStatusMutation.isPending}
          className="flex-1 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Decline
        </button>
      </div>
    )}

    {booking.status === "ACCEPTED" && (
      <button
        onClick={() =>
          updateStatusMutation.mutate({
            bookingId: booking.id,
            status: "IN_PROGRESS",
          })
        }
        disabled={updateStatusMutation.isPending}
        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {updateStatusMutation.isPending
          ? "Updating..."
          : "Mark In Progress"}
      </button>
    )}

    {booking.status === "IN_PROGRESS" && (
      <button
        onClick={() =>
          updateStatusMutation.mutate({
            bookingId: booking.id,
            status: "COMPLETED",
          })
        }
        disabled={updateStatusMutation.isPending}
        className="w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {updateStatusMutation.isPending
          ? "Updating..."
          : "Mark Completed"}
      </button>
    )}

    {updateStatusMutation.isError && (
      <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-600">
        Failed to update booking status.
      </div>
    )}
  </div>
) : (
  booking.status === "REQUESTED" && (
    <div className="border-t pt-6">
      <button
        onClick={() => {
          cancelBookingMutation.mutate(booking.id);
        }}
        disabled={cancelBookingMutation.isPending}
        className="w-full rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {cancelBookingMutation.isPending
          ? "Cancelling..."
          : "Cancel Booking"}
      </button>

      {cancelBookingMutation.isSuccess && (
        <div className="mt-4 rounded-lg bg-green-50 p-4 text-green-700">
          Booking cancelled successfully!
        </div>
      )}

      {cancelBookingMutation.isError && (
        <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-600">
          Failed to cancel booking. Please try again.
        </div>
      )}
    </div>
  )
)}

        </div>
      </section>
    </main>
  );
}