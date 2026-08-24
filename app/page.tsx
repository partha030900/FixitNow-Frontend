import Link from "next/link";
import Navbar from "@/components/Navbar";
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />



      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="mb-4 font-semibold text-blue-600">
            YOUR TRUSTED HOME SERVICE PLATFORM
          </p>

          <h2 className="text-5xl font-bold leading-tight text-gray-900">
            Find trusted professionals for your home.
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            FixItNow connects you with qualified technicians for
            electrical work, plumbing, cleaning, repairs, and more.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="/services"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Browse Services
            </a>

            <a
              href="/auth/register"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100"
            >
              Create Account
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Why Choose FixItNow?
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border p-6">
              <h3 className="text-xl font-semibold">
                Trusted Technicians
              </h3>

              <p className="mt-3 text-gray-600">
                Find experienced professionals for your home service
                needs.
              </p>
            </div>

            <div className="rounded-xl border p-6">
              <h3 className="text-xl font-semibold">
                Easy Booking
              </h3>

              <p className="mt-3 text-gray-600">
                Choose a service, select a convenient time, and book
                your technician.
              </p>
            </div>

            <div className="rounded-xl border p-6">
              <h3 className="text-xl font-semibold">
                Secure Payment
              </h3>

              <p className="mt-3 text-gray-600">
                Pay securely through Stripe after your booking is
                accepted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <p className="text-center text-sm text-gray-500">
          © 2026 FixItNow. All rights reserved.
        </p>
      </footer>
    </main>
  );
}