export default function BookingDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-32 rounded bg-gray-200" />

      <div className="mt-3 h-10 w-3/4 rounded bg-gray-200" />

      <div className="mt-8 rounded-xl border bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between border-b pb-6">
          <div>
            <div className="h-4 w-28 rounded bg-gray-200" />
            <div className="mt-3 h-6 w-24 rounded-full bg-gray-200" />
          </div>

          <div className="text-right">
            <div className="h-4 w-16 rounded bg-gray-200" />
            <div className="mt-2 h-7 w-24 rounded bg-gray-200" />
          </div>
        </div>

        <div className="border-b py-6">
          <div className="h-5 w-24 rounded bg-gray-200" />
          <div className="mt-3 h-4 w-full rounded bg-gray-200" />
          <div className="mt-2 h-4 w-4/5 rounded bg-gray-200" />
        </div>

        <div className="grid gap-6 border-b py-6 sm:grid-cols-2">
          <div>
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="mt-2 h-5 w-48 rounded bg-gray-200" />
          </div>

          <div>
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="mt-2 h-5 w-56 rounded bg-gray-200" />
          </div>
        </div>

        <div className="py-6">
          <div className="h-5 w-28 rounded bg-gray-200" />

          <div className="mt-4 space-y-3">
            <div className="h-4 w-48 rounded bg-gray-200" />
            <div className="h-4 w-64 rounded bg-gray-200" />
            <div className="h-4 w-40 rounded bg-gray-200" />
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="h-12 w-full rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
}