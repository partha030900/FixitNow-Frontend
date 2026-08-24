"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { api } from "@/lib/api";


export default function ServicesPage() {
  useEffect(() => {
  const testApi = async () => {
    try {
      const response = await api.get("/services");

      console.log("Services API response:", response.data);
    } catch (error) {
      console.error("Services API error:", error);
    }
  };

  testApi();
}, []);
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-xl">
              ⚡
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Electrical Repair
            </h2>

            <p className="mt-3 text-gray-600">
              Professional electrical repair and maintenance services.
            </p>

            <div className="mt-6 flex items-center justify-between">
              <span className="font-semibold text-blue-600">
                From ৳500
              </span>

              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                View Service
              </button>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-xl">
              🔧
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Plumbing
            </h2>

            <p className="mt-3 text-gray-600">
              Reliable plumbing repair and installation services.
            </p>

            <div className="mt-6 flex items-center justify-between">
              <span className="font-semibold text-blue-600">
                From ৳500
              </span>

              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                View Service
              </button>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-xl">
              🧹
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Home Cleaning
            </h2>

            <p className="mt-3 text-gray-600">
              Professional cleaning services for your home.
            </p>

            <div className="mt-6 flex items-center justify-between">
              <span className="font-semibold text-blue-600">
                From ৳500
              </span>

              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                View Service
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}