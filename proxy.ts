import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const role = request.cookies.get("fixitnow-role")?.value;

  // Protect all dashboard routes
  if (pathname.startsWith("/dashboard")) {
    // User is not logged in
    if (!role) {
      return NextResponse.redirect(
        new URL("/auth/login", request.url)
      );
    }

    // Customer trying to access technician/admin dashboard
    if (
      pathname.startsWith("/dashboard/customer") &&
      role !== "CUSTOMER"
    ) {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    // Technician trying to access customer/admin dashboard
    if (
      pathname.startsWith("/dashboard/technician") &&
      role !== "TECHNICIAN"
    ) {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    // Non-admin trying to access admin dashboard
    if (
      pathname.startsWith("/dashboard/admin") &&
      role !== "ADMIN"
    ) {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};