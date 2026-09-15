"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useBookings } from "@/hooks/useBookings";
import { useUpdateBookingStatus } from "@/hooks/useUpdateBookingStatus";
import { useMyTechnicianProfile } from "@/hooks/useMyTechnicianProfile";
import { useTechnicianReviews } from "@/hooks/useTechnicianReviews";
import { useState } from "react";
import { getApiErrorMessage } from "@/lib/error";

export default function TechnicianDashboardPage() {

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error"
  ) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };


  {/* BOOKINGS */ }

  const {
    data: bookings = [],
    isLoading: bookingsLoading,
    isError: bookingsError,
    error: bookingsErrorMessage,
  } = useBookings();

  {/* TECHNICIAN PROFILE */ }


  const {
    data: technicianProfile,
    isLoading: profileLoading,
    isError: profileError,
    error: profileErrorMessage,
  } = useMyTechnicianProfile();

  {/* UPDATE BOOKING STATUS */ }


  const updateStatusMutation = useUpdateBookingStatus();

  {/* REVIEWS */ }
  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    isError: reviewsError,
    error: reviewsErrorMessage,
  } = useTechnicianReviews(technicianProfile?.id || "");


  {/* LOADING */ }

  if (bookingsLoading || profileLoading) {
    return (
      <main className="min-h-screen bg-gray-50">


        <Navbar />

        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="text-gray-600">
            Loading technician dashboard...
          </p>
        </div>
      </main>
    );
  }

  {/*ERROR */ }

  if (bookingsError || profileError) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
            {getApiErrorMessage(
              bookingsErrorMessage || profileErrorMessage,
              "Failed to load technician dashboard. Please try again."
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {toast && (
        <div
          className={`fixed right-5 top-5 z-50 rounded-lg px-5 py-3 font-semibold text-white shadow-lg ${toast.type === "success"
            ? "bg-green-600"
            : "bg-red-600"
            }`}
        >
          {toast.message}
        </div>
      )}
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-12">

        {/* HEADER */}

        <div>
          <p className="font-semibold text-blue-600">
            TECHNICIAN DASHBOARD
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Customer Requests
          </h1>

          <p className="mt-4 text-gray-600">
            Manage customer bookings and update the status of
            your jobs.
          </p>
        </div>

        {/* QUICK LINKS */}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/dashboard/technician/profile"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Manage Profile
          </Link>

          <Link
            href="/dashboard/technician/availability"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Set Availability
          </Link>
        </div>

        {/* TECHNICIAN STATISTICS */}

        {(() => {
          const pendingRequests = bookings.filter(
            (booking) => booking.status === "REQUESTED"
          ).length;

          const upcomingJobs = bookings.filter(
            (booking) =>
              booking.status === "ACCEPTED" ||
              booking.status === "PAID" ||
              booking.status === "IN_PROGRESS"
          ).length;

          const totalEarnings = bookings.reduce(
            (total, booking) => {
              if (
                booking.status === "COMPLETED" &&
                booking.payment?.status === "COMPLETED"
              ) {
                return (
                  total +
                  Number(booking.payment.amount)
                );
              }

              return total;
            },
            0
          );

          return (
            <div className="mt-8 grid gap-6 md:grid-cols-3">

              {/* PENDING REQUESTS */}

              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">
                  Pending Requests
                </p>

                <p className="mt-2 text-3xl font-bold text-orange-600">
                  {pendingRequests}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Customer requests waiting for your response
                </p>
              </div>

              {/* UPCOMING JOBS */}

              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">
                  Upcoming Jobs
                </p>

                <p className="mt-2 text-3xl font-bold text-blue-600">
                  {upcomingJobs}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Accepted, paid, or in-progress jobs
                </p>
              </div>

              {/* TOTAL EARNINGS */}

              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">
                  Total Earnings
                </p>

                <p className="mt-2 text-3xl font-bold text-green-600">
                  Tk. {totalEarnings.toFixed(2)}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Earnings from completed payments
                </p>
              </div>

            </div>
          );
        })()}

        {/* BOOKINGS */}

        {bookings.length === 0 ? (
          <div className="mt-8 rounded-xl border bg-white p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              No customer requests yet
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

                {/* BOOKING HEADER */}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {booking.service.title}
                    </h2>

                    <p className="mt-2 text-gray-600">
                      Customer:{" "}
                      {booking.customer?.name ||
                        "Unknown customer"}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {booking.customer?.email ||
                        "No email available"}
                    </p>
                  </div>

                  {/* STATUS */}

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${booking.status === "COMPLETED"
                      ? "bg-gray-100 text-gray-700"
                      : booking.status === "IN_PROGRESS"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "PAID"
                          ? "bg-purple-100 text-purple-700"
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

                {/*BOOKING INFORMATION */}

                <div className="mt-6 space-y-3 text-sm text-gray-600">

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

                {/*ACTIONS*/}

                <div className="mt-6 flex flex-wrap gap-3 border-t pt-5">

                  {/* VIEW DETAILS */}

                  <Link
                    href={`/bookings/${booking.id}`}
                    className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    View Details
                  </Link>

                  {/* REQUESTED */}

                  {booking.status === "REQUESTED" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatusMutation.mutate(
                            {
                              bookingId: booking.id,
                              status: "ACCEPTED",
                            },
                            {
                              onSuccess: () => {
                                showToast(
                                  "Booking accepted successfully",
                                  "success"
                                );
                              },
                              onError: (error) => {
                                showToast(
                                  getApiErrorMessage(
                                    error,
                                    "Failed to accept booking. Please try again."
                                  ),
                                  "error"
                                );
                              },
                            }
                          )
                        }
                        disabled={
                          updateStatusMutation.isPending
                        }
                        className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {updateStatusMutation.isPending
                          ? "Updating..."
                          : "Accept"}
                      </button>

                      <button
                        onClick={() =>
                          updateStatusMutation.mutate(
                            {
                              bookingId: booking.id,
                              status: "DECLINED",
                            },
                            {
                              onSuccess: () => {
                                showToast(
                                  "Booking declined successfully",
                                  "success"
                                );
                              },
                              onError: (error) => {
                                showToast(
                                  getApiErrorMessage(
                                    error,
                                    "Failed to decline booking. Please try again."
                                  ),
                                  "error"
                                );
                              },
                            }
                          )
                        }
                        disabled={
                          updateStatusMutation.isPending
                        }
                        className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {updateStatusMutation.isPending
                          ? "Updating..."
                          : "Decline"}
                      </button>
                    </>
                  )}



                  {/* PAID */}

                  {booking.status === "PAID" && (
                    <button
                      onClick={() =>
                        updateStatusMutation.mutate(
                          {
                            bookingId: booking.id,
                            status: "IN_PROGRESS",
                          },
                          {
                            onSuccess: () => {
                              showToast(
                                "Job started successfully",
                                "success"
                              );
                            },
                            onError: (error) => {
                              showToast(
                                getApiErrorMessage(
                                  error,
                                  "Failed to start job. Please try again."
                                ),
                                "error"
                              );
                            },
                          }
                        )
                      }
                      disabled={
                        updateStatusMutation.isPending
                      }
                      className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {updateStatusMutation.isPending
                        ? "Updating..."
                        : "Start Job"}
                    </button>
                  )}

                  {/* IN PROGRESS */}

                  {booking.status === "IN_PROGRESS" && (
                    <button
                      onClick={() =>
                        updateStatusMutation.mutate(
                          {
                            bookingId: booking.id,
                            status: "COMPLETED",
                          },
                          {
                            onSuccess: () => {
                              showToast(
                                "Job completed successfully",
                                "success"
                              );
                            },
                            onError: () => {
                              showToast(
                                "Failed to complete job",
                                "error"
                              );
                            },
                          }
                        )
                      }
                      disabled={
                        updateStatusMutation.isPending
                      }
                      className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {updateStatusMutation.isPending
                        ? "Updating..."
                        : "Mark Completed"}
                    </button>
                  )}

                </div>



              </div>
            ))}
          </div>
        )}

        {/* CUSTOMER REVIEWS*/}

        <div className="mt-12">

          <p className="font-semibold text-blue-600">
            CUSTOMER REVIEWS
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            Reviews from Customers
          </h2>

          <p className="mt-2 text-gray-600">
            See what customers have said about your services.
          </p>

          {reviewsLoading && (
            <div className="mt-6 rounded-xl border bg-white p-6">
              <p className="text-gray-600">
                Loading reviews...
              </p>
            </div>
          )}

          {reviewsError && (
            <p className="text-red-500">
              {getApiErrorMessage(
                reviewsErrorMessage,
                "Failed to load reviews. Please try again."
              )}
            </p>
          )}
          {!reviewsLoading &&
            !reviewsError &&
            reviews.length === 0 && (
              <div className="mt-6 rounded-xl border bg-white p-6">
                <p className="text-gray-600">
                  You don't have any customer reviews yet.
                </p>
              </div>
            )}

          {!reviewsLoading &&
            !reviewsError &&
            reviews.length > 0 && (
              <div className="mt-6 grid gap-6 md:grid-cols-2">

                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl border bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {review.customer?.name ||
                            "Customer"}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {new Date(
                            review.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <div
                        className="text-lg"
                        aria-label={`${review.rating} out of 5 stars`}
                      >
                        {"⭐".repeat(review.rating)}
                      </div>

                    </div>

                    <div className="mt-4 rounded-lg bg-gray-50 p-4">
                      <p className="text-gray-700">
                        {review.comment ||
                          "No comment provided."}
                      </p>
                    </div>
                  </div>
                ))}

              </div>
            )}

        </div>

      </section>
    </main>
  );
}