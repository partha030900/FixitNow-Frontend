"use client";

import Navbar from "@/components/Navbar";
import { useServices } from "@/hooks/useServices";

export default function ServicesPage() {
  const {
    data: services = [],
    isLoading,
    isError,
  } = useServices();

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <p className="font-semibold text-blue-600">
            FIXITNOW SERVICES
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Find the right service for your home
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600">
            Browse trusted home services and find qualified technicians
            for your needs.
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-10 rounded-xl border bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="text"
              placeholder="Search services..."
              className="rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />

            <select className="rounded-lg border px-4 py-3 outline-none focus:border-blue-500">
              <option value="">All categories</option>
              <option value="electrical">Electrical</option>
              <option value="plumbing">Plumbing</option>
              <option value="cleaning">Cleaning</option>
            </select>

            <select className="rounded-lg border px-4 py-3 outline-none focus:border-blue-500">
              <option value="">All locations</option>
              <option value="dhaka">Dhaka</option>
              <option value="ctg">Chittagong</option>
            </select>
          </div>
        </div>

        {/* Service cards */}

        {isLoading && (
          <div className="rounded-xl border bg-white p-8 text-center">
            <p className="text-gray-600">
              Loading services...
            </p>
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
            Failed to load services. Please try again.
          </div>
        )}

        {!isLoading && !isError && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
  key={service.id}
  className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
>
  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-xl">
    🔧
  </div>

  <div className="mb-2">
    <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
      {service.category.name}
    </span>
  </div>

  <h2 className="mt-4 text-xl font-semibold text-gray-900">
    {service.title}
  </h2>

  <p className="mt-3 text-gray-600">
    {service.description}
  </p>

  <div className="mt-5 border-t pt-4">
    <p className="text-sm text-gray-500">
      Technician
    </p>

    <p className="font-semibold text-gray-900">
      {service.technician.user.name}
    </p>

    <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
      <span>
        📍 {service.technician.location}
      </span>

      <span>
        ⭐ {service.technician.avgRating}
      </span>
    </div>
  </div>

  <div className="mt-6 flex items-center justify-between">
    <span className="font-semibold text-blue-600">
      Tk. {service.price}
    </span>

    <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
      View Service
    </button>
  </div>
</div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}