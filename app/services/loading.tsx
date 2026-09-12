export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">

      <section className="mx-auto max-w-7xl px-6 py-12">

        {/* HEADER SKELETON */}

        <div className="animate-pulse mb-10">

          <div className="h-5 w-40 rounded bg-gray-200" />

          <div className="mt-4 h-10 w-2/3 rounded bg-gray-200" />

          <div className="mt-4 h-5 w-1/2 rounded bg-gray-200" />

        </div>

        {/* FILTER SKELETON */}

        <div className="mb-10 animate-pulse rounded-xl border bg-white p-6">

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-12 rounded-lg bg-gray-200"
              />
            ))}

          </div>

        </div>

        {/* SERVICE SKELETONS */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-80 animate-pulse rounded-xl border bg-white"
            />
          ))}

        </div>

      </section>

    </main>
  );
}