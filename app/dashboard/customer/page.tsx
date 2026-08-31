"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useBookings } from "@/hooks/useBookings";
import { useCreatePayment } from "@/hooks/useCreatePayment";
import { usePayments } from "@/hooks/usePayments";

export default function CustomerDashboard() {
  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useBookings();
  
  const {
  data: payments = [],
  isLoading: paymentsLoading,
  isError: paymentsError,
} = usePayments();

  const createPaymentMutation = useCreatePayment();

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

        {/* Loading */}
        {isLoading && (
          <div className="rounded-xl border bg-white p-8 text-center">
            <p className="text-gray-600">
              Loading bookings...
            </p>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
            Failed to load bookings. Please try again.
          </div>
        )}

        {/* No bookings */}
        {!isLoading && !isError && bookings.length === 0 && (
          <div className="rounded-xl border bg-white p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              No bookings yet
            </h2>

            <p className="mt-2 text-gray-600">
              Browse our services and book a technician.
            </p>

            <Link
              href="/services"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
            >
              Browse Services
            </Link>
          </div>
        )}

        {/* Bookings */}
        {!isLoading && !isError && bookings.length > 0 && (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {booking.service.title}
                    </h2>

                    <p className="mt-2 text-gray-600">
                      {booking.service.description}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      booking.status === "COMPLETED"
                        ? "bg-gray-100 text-gray-700"
                        : booking.status === "IN_PROGRESS"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "PAID"
                        ? "bg-purple-100 text-purple-700"
                        : booking.status === "ACCEPTED"
                        ? "bg-blue-100 text-blue-700"
                        : booking.status === "DECLINED"
                        ? "bg-red-100 text-red-700"
                        : booking.status === "CANCELLED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                {/* Booking Information */}
                <div className="mt-6 grid gap-4 text-sm text-gray-600 sm:grid-cols-2">
                  <div>
                    <p className="font-medium text-gray-900">
                      Scheduled
                    </p>

                    <p>
                      {new Date(
                        booking.scheduledAt
                      ).toLocaleString()}
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

                    <p>
                      {booking.technician.user.name}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-gray-900">
                      Location
                    </p>

                    <p>
                      {booking.technician.location}
                    </p>
                  </div>
                </div>

                {/* Price + Actions */}
                <div className="mt-6 flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-semibold text-blue-600">
                    Tk. {booking.service.price}
                  </span>

                  <div className="flex flex-wrap gap-3">
                    {/* View Details */}
                    <Link
                      href={`/bookings/${booking.id}`}
                      className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      View Details
                    </Link>

                    {/* Pay Now */}
                    {booking.status === "ACCEPTED" && (
                      <button
                        onClick={() =>
                          createPaymentMutation.mutate(
                            booking.id
                          )
                        }
                        disabled={
                          createPaymentMutation.isPending
                        }
                        className="rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {createPaymentMutation.isPending
                          ? "Redirecting..."
                          : "Pay Now"}
                      </button>
                    )}

                    {/* Payment Completed */}
                    {booking.status === "PAID" && (
                      <span className="rounded-lg bg-purple-100 px-4 py-2 font-semibold text-purple-700">
                        Payment Completed
                      </span>
                    )}

                    {/* In Progress */}
                    {booking.status === "IN_PROGRESS" && (
                      <span className="rounded-lg bg-green-100 px-4 py-2 font-semibold text-green-700">
                        Job In Progress
                      </span>
                    )}

                    {/* Completed */}
                    {booking.status === "COMPLETED" && (
                      <span className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-700">
                        Job Completed
                      </span>
                    )}

                    {/* Declined */}
                    {booking.status === "DECLINED" && (
                      <span className="rounded-lg bg-red-100 px-4 py-2 font-semibold text-red-700">
                        Booking Declined
                      </span>
                    )}

                    {/* Cancelled */}
                    {booking.status === "CANCELLED" && (
                      <span className="rounded-lg bg-red-100 px-4 py-2 font-semibold text-red-700">
                        Booking Cancelled
                      </span>
                    )}
                  </div>
                </div>

                {/* Payment Error */}
                {createPaymentMutation.isError && (
                  <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                    Failed to create payment session. Please try again.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="mt-12">
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-900">
      Payment History
    </h2>

    <p className="mt-2 text-gray-600">
      View your previous payments and transaction details.
    </p>
  </div>

  {paymentsLoading && (
    <div className="rounded-xl border bg-white p-8 text-center">
      <p className="text-gray-600">
        Loading payment history...
      </p>
    </div>
  )}

  {paymentsError && (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
      Failed to load payment history.
    </div>
  )}

  {!paymentsLoading && !paymentsError && payments.length === 0 && (
    <div className="rounded-xl border bg-white p-8 text-center">
      <h3 className="text-lg font-semibold text-gray-900">
        No payments yet
      </h3>

      <p className="mt-2 text-gray-600">
        Your completed payments will appear here.
      </p>
    </div>
  )}

  {!paymentsLoading && !paymentsError && payments.length > 0 && (
    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
      <table className="w-full text-left">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-900">
              Service
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-gray-900">
              Amount
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-gray-900">
              Provider
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-gray-900">
              Status
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-gray-900">
              Payment Date
            </th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="px-6 py-4 font-medium text-gray-900">
                {payment.booking.service.title}
              </td>

              <td className="px-6 py-4 text-gray-600">
                Tk. {payment.amount}
              </td>

              <td className="px-6 py-4 text-gray-600">
                {payment.provider}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    payment.status === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : payment.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {payment.status}
                </span>
              </td>

              <td className="px-6 py-4 text-gray-600">
                {payment.paidAt
                  ? new Date(payment.paidAt).toLocaleString()
                  : "Not paid yet"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
      </section>
    </main>
  );
}