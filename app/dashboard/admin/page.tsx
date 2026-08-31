"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";

import { useAdminUsers } from "@/hooks/useAdminUsers";
import { useUpdateUserStatus } from "@/hooks/useUpdateUserStatus";

export default function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const {
    data: users = [],
    isLoading,
    isError,
  } = useAdminUsers(roleFilter || undefined);

  const updateUserStatusMutation =
    useUpdateUserStatus();

  /*
   * SEARCH USERS
   */

  const filteredUsers = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return users;
    }

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue)
    );
  }, [users, search]);

  /*
   * STATISTICS
   */

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "ACTIVE"
  ).length;

  const bannedUsers = users.filter(
    (user) => user.status === "BANNED"
  ).length;

  const customers = users.filter(
    (user) => user.role === "CUSTOMER"
  ).length;

  const technicians = users.filter(
    (user) => user.role === "TECHNICIAN"
  ).length;

  /*
   * BAN / UNBAN
   */

  const handleStatusChange = (
    id: string,
    currentStatus: "ACTIVE" | "BANNED"
  ) => {
    const newStatus =
      currentStatus === "ACTIVE"
        ? "BANNED"
        : "ACTIVE";

    updateUserStatusMutation.mutate({
      id,
      status: newStatus,
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-12">

        {/* HEADER */}

        <div className="mb-10">
          <p className="font-semibold text-blue-600">
            ADMIN DASHBOARD
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Platform Overview
          </h1>

          <p className="mt-4 text-gray-600">
            Monitor users and manage the FixItNow platform.
          </p>
        </div>

        {/* STATISTICS */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Users
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {totalUsers}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Active Users
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {activeUsers}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Banned Users
            </p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              {bannedUsers}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Customers
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {customers}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Technicians
            </p>

            <p className="mt-2 text-3xl font-bold text-purple-600">
              {technicians}
            </p>
          </div>

        </div>

        {/* USER MANAGEMENT */}

        <div className="mt-12">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              User Management
            </h2>

            <p className="mt-2 text-gray-600">
              View users and manage their account status.
            </p>
          </div>

          {/* FILTERS */}

          <div className="mb-6 flex flex-col gap-4 rounded-xl border bg-white p-5 sm:flex-row">

            {/* SEARCH */}

            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 sm:flex-1"
            />

            {/* ROLE FILTER */}

            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(e.target.value)
              }
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">
                All Roles
              </option>

              <option value="CUSTOMER">
                Customers
              </option>

              <option value="TECHNICIAN">
                Technicians
              </option>

              <option value="ADMIN">
                Admins
              </option>
            </select>

          </div>

          {/* LOADING */}

          {isLoading && (
            <div className="rounded-xl border bg-white p-10 text-center">
              <p className="text-gray-600">
                Loading users...
              </p>
            </div>
          )}

          {/* ERROR */}

          {isError && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
              Failed to load users. Please try again.
            </div>
          )}

          {/* USERS */}

          {!isLoading &&
            !isError &&
            filteredUsers.length === 0 && (
              <div className="rounded-xl border bg-white p-10 text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  No users found
                </h3>

                <p className="mt-2 text-gray-600">
                  Try changing your search or filter.
                </p>
              </div>
            )}

          {!isLoading &&
            !isError &&
            filteredUsers.length > 0 && (
              <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">

                <table className="w-full text-left">

                  <thead className="border-b bg-gray-50">
                    <tr>

                      <th className="px-6 py-4 text-sm font-semibold text-gray-900">
                        Name
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-gray-900">
                        Email
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-gray-900">
                        Role
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-gray-900">
                        Status
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-gray-900">
                        Joined
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-gray-900">
                        Action
                      </th>

                    </tr>
                  </thead>

                  <tbody className="divide-y">

                    {filteredUsers.map((user) => (
                      <tr key={user.id}>

                        <td className="px-6 py-4 font-medium text-gray-900">
                          {user.name}
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          {user.email}
                        </td>

                        <td className="px-6 py-4">

                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            {user.role}
                          </span>

                        </td>

                        <td className="px-6 py-4">

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              user.status === "ACTIVE"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {user.status}
                          </span>

                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          {new Date(
                            user.createdAt
                          ).toLocaleDateString()}
                        </td>

                        <td className="px-6 py-4">

                          {user.role === "ADMIN" ? (
                            <span className="text-sm text-gray-400">
                              Protected
                            </span>
                          ) : (
                            <button
                              onClick={() =>
                                handleStatusChange(
                                  user.id,
                                  user.status
                                )
                              }
                              disabled={
                                updateUserStatusMutation.isPending
                              }
                              className={`rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 ${
                                user.status === "ACTIVE"
                                  ? "bg-red-600 hover:bg-red-700"
                                  : "bg-green-600 hover:bg-green-700"
                              }`}
                            >
                              {user.status === "ACTIVE"
                                ? "Ban"
                                : "Unban"}
                            </button>
                          )}

                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>
            )}

          {/* UPDATE ERROR */}

          {updateUserStatusMutation.isError && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              Failed to update user status. Please try again.
            </div>
          )}

          {/* UPDATE SUCCESS */}

          {updateUserStatusMutation.isSuccess && (
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              User status updated successfully.
            </div>
          )}

        </div>

      </section>
    </main>
  );
}