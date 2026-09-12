export default function ServiceCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border bg-white p-6 shadow-sm">

      {/* ICON */}

      <div className="mb-4 h-12 w-12 rounded-lg bg-gray-200" />

      {/* CATEGORY */}

      <div className="mb-4 h-5 w-24 rounded-full bg-gray-200" />

      {/* TITLE */}

      <div className="h-6 w-3/4 rounded bg-gray-200" />

      {/* DESCRIPTION */}

      <div className="mt-4 space-y-2">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
      </div>

      {/* TECHNICIAN */}

      <div className="mt-6 border-t pt-4">

        <div className="h-4 w-20 rounded bg-gray-200" />

        <div className="mt-2 h-5 w-32 rounded bg-gray-200" />

        <div className="mt-3 flex justify-between">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-4 w-12 rounded bg-gray-200" />
        </div>

      </div>

      {/* PRICE + BUTTON */}

      <div className="mt-6 flex items-center justify-between">

        <div className="h-5 w-20 rounded bg-gray-200" />

        <div className="h-10 w-28 rounded-lg bg-gray-200" />

      </div>

    </div>
  );
}