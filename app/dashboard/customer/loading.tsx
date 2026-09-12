import Navbar from "@/components/Navbar";
import CustomerDashboardSkeleton from "@/components/CustomerDashboardSkeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <CustomerDashboardSkeleton />
      </section>
    </main>
  );
}