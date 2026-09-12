export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-5xl px-6 py-12">

        <div className="animate-pulse">

          {/* HEADER */}

          <div className="mb-8">
            <div className="h-4 w-44 rounded bg-gray-200" />

            <div className="mt-3 h-9 w-72 rounded bg-gray-200" />

            <div className="mt-3 h-5 w-full max-w-2xl rounded bg-gray-200" />
          </div>

          {/* AVAILABILITY CARD */}

          <div className="rounded-2xl border bg-white p-8 shadow-sm">

            <div className="h-6 w-48 rounded bg-gray-200" />

            <div className="mt-6 space-y-4">

              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between"
                >

                  {/* DAY */}

                  <div className="h-5 w-28 rounded bg-gray-200" />

                  {/* TIME */}

                  <div className="flex gap-3">

                    <div className="h-10 w-32 rounded-lg bg-gray-200" />

                    <div className="h-10 w-32 rounded-lg bg-gray-200" />

                  </div>

                </div>
              ))}

            </div>

            {/* SAVE BUTTON */}

            <div className="mt-8 h-11 w-36 rounded-lg bg-gray-200" />

          </div>

        </div>

      </section>
    </main>
  );
}