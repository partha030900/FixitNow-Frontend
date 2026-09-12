export default function TechnicianProfileSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Profile header */}
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="h-24 w-24 shrink-0 rounded-full bg-gray-200" />

          <div className="flex-1">
            <div className="h-4 w-40 rounded bg-gray-200" />

            <div className="mt-3 h-10 w-72 rounded bg-gray-200" />

            <div className="mt-4 flex flex-wrap gap-4">
              <div className="h-5 w-32 rounded bg-gray-200" />
              <div className="h-5 w-28 rounded bg-gray-200" />
              <div className="h-5 w-40 rounded bg-gray-200" />
            </div>

            <div className="mt-6 h-12 w-32 rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {/* About */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="h-7 w-56 rounded bg-gray-200" />

            <div className="mt-5 space-y-3">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-11/12 rounded bg-gray-200" />
              <div className="h-4 w-4/5 rounded bg-gray-200" />
            </div>
          </div>

          {/* Skills */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="h-7 w-24 rounded bg-gray-200" />

            <div className="mt-5 flex flex-wrap gap-3">
              <div className="h-9 w-24 rounded-full bg-gray-200" />
              <div className="h-9 w-32 rounded-full bg-gray-200" />
              <div className="h-9 w-28 rounded-full bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Technician details */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="h-6 w-40 rounded bg-gray-200" />

          <div className="mt-6 space-y-6">
            <div>
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="mt-2 h-5 w-32 rounded bg-gray-200" />
            </div>

            <div>
              <div className="h-4 w-20 rounded bg-gray-200" />
              <div className="mt-2 h-5 w-28 rounded bg-gray-200" />
            </div>

            <div>
              <div className="h-4 w-16 rounded bg-gray-200" />
              <div className="mt-2 h-5 w-24 rounded bg-gray-200" />
            </div>

            <div>
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="mt-2 h-5 w-28 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="mt-8">
        <div className="h-8 w-56 rounded bg-gray-200" />
        <div className="mt-3 h-4 w-72 rounded bg-gray-200" />

        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="h-6 w-24 rounded-full bg-gray-200" />
            <div className="mt-4 h-6 w-48 rounded bg-gray-200" />
            <div className="mt-3 h-4 w-full rounded bg-gray-200" />
            <div className="mt-2 h-4 w-4/5 rounded bg-gray-200" />
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="h-6 w-24 rounded-full bg-gray-200" />
            <div className="mt-4 h-6 w-48 rounded bg-gray-200" />
            <div className="mt-3 h-4 w-full rounded bg-gray-200" />
            <div className="mt-2 h-4 w-4/5 rounded bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <div className="h-8 w-48 rounded bg-gray-200" />
        <div className="mt-3 h-4 w-80 rounded bg-gray-200" />

        <div className="mt-5 space-y-5">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="h-5 w-32 rounded bg-gray-200" />
            <div className="mt-2 h-4 w-24 rounded bg-gray-200" />
            <div className="mt-4 h-4 w-full rounded bg-gray-200" />
            <div className="mt-2 h-4 w-4/5 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}