"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useBookings } from "@/hooks/useBookings";
import { useUpdateBookingStatus } from "@/hooks/useUpdateBookingStatus";

export default function TechnicianDashboardPage() {
  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useBookings();

  const updateStatusMutation = useUpdateBookingStatus();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="text-gray-600">
            Loading bookings...
          </p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
            Failed to load bookings.
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <p className="font-semibold text-blue-600">
          TECHNICIAN DASHBOARD
        </p>

        <h1 className="mt-2 text-4xl font-bold text-gray-900">
          My Bookings
        </h1>

        <p className="mt-4 text-gray-600">
          Manage your customer bookings and update their status.
        </p>

        {bookings.length === 0 ? (
          <div className="mt-8 rounded-xl border bg-white p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              No bookings yet
            </h2>

            <p className="mt-2 text-gray-600">
              You don't have any bookings at the moment.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
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
                      Customer: {booking.customer?.name || "Unknown customer"}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {booking.customer?.email}
                    </p>
                  </div>

                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                    {booking.status}
                  </span>
                </div>

                <div className="mt-6 space-y-3 text-sm">
                  <p>
                    <span className="font-medium text-gray-900">
                      Scheduled:
                    </span>{" "}
                    {new Date(
                      booking.scheduledAt
                    ).toLocaleString()}
                  </p>

                  <p>
                    <span className="font-medium text-gray-900">
                      Address:
                    </span>{" "}
                    {booking.address}
                  </p>

                  <p>
                    <span className="font-medium text-gray-900">
                      Price:
                    </span>{" "}
                    Tk. {booking.service.price}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3 border-t pt-5">
                  <Link
                    href={`/bookings/${booking.id}`}
                    className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    View Details
                  </Link>
                  {booking.status === "REQUESTED" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatusMutation.mutate({
                            bookingId: booking.id,
                            status: "ACCEPTED",
                          })
                        }
                        disabled={updateStatusMutation.isPending}
                        className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          updateStatusMutation.mutate({
                            bookingId: booking.id,
                            status: "DECLINED",
                          })
                        }
                        disabled={updateStatusMutation.isPending}
                        className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Decline
                      </button>
                    </>
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
                      className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Mark In Progress
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
                      className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Mark Completed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}