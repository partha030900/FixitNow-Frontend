"use client";

import Link from "next/link";

import Navbar from "@/components/Navbar";
import { useServices } from "@/hooks/useServices";

export default function Home() {
  const {
    data: services = [],
    isLoading,
    isError,
  } = useServices();

  const featuredServices = services.slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="mb-4 font-semibold text-blue-600">
            YOUR TRUSTED HOME SERVICE PLATFORM
          </p>

          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            Find trusted professionals for your home.
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            FixItNow connects you with qualified technicians for
            electrical work, plumbing, cleaning, repairs, and more.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/services"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Browse Services
            </Link>

            <Link
              href="/auth/register"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="bg-gray-100 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-semibold text-blue-600">
                FEATURED SERVICES
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Find the right professional for your home
              </h2>
            </div>

            <Link
              href="/services"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              View All Services →
            </Link>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-xl border bg-white p-6 shadow-sm"
                >
                  <div className="h-5 w-24 rounded bg-gray-200" />

                  <div className="mt-5 h-6 w-3/4 rounded bg-gray-200" />

                  <div className="mt-4 h-4 w-full rounded bg-gray-200" />

                  <div className="mt-2 h-4 w-5/6 rounded bg-gray-200" />

                  <div className="mt-6 border-t pt-4">
                    <div className="h-5 w-40 rounded bg-gray-200" />

                    <div className="mt-2 h-4 w-24 rounded bg-gray-200" />
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="h-5 w-32 rounded bg-gray-200" />

                    <div className="h-9 w-16 rounded-lg bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="mt-10 rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
              Failed to load featured services. Please try again later.
            </div>
          )}

          {/* Featured Services */}
          {!isLoading && !isError && (
            <>
              {featuredServices.length === 0 ? (
                <div className="mt-10 rounded-xl border bg-white p-8 text-center">
                  <p className="text-gray-600">
                    No services are currently available.
                  </p>
                </div>
              ) : (
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                  {featuredServices.map((service) => (
                    <div
                      key={service.id}
                      className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                      {/* Category */}
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                        {service.category.name}
                      </span>

                      {/* Service Title */}
                      <h3 className="mt-5 text-xl font-semibold text-gray-900">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-3 line-clamp-3 text-gray-600">
                        {service.description}
                      </p>

                      {/* Technician */}
                      <div className="mt-5 border-t pt-4">
                        <p className="font-medium text-gray-900">
                          👨‍🔧 {service.technician.user.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-600">
                          ⭐{" "}
                          {Number(service.technician.avgRating).toFixed(1)}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          📍 {service.technician.location}
                        </p>
                      </div>

                      {/* Price + Button */}
                      <div className="mt-5 flex items-center justify-between gap-4">
                        <p className="text-lg font-bold text-blue-600">
                          Tk. {service.price}
                        </p>

                        <Link
                          href={`/services/${service.id}`}
                          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Why Choose FixItNow?
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border p-6">
              <h3 className="text-xl font-semibold">
                Trusted Technicians
              </h3>

              <p className="mt-3 text-gray-600">
                Find experienced professionals for your home service
                needs.
              </p>
            </div>

            <div className="rounded-xl border p-6">
              <h3 className="text-xl font-semibold">
                Easy Booking
              </h3>

              <p className="mt-3 text-gray-600">
                Choose a service, select a convenient time, and book
                your technician.
              </p>
            </div>

            <div className="rounded-xl border p-6">
              <h3 className="text-xl font-semibold">
                Secure Payment
              </h3>

              <p className="mt-3 text-gray-600">
                Pay securely through Stripe after your booking is
                accepted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <p className="text-center text-sm text-gray-500">
          © 2026 FixItNow. All rights reserved.
        </p>
      </footer>
    </main>
  );
}