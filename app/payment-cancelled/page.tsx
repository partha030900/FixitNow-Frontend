import Link from "next/link";

export default function PaymentCancelledPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-xl px-6 py-20">
        <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
          <div className="text-5xl">❌</div>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Payment Cancelled
          </h1>

          <p className="mt-3 text-gray-600">
            Your payment was cancelled. No payment was completed.
          </p>

          <Link
            href="/dashboard/customer"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}