"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-2xl px-6 py-16">
        <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
          <div className="text-5xl">✅</div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Payment Successful!
          </h1>

          <p className="mt-4 text-gray-600">
            Your payment has been completed successfully.
            Your booking is now being processed.
          </p>

          <Link
            href="/dashboard/customer"
            className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Go to Customer Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}