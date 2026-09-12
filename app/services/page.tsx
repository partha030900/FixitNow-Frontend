"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useServices } from "@/hooks/useServices";
import ServiceCardSkeleton from "@/components/ServiceCardSkeleton";
import Image from "next/image";

export default function ServicesPage() {
  const {
    data: services = [],
    isLoading,
    isError,
  } = useServices();


  {/*FILTER STATE*/ }


  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [minRating, setMinRating] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  {/*GET UNIQUE CATEGORIES*/ }

  const categories = Array.from(
    new Set(
      services.map((service) => service.category.name)
    )
  );

  {/*GET UNIQUE LOCATIONS*/ }

  const locations = Array.from(
    new Set(
      services.map(
        (service) => service.technician.location
      )
    )
  );

  {/*FILTER SERVICES*/ }

  const filteredServices = services.filter((service) => {
    // SEARCH
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      !searchText ||
      service.title
        .toLowerCase()
        .includes(searchText) ||
      service.description
        .toLowerCase()
        .includes(searchText) ||
      service.category.name
        .toLowerCase()
        .includes(searchText) ||
      service.technician.user.name
        .toLowerCase()
        .includes(searchText);

    // CATEGORY
    const matchesCategory =
      !category ||
      service.category.name === category;

    // LOCATION
    const matchesLocation =
      !location ||
      service.technician.location === location;

    // RATING
    const matchesRating =
      !minRating ||
      service.technician.avgRating >=
      Number(minRating);

    // PRICE
    const matchesMinPrice =
      !minPrice ||
      Number(service.price) >= Number(minPrice);

    const matchesMaxPrice =
      !maxPrice ||
      Number(service.price) <= Number(maxPrice);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLocation &&
      matchesRating &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });
  {/* GET TOP-RATED TECHNICIANS */ }

  const topRatedTechnicians = Array.from(
    new Map(
      services.map((service) => [
        service.technician.id,
        service.technician,
      ])
    ).values()
  )
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 3);

  {/* CLEAR FILTERS */ }

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setLocation("");
    setMinRating("");
    setMinPrice("");
    setMaxPrice("");
  };

  {/* PAGE */ }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-12">

        {/* HEADER */}

        <div className="mb-10">
          <p className="font-semibold text-blue-600">
            FIXITNOW SERVICES
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Find the right service for your home
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600">
            Browse trusted home services and find qualified
            technicians for your needs.
          </p>
        </div>

        {/*SEARCH & FILTERS*/}

        <div className="mb-10 rounded-xl border bg-white p-6 shadow-sm">

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

            {/* SEARCH */}

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search services..."
              className="rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />

            {/* CATEGORY */}

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">
                All categories
              </option>

              {categories.map((categoryName) => (
                <option
                  key={categoryName}
                  value={categoryName}
                >
                  {categoryName}
                </option>
              ))}
            </select>

            {/* LOCATION */}

            <select
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              className="rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">
                All locations
              </option>

              {locations.map((locationName) => (
                <option
                  key={locationName}
                  value={locationName}
                >
                  {locationName}
                </option>
              ))}
            </select>

            {/* RATING */}

            <select
              value={minRating}
              onChange={(e) =>
                setMinRating(e.target.value)
              }
              className="rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">
                Any rating
              </option>

              <option value="4">
                ⭐ 4.0+ rating
              </option>

              <option value="3">
                ⭐ 3.0+ rating
              </option>

              <option value="2">
                ⭐ 2.0+ rating
              </option>

              <option value="1">
                ⭐ 1.0+ rating
              </option>
            </select>

            {/* PRICE */}

            {/* MINIMUM PRICE */}

            <select
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">Min price</option>

              <option value="500">Tk. 500+</option>
              <option value="1000">Tk. 1,000+</option>
              <option value="2000">Tk. 2,000+</option>
              <option value="5000">Tk. 5,000+</option>
            </select>

            {/* MAXIMUM PRICE */}

            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">Max price</option>

              <option value="500">Up to Tk. 500</option>
              <option value="1000">Up to Tk. 1,000</option>
              <option value="2000">Up to Tk. 2,000</option>
              <option value="5000">Up to Tk. 5,000</option>
            </select>

          </div>

          {/* FILTER INFORMATION */}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredServices.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {services.length}
              </span>{" "}
              services
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Clear Filters
            </button>

          </div>

        </div>

        {/* LOADING */}

        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ServiceCardSkeleton key={index} />
            ))}
          </div>
        )}

        {/* ERROR*/}

        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
            Failed to load services. Please try again.
          </div>
        )}

        {/* NO RESULTS*/}

        {!isLoading &&
          !isError &&
          filteredServices.length === 0 && (
            <div className="rounded-xl border bg-white p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                No services found
              </h2>

              <p className="mt-2 text-gray-600">
                Try changing your search or filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          )}

        {/* SERVICE CARDS */}

        {!isLoading &&
          !isError &&
          filteredServices.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >

                  {/* SERVICE ICON */}

                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-xl">
                    🔧
                  </div>

                  {/* CATEGORY */}

                  <div className="mb-2">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                      {service.category.name}
                    </span>
                  </div>

                  {/* TITLE */}

                  <h2 className="mt-4 text-xl font-semibold text-gray-900">
                    {service.title}
                  </h2>

                  {/* DESCRIPTION */}

                  <p className="mt-3 text-gray-600">
                    {service.description}
                  </p>

                  {/* TECHNICIAN */}

                  <div className="mt-5 border-t pt-4">

                    <p className="text-sm text-gray-500">
                      Technician
                    </p>

                    <p className="font-semibold text-gray-900">
                      {service.technician.user.name}
                    </p>

                    <div className="mt-2 flex items-center justify-between text-sm text-gray-500">

                      <span>
                        📍{" "}
                        {service.technician.location}
                      </span>

                      <span>
                        ⭐{" "}
                        {service.technician.avgRating}
                      </span>

                    </div>

                  </div>

                  {/* PRICE + DETAILS */}

                  <div className="mt-6 flex items-center justify-between">

                    <span className="font-semibold text-blue-600">
                      Tk. {service.price}
                    </span>

                    <Link
                      href={`/services/${service.id}`}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                    >
                      View Service
                    </Link>

                  </div>

                </div>
              ))}

            </div>
          )}
        {/* TOP-RATED TECHNICIANS */}

        {!isLoading &&
          !isError &&
          topRatedTechnicians.length > 0 && (
            <div className="mt-16">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-semibold text-blue-600">
                    TOP-RATED TECHNICIANS
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    Meet our best technicians
                  </h2>

                  <p className="mt-3 text-gray-600">
                    Browse highly rated professionals and find the right
                    person for your home service needs.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {topRatedTechnicians.map((technician) => (
                  <div
                    key={technician.id}
                    className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >


                    {/* Technician Image */}

                    <Image
                      src="/technician-placeholder.jpg"
                      alt={technician.user.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full object-cover"
                    />

                    {/* Technician Name */}

                    <h3 className="mt-5 text-xl font-semibold text-gray-900">
                      {technician.user.name}
                    </h3>

                    {/* Rating */}

                    <p className="mt-2 font-medium text-gray-700">
                      ⭐ {Number(technician.avgRating).toFixed(1)} / 5.0
                    </p>

                    {/* Location */}

                    <p className="mt-2 text-sm text-gray-500">
                      📍 {technician.location}
                    </p>

                    {/* Experience */}

                    <p className="mt-2 text-sm text-gray-500">
                      🛠️ {technician.experience} years experience
                    </p>

                    {/* Skills */}

                    {technician.skills.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {technician.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* View Profile */}

                    <Link
                      href={`/technicians/${technician.id}`}
                      className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
                    >
                      View Profile
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
      </section>
    </main>
  );
}