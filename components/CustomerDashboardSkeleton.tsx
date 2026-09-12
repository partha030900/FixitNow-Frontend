export default function CustomerDashboardSkeleton() {
  return (
    <div className="animate-pulse">

      {/* HEADER */}

      <div className="mb-10">
        <div className="h-4 w-40 rounded bg-gray-200" />

        <div className="mt-3 h-9 w-64 rounded bg-gray-200" />

        <div className="mt-3 h-5 w-96 max-w-full rounded bg-gray-200" />
      </div>

      {/* BOOKINGS */}

      <div className="space-y-6">

        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border bg-white p-6 shadow-sm"
          >

            {/* TITLE + STATUS */}

            <div className="flex items-start justify-between gap-4">

              <div className="flex-1">
                <div className="h-6 w-56 rounded bg-gray-200" />

                <div className="mt-3 h-4 w-full max-w-xl rounded bg-gray-200" />

                <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
              </div>

              <div className="h-6 w-24 rounded-full bg-gray-200" />

            </div>

            {/* BOOKING INFORMATION */}

            <div className="mt-6 grid gap-5 sm:grid-cols-2">

              {Array.from({ length: 4 }).map((_, infoIndex) => (
                <div key={infoIndex}>
                  <div className="h-4 w-24 rounded bg-gray-200" />
                  <div className="mt-2 h-5 w-36 rounded bg-gray-200" />
                </div>
              ))}

            </div>

            {/* ACTIONS */}

            <div className="mt-6 flex flex-wrap gap-3 border-t pt-4">

              <div className="h-10 w-28 rounded-lg bg-gray-200" />

              <div className="h-10 w-24 rounded-lg bg-gray-200" />

              <div className="h-10 w-32 rounded-lg bg-gray-200" />

            </div>

          </div>
        ))}

      </div>

      {/* PAYMENT HISTORY */}

      <div className="mt-12">

        <div className="h-7 w-48 rounded bg-gray-200" />

        <div className="mt-3 h-5 w-96 max-w-full rounded bg-gray-200" />

        <div className="mt-6 overflow-hidden rounded-xl border bg-white">

          {/* TABLE HEADER */}

          <div className="grid grid-cols-5 gap-4 border-b bg-gray-50 px-6 py-4">

            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-4 rounded bg-gray-200"
              />
            ))}

          </div>

          {/* TABLE ROWS */}

          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-4 border-b px-6 py-5 last:border-b-0"
            >

              {Array.from({ length: 5 }).map((_, cellIndex) => (
                <div
                  key={cellIndex}
                  className="h-4 rounded bg-gray-200"
                />
              ))}

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}