"use client";

import { useEffect } from "react";

export default function ServicesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gray-50">

      <section className="mx-auto max-w-3xl px-6 py-20">

        <div className="rounded-2xl border border-red-200 bg-white p-10 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl">
            ⚠️
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Unable to load services
          </h1>

          <p className="mt-3 text-gray-600">
            Something went wrong while loading the services.
            Please try again.
          </p>

          <button
            type="button"
            onClick={() => reset()}
            className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Try Again
          </button>

        </div>

      </section>

    </main>
  );
}