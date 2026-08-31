"use client";

import { FormEvent, useState } from "react";
import Navbar from "@/components/Navbar";

import { useAdminCategories } from "@/hooks/useAdminCategories";
import { useCreateAdminCategory } from "@/hooks/useCreateAdminCategory";

export default function AdminCategoriesPage() {
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useAdminCategories();

  const createCategoryMutation =
    useCreateAdminCategory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      return;
    }

    createCategoryMutation.mutate(
      {
        name: trimmedName,
        description: trimmedDescription || undefined,
      },
      {
        onSuccess: () => {
          setName("");
          setDescription("");
        },
      }
    );
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-12">
        {/* HEADER */}

        <div className="mb-10">
          <p className="font-semibold text-blue-600">
            ADMIN DASHBOARD
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Category Management
          </h1>

          <p className="mt-4 text-gray-600">
            Create and manage the service categories available
            on FixItNow.
          </p>
        </div>

        {/* CREATE CATEGORY */}

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            Create Category
          </h2>

          <p className="mt-2 text-gray-600">
            Add a new category for home services.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >
            {/* NAME */}

            <div>
              <label
                htmlFor="category-name"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Category Name
              </label>

              <input
                id="category-name"
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="e.g. Plumbing"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <label
                htmlFor="category-description"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Description
              </label>

              <textarea
                id="category-description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Describe this service category..."
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* ERROR */}

            {createCategoryMutation.isError && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                Failed to create category. Please try again.
              </div>
            )}

            {/* SUCCESS */}

            {createCategoryMutation.isSuccess && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                Category created successfully.
              </div>
            )}

            {/* BUTTON */}

            <button
              type="submit"
              disabled={
                createCategoryMutation.isPending ||
                !name.trim()
              }
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {createCategoryMutation.isPending
                ? "Creating..."
                : "Create Category"}
            </button>
          </form>
        </div>

        {/* CATEGORY LIST */}

        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Existing Categories
            </h2>

            <p className="mt-2 text-gray-600">
              View all service categories currently available.
            </p>
          </div>

          {/* LOADING */}

          {isLoading && (
            <div className="rounded-xl border bg-white p-10 text-center">
              <p className="text-gray-600">
                Loading categories...
              </p>
            </div>
          )}

          {/* ERROR */}

          {isError && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
              Failed to load categories. Please try again.
            </div>
          )}

          {/* EMPTY */}

          {!isLoading &&
            !isError &&
            categories.length === 0 && (
              <div className="rounded-xl border bg-white p-10 text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  No categories found
                </h3>

                <p className="mt-2 text-gray-600">
                  Create your first service category above.
                </p>
              </div>
            )}

          {/* CATEGORY TABLE */}

          {!isLoading &&
            !isError &&
            categories.length > 0 && (
              <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
                <table className="w-full text-left">
                  <thead className="border-b bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-900">
                        Name
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-gray-900">
                        Description
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-gray-900">
                        Created
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {categories.map((category) => (
                      <tr key={category.id}>
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                            {category.name}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          {category.description ||
                            "No description"}
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          {new Date(
                            category.createdAt
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
        </div>
      </section>
    </main>
  );
}