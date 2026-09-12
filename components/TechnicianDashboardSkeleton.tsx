export default function TechnicianDashboardSkeleton() {
  return (
    <div className="animate-pulse">

      {/* HEADER */}

      <div className="mb-8">
        <div className="h-4 w-40 rounded bg-gray-200" />

        <div className="mt-3 h-9 w-72 rounded bg-gray-200" />

        <div className="mt-3 h-5 w-96 max-w-full rounded bg-gray-200" />
      </div>

      {/* QUICK LINKS */}

      <div className="mb-8 flex flex-wrap gap-4">
        <div className="h-10 w-44 rounded-lg bg-gray-200" />
        <div className="h-10 w-48 rounded-lg bg-gray-200" />
      </div>

      {/* STAT CARDS */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border bg-white p-6"
          >
            <div className="h-4 w-28 rounded bg-gray-200" />

            <div className="mt-3 h-9 w-20 rounded bg-gray-200" />

            <div className="mt-3 h-4 w-36 rounded bg-gray-200" />
          </div>
        ))}

      </div>

      {/* BOOKINGS */}

      <div className="mt-10">

        <div className="h-7 w-48 rounded bg-gray-200" />

        <div className="mt-5 grid gap-6 lg:grid-cols-2">

          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border bg-white p-6"
            >

              {/* SERVICE TITLE */}

              <div className="h-6 w-48 rounded bg-gray-200" />

              {/* CUSTOMER */}

              <div className="mt-5">
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="mt-2 h-5 w-36 rounded bg-gray-200" />
              </div>

              {/* BOOKING INFO */}

              <div className="mt-5 space-y-3">

                <div className="h-4 w-56 rounded bg-gray-200" />

                <div className="h-4 w-64 rounded bg-gray-200" />

                <div className="h-4 w-28 rounded bg-gray-200" />

              </div>

              {/* BUTTONS */}

              <div className="mt-6 flex gap-3 border-t pt-5">

                <div className="h-10 w-28 rounded-lg bg-gray-200" />

                <div className="h-10 w-28 rounded-lg bg-gray-200" />

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* REVIEWS */}

      <div className="mt-10">

        <div className="h-7 w-44 rounded bg-gray-200" />

        <div className="mt-5 space-y-4">

          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border bg-white p-6"
            >
              <div className="h-5 w-32 rounded bg-gray-200" />

              <div className="mt-3 h-4 w-24 rounded bg-gray-200" />

              <div className="mt-4 h-4 w-full rounded bg-gray-200" />

              <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}