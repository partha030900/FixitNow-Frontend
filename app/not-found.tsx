import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-lg rounded-2xl border bg-white p-8 text-center shadow-sm">
        <div className="text-7xl font-bold text-blue-600">
          404
        </div>

        <h1 className="mt-5 text-2xl font-bold text-gray-900">
          Page Not Found
        </h1>

        <p className="mt-3 text-gray-600">
          Sorry, the page you are looking for does not exist
          or may have been moved.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
