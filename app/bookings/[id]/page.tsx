"use client";

import { useParams } from "next/navigation";

import Navbar from "@/components/Navbar";

import { useBookingById } from "@/hooks/useBookingById";
import { useCancelBooking } from "@/hooks/useCancelBooking";
import { useUpdateBookingStatus } from "@/hooks/useUpdateBookingStatus";
import { useCreatePayment } from "@/hooks/useCreatePayment";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { useCreateReview } from "@/hooks/useCreateReview";
import BookingDetailsSkeleton from "@/components/BookingDetailsSkeleton";

export default function BookingDetailsPage() {
  const params = useParams();
  const bookingId = params.id as string;

  const user = useAuthStore((state) => state.user);

  const cancelBookingMutation = useCancelBooking();
  const updateStatusMutation = useUpdateBookingStatus();
  const createPaymentMutation = useCreatePayment();
  const createReviewMutation = useCreateReview();

const [rating, setRating] = useState(5);
const [comment, setComment] = useState("");

  const {
    data: booking,
    isLoading,
    isError,
  } = useBookingById(bookingId);

  {/*Loading state*/}
 if (isLoading) {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-4xl px-6 py-12">
        <BookingDetailsSkeleton />
      </div>
    </main>
  );
}

  /*Error state */
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

  {/*Booking not found*/}
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
        {/* Page heading */}
        <p className="font-semibold text-blue-600">
          BOOKING DETAILS
        </p>

        <h1 className="mt-2 text-4xl font-bold text-gray-900">
          {booking.service.title}
        </h1>

        <div className="mt-8 rounded-xl border bg-white p-8 shadow-sm">

          {/*BOOKING STATUS + PRICE */}

          <div className="flex items-center justify-between border-b pb-6">
            <div>
              <p className="text-sm text-gray-500">
                Booking Status
              </p>

              <span
                className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                  booking.status === "REQUESTED"
                    ? "bg-yellow-100 text-yellow-700"
                    : booking.status === "ACCEPTED"
                    ? "bg-blue-100 text-blue-700"
                    : booking.status === "DECLINED"
                    ? "bg-red-100 text-red-700"
                    : booking.status === "PAID"
                    ? "bg-purple-100 text-purple-700"
                    : booking.status === "IN_PROGRESS"
                    ? "bg-green-100 text-green-700"
                    : booking.status === "COMPLETED"
                    ? "bg-gray-100 text-gray-700"
                    : booking.status === "CANCELLED"
                    ? "bg-red-200 text-red-800"
                    : "bg-gray-100 text-gray-700"
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

          {/* SERVICE*/}

          <div className="border-b py-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Service
            </h2>

            <p className="mt-2 text-gray-600">
              {booking.service.description}
            </p>
          </div>

          {/* SCHEDULE */}

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

          {/* USER-SPECIFIC DETAILS */}

          {user?.role === "TECHNICIAN" ? (
           
           /*Technician sees CUSTOMER information*/
            <div className="py-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Customer
              </h2>

              <div className="mt-4 space-y-2 text-gray-600">
                <p>
                  <span className="font-medium text-gray-900">
                    Name:
                  </span>{" "}
                  {booking.customer?.name ||
                    "Unknown customer"}
                </p>

                <p>
                  <span className="font-medium text-gray-900">
                    Email:
                  </span>{" "}
                  {booking.customer?.email ||
                    "No email available"}
                </p>
              </div>
            </div>
          ) : (
            /*Customer sees TECHNICIAN information*/
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

          {/* ACTIONS */}

          {user?.role === "TECHNICIAN" ? (
            
            /* TECHNICIAN ACTIONS*/
            <div className="border-t pt-6">

              {/* REQUESTED → ACCEPT / DECLINE */}
              {booking.status === "REQUESTED" && (
                <div className="flex gap-3">

                  {/* Accept */}
                  <button
                    onClick={() =>
                      updateStatusMutation.mutate({
                        bookingId: booking.id,
                        status: "ACCEPTED",
                      })
                    }
                    disabled={
                      updateStatusMutation.isPending
                    }
                    className="flex-1 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    {updateStatusMutation.isPending
                      ? "Updating..."
                      : "Accept"}
                  </button>

                  {/* Decline */}
                  <button
                    onClick={() =>
                      updateStatusMutation.mutate({
                        bookingId: booking.id,
                        status: "DECLINED",
                      })
                    }
                    disabled={
                      updateStatusMutation.isPending
                    }
                    className="flex-1 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    {updateStatusMutation.isPending
                      ? "Updating..."
                      : "Decline"}
                  </button>
                </div>
              )}

              {/* PAID → START JOB */}
              {booking.status === "PAID" && (
                <button
                  onClick={() =>
                    updateStatusMutation.mutate({
                      bookingId: booking.id,
                      status: "IN_PROGRESS",
                    })
                  }
                  disabled={
                    updateStatusMutation.isPending
                  }
                  className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {updateStatusMutation.isPending
                    ? "Updating..."
                    : "Mark In Progress"}
                </button>
              )}

              {/* IN_PROGRESS → COMPLETE JOB */}
              {booking.status === "IN_PROGRESS" && (
                <button
                  onClick={() =>
                    updateStatusMutation.mutate({
                      bookingId: booking.id,
                      status: "COMPLETED",
                    })
                  }
                  disabled={
                    updateStatusMutation.isPending
                  }
                  className="w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {updateStatusMutation.isPending
                    ? "Updating..."
                    : "Mark Completed"}
                </button>
              )}

              {/* Status update error */}
              {updateStatusMutation.isError && (
                <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-600">
                  Failed to update booking status.
                </div>
              )}
            </div>
          ) : (
            /* CUSTOMER ACTIONS*/
            <div className="border-t pt-6">

              /* REQUESTED → CANCEL BOOKING*/

              {booking.status === "REQUESTED" && (
                <>
                  <button
                    onClick={() => {
                      cancelBookingMutation.mutate(
                        booking.id
                      );
                    }}
                    disabled={
                      cancelBookingMutation.isPending
                    }
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
                      Failed to cancel booking. Please try
                      again.
                    </div>
                  )}
                </>
              )}

              {/* =====================================================
                  ACCEPTED → PAY NOW
              ===================================================== */}

              {booking.status === "ACCEPTED" && (
                <>
                  <button
                    onClick={() => {
                      createPaymentMutation.mutate(
                        booking.id
                      );
                    }}
                    disabled={
                      createPaymentMutation.isPending
                    }
                    className="w-full rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    {createPaymentMutation.isPending
                      ? "Redirecting to Payment..."
                      : "Pay Now"}
                  </button>

                  {createPaymentMutation.isError && (
                    <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-600">
                      Failed to create payment session.
                      Please try again.
                    </div>
                  )}
                </>
              )}

              {/* =====================================================
                  PAID
              ===================================================== */}

              {booking.status === "PAID" && (
                <div className="rounded-lg bg-purple-50 p-4 text-purple-700">
                  Payment completed successfully.
                </div>
              )}

              {/* IN PROGRESS*/}

              {booking.status === "IN_PROGRESS" && (
                <div className="rounded-lg bg-green-50 p-4 text-green-700">
                  Your service is currently in progress.
                </div>
              )}

              {/* COMPLETED */}

             

{booking.status === "COMPLETED" && (
  <div className="border-t pt-6">

    <div className="rounded-lg bg-gray-50 p-4 text-gray-700">
      This booking has been completed.
    </div>

    {user?.role === "CUSTOMER" && (
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Leave a Review
        </h2>

        <p className="mt-2 text-gray-600">
          How was your experience with this technician?
        </p>

        {/* Rating */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-900">
            Rating
          </label>

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
          >
            <option value={5}>5 - Excellent</option>
            <option value={4}>4 - Very Good</option>
            <option value={3}>3 - Good</option>
            <option value={2}>2 - Fair</option>
            <option value={1}>1 - Poor</option>
          </select>
        </div>

        {/* Comment */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-900">
            Comment
          </label>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            placeholder="Tell us about your experience..."
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
          />
        </div>

        {/* Submit */}
        <button
          onClick={() => {
            createReviewMutation.mutate({
              bookingId: booking.id,
              rating,
              comment,
            });
          }}
          disabled={
            createReviewMutation.isPending ||
            comment.trim().length === 0
          }
          className="mt-4 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {createReviewMutation.isPending
            ? "Submitting..."
            : "Submit Review"}
        </button>

        {createReviewMutation.isSuccess && (
          <div className="mt-4 rounded-lg bg-green-50 p-4 text-green-700">
            Review submitted successfully!
          </div>
        )}

        {createReviewMutation.isError && (
          <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-600">
            Failed to submit review. Please try again.
          </div>
        )}
      </div>
    )}

  </div>
)}

              {/* DECLINED*/}

              {booking.status === "DECLINED" && (
                <div className="rounded-lg bg-red-50 p-4 text-red-700">
                  This booking was declined by the technician.
                </div>
              )}

              {/* CANCELLED */}

              {booking.status === "CANCELLED" && (
                <div className="rounded-lg bg-red-50 p-4 text-red-800">
                  This booking has been cancelled.
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}