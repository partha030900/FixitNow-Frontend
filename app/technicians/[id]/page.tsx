"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useServices } from "@/hooks/useServices";
import { useTechnicianReviews } from "@/hooks/useTechnicianReviews";
import TechnicianProfileSkeleton from "@/components/TechnicianProfileSkeleton";
import ReviewSkeleton from "@/components/ReviewSkeleton";

export default function TechnicianProfilePage() {
  const params = useParams();

  const technicianId = params.id as string;

  {/* SERVICES */}

  const {
    data: services = [],
    isLoading: servicesLoading,
    isError: servicesError,
  } = useServices();

  {/* FIND TECHNICIAN */}

  const technicianServices = services.filter(
    (service) => service.technician.id === technicianId
  );

  const technician =
    technicianServices.length > 0
      ? technicianServices[0].technician
      : null;

  {/* REVIEWS */}

  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useTechnicianReviews(technicianId);

  {/* LOADING */}

  if (servicesLoading) {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <TechnicianProfileSkeleton />
      </section>
    </main>
  );
}

  {/* ERROR */}

  if (servicesError) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />

        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
            Failed to load technician profile.
          </div>
        </section>
      </main>
    );
  }

  {/* TECHNICIAN NOT FOUND */}

  if (!technician) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />

        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-xl border bg-white p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Technician not found
            </h1>

            <p className="mt-2 text-gray-600">
              We could not find a technician with this ID.
            </p>

            <Link
              href="/services"
              className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
            >
              Browse Services
            </Link>
          </div>
        </section>
      </main>
    );
  }

  {/* PAGE */}

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-12">

        {/* PROFILE HEADER */}

        <div className="rounded-2xl border bg-white p-8 shadow-sm">

          <div className="flex flex-col gap-6 md:flex-row md:items-start">

            {/* PROFILE IMAGE PLACEHOLDER */}

            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-blue-100 text-4xl">
              👨‍🔧
            </div>

            {/* PROFILE INFORMATION */}

            <div className="flex-1">

              <p className="font-semibold text-blue-600">
                TECHNICIAN PROFILE
              </p>

              <h1 className="mt-2 text-4xl font-bold text-gray-900">
                {technician.user.name}
              </h1>

              <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">

                <span>
                  📍 {technician.location}
                </span>

                <span>
                  ⭐ {Number(technician.avgRating).toFixed(1)} rating
                </span>

                <span>
                  🛠️ {technician.experience} years experience
                </span>

              </div>

              {/* BOOKING CTA */}

              <div className="mt-6">

                {technicianServices.length > 0 && (
                  <Link
                    href={`/services/${technicianServices[0].id}`}
                    className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Book Now
                  </Link>
                )}

              </div>

            </div>

          </div>

        </div>

        {/* ABOUT */}

        <div className="mt-8 grid gap-8 lg:grid-cols-3">

          <div className="lg:col-span-2">

            <div className="rounded-xl border bg-white p-6 shadow-sm">

              <h2 className="text-2xl font-bold text-gray-900">
                About the Technician
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                {technician.bio ||
                  "This technician has not added a biography yet."}
              </p>

            </div>

            {/* SKILLS */}

            <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">

              <h2 className="text-2xl font-bold text-gray-900">
                Skills
              </h2>

              {technician.skills.length === 0 ? (
                <p className="mt-4 text-gray-600">
                  No skills have been added yet.
                </p>
              ) : (
                <div className="mt-4 flex flex-wrap gap-3">

                  {technician.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600"
                    >
                      {skill}
                    </span>
                  ))}

                </div>
              )}

            </div>

          </div>

          {/* QUICK INFO */}

          <div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">
                Technician Details
              </h2>

              <div className="mt-5 space-y-4">

                <div>
                  <p className="text-sm text-gray-500">
                    Experience
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {technician.experience} years
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Location
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {technician.location}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Rating
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    ⭐{" "}
                    {Number(technician.avgRating).toFixed(1)}
                  </p>
                </div>

                {technician.hourlyRate !== null && (
                  <div>
                    <p className="text-sm text-gray-500">
                      Hourly Rate
                    </p>

                    <p className="mt-1 font-semibold text-blue-600">
                      Tk. {technician.hourlyRate}
                    </p>
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

        {/* SERVICES*/}

        <div className="mt-8">

          <h2 className="text-2xl font-bold text-gray-900">
            Services Offered
          </h2>

          <p className="mt-2 text-gray-600">
            Services provided by this technician.
          </p>

          <div className="mt-5 grid gap-6 md:grid-cols-2">

            {technicianServices.map((service) => (
              <div
                key={service.id}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >

                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                  {service.category.name}
                </span>

                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-3 text-gray-600">
                  {service.description}
                </p>

                <div className="mt-5 flex items-center justify-between">

                  <span className="font-semibold text-blue-600">
                    Tk. {service.price}
                  </span>

                  <Link
                    href={`/services/${service.id}`}
                    className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                  >
                    Book Now
                  </Link>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* REVIEWS*/}

        <div className="mt-10">

          <h2 className="text-2xl font-bold text-gray-900">
            Customer Reviews
          </h2>

          <p className="mt-2 text-gray-600">
            See what previous customers say about this technician.
          </p>

          {reviewsLoading && (
            <div className="mt-5 rounded-xl border bg-white p-6">
            <ReviewSkeleton />
            </div>
          )}

          {reviewsError && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
              Failed to load reviews.
            </div>
          )}

          {!reviewsLoading &&
            !reviewsError &&
            reviews.length === 0 && (
              <div className="mt-5 rounded-xl border bg-white p-6">
                <p className="text-gray-600">
                  No reviews yet.
                </p>
              </div>
            )}

          {!reviewsLoading &&
            !reviewsError &&
            reviews.length > 0 && (
              <div className="mt-5 space-y-5">

                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl border bg-white p-6 shadow-sm"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <p className="font-semibold text-gray-900">
                          {review.customer?.name ||
                            "Customer"}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {new Date(
                            review.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <span className="font-semibold text-yellow-500">
                        {"⭐".repeat(review.rating)}
                      </span>

                    </div>

                    <p className="mt-4 text-gray-600">
                      {review.comment}
                    </p>

                  </div>
                ))}

              </div>
            )}

        </div>

      </section>
    </main>
  );
}