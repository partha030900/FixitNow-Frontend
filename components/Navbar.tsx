"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          FixItNow
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/services"
            className="text-gray-700 hover:text-blue-600"
          >
            Services
          </Link>

          {!user ? (
            <Link
              href="/auth/login"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Login
            </Link>
          ) : (
            <>
             <span className="text-sm text-gray-600">
  Hi, {user.name}
</span>

{user.role === "CUSTOMER" && (
  <Link
    href="/dashboard/customer"
    className="text-gray-700 hover:text-blue-600"
  >
    Dashboard
  </Link>
)}

{user.role === "TECHNICIAN" && (
  <Link
    href="/dashboard/technician"
    className="text-gray-700 hover:text-blue-600"
  >
    Dashboard
  </Link>
)}

{user.role === "ADMIN" && (
  <Link
    href="/dashboard/admin"
    className="text-gray-700 hover:text-blue-600"
  >
    Dashboard
  </Link>
)}

<button
  onClick={handleLogout}
  className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
>
  Logout
</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}