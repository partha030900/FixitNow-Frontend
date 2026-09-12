export default function ReviewSkeleton() {
  return (
    <div className="animate-pulse space-y-5">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="h-5 w-32 rounded bg-gray-200" />

        <div className="mt-2 h-4 w-24 rounded bg-gray-200" />

        <div className="mt-4 h-4 w-full rounded bg-gray-200" />
        <div className="mt-2 h-4 w-4/5 rounded bg-gray-200" />
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="h-5 w-28 rounded bg-gray-200" />

        <div className="mt-2 h-4 w-24 rounded bg-gray-200" />

        <div className="mt-4 h-4 w-full rounded bg-gray-200" />
        <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
      </div>
    </div>
  );
}