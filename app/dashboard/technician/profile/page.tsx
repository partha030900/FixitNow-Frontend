"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useMyTechnicianProfile } from "@/hooks/useMyTechnicianProfile";
import { useUpdateTechnicianProfile } from "@/hooks/useUpdateTechnicianProfile";
import { getApiErrorMessage } from "@/lib/error";


export default function TechnicianProfilePage() {
  {/* GET TECHNICIAN PROFILE */ }

  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useMyTechnicianProfile();

  {/* UPDATE PROFILE MUTATION */ }

  const updateProfileMutation =
    useUpdateTechnicianProfile();

  {/* FORM STATE */ }

  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [location, setLocation] = useState("");

  {/* LOAD PROFILE INTO FORM */ }

  useEffect(() => {
    if (!profile) {
      return;
    }

    setBio(profile.bio || "");
    setExperience(
      profile.experience !== undefined
        ? String(profile.experience)
        : ""
    );
    setSkills(
      Array.isArray(profile.skills)
        ? profile.skills.join(", ")
        : ""
    );
    setHourlyRate(
      profile.hourlyRate !== undefined
        ? String(profile.hourlyRate)
        : ""
    );
    setLocation(profile.location || "");
  }, [profile]);

  {/* SUBMIT FORM */ }

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const skillsArray = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    updateProfileMutation.mutate({
      bio,
      experience: Number(experience),
      skills: skillsArray,
      hourlyRate: Number(hourlyRate),
      location,
    });
  };

  {/* LOADING */ }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="mx-auto max-w-4xl px-6 py-12">
          <p className="text-gray-600">
            Loading technician profile...
          </p>
        </div>
      </main>
    );
  }

  {/* ERROR */ }

  if (isError || !profile) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
            {getApiErrorMessage(
              error,
              "Failed to load technician profile. Please try again."
            )}
          </div>
        </div>
      </main>
    );
  }

  {/* PAGE */ }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-12">

        {/* HEADER*/}

        <div className="mb-8">
          <p className="font-semibold text-blue-600">
            TECHNICIAN PROFILE
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Manage Your Profile
          </h1>

          <p className="mt-4 text-gray-600">
            Update your professional information so customers
            can learn more about your services.
          </p>
        </div>

        {/* PROFILE FORM*/}

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border bg-white p-8 shadow-sm"
        >

          {/* BIO*/}

          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-semibold text-gray-900"
            >
              Bio
            </label>

            <textarea
              id="bio"
              value={bio}
              onChange={(e) =>
                setBio(e.target.value)
              }
              rows={5}
              placeholder="Tell customers about yourself and your professional experience..."
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-1 text-sm text-gray-500">
              Describe your experience and the type of
              services you provide.
            </p>
          </div>

          {/* EXPERIENCE + HOURLY RATE */}

          <div className="mt-6 grid gap-6 sm:grid-cols-2">

            {/* EXPERIENCE */}

            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-semibold text-gray-900"
              >
                Experience
              </label>

              <div className="mt-2 flex">
                <input
                  id="experience"
                  type="number"
                  min="0"
                  value={experience}
                  onChange={(e) =>
                    setExperience(e.target.value)
                  }
                  placeholder="5"
                  className="w-full rounded-l-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <span className="flex items-center rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 px-4 text-sm text-gray-500">
                  years
                </span>
              </div>
            </div>

            {/* HOURLY RATE */}

            <div>
              <label
                htmlFor="hourlyRate"
                className="block text-sm font-semibold text-gray-900"
              >
                Hourly Rate
              </label>

              <div className="mt-2 flex">
                <span className="flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-4 text-sm text-gray-500">
                  Tk.
                </span>

                <input
                  id="hourlyRate"
                  type="number"
                  min="0"
                  value={hourlyRate}
                  onChange={(e) =>
                    setHourlyRate(e.target.value)
                  }
                  placeholder="500"
                  className="w-full rounded-r-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

          </div>

          {/* SKILLS */}

          <div className="mt-6">
            <label
              htmlFor="skills"
              className="block text-sm font-semibold text-gray-900"
            >
              Skills
            </label>

            <input
              id="skills"
              type="text"
              value={skills}
              onChange={(e) =>
                setSkills(e.target.value)
              }
              placeholder="Plumbing, Electrical, AC Repair"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-1 text-sm text-gray-500">
              Separate multiple skills with commas.
            </p>

            {/* SKILL PREVIEW */}

            {skills.trim() && (
              <div className="mt-3 flex flex-wrap gap-2">
                {skills
                  .split(",")
                  .map((skill) => skill.trim())
                  .filter(Boolean)
                  .map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            )}
          </div>

          {/* LOCATION*/}

          <div className="mt-6">
            <label
              htmlFor="location"
              className="block text-sm font-semibold text-gray-900"
            >
              Location
            </label>

            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              placeholder="Dhaka"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* CURRENT RATING */}

          <div className="mt-6 rounded-lg bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-500">
              Current Rating
            </p>

            <div className="mt-1 flex items-center gap-2">
              <span className="text-2xl">
                ⭐
              </span>

              <span className="text-xl font-bold text-gray-900">
                {profile.avgRating.toFixed(1)}
              </span>

              <span className="text-sm text-gray-500">
                / 5
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Your rating is calculated from customer reviews.
            </p>
          </div>

          {/* ERROR MESSAGE*/}

          {updateProfileMutation.isError && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {getApiErrorMessage(
                updateProfileMutation.error,
                "Failed to update your profile. Please try again."
              )}
            </div>
          )}
          {/* SUCCESS MESSAGE */}

          {updateProfileMutation.isSuccess && (
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              Profile updated successfully!
            </div>
          )}

          {/* SAVE BUTTON*/}

          <button
            type="submit"
            disabled={updateProfileMutation.isPending}
            className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {updateProfileMutation.isPending
              ? "Saving..."
              : "Save Profile"}
          </button>

        </form>

        {/* PROFILE INFORMATION */}

        <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold text-gray-900">
            Profile Information
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">

            <div>
              <p className="text-sm text-gray-500">
                Technician ID
              </p>

              <p className="mt-1 break-all font-medium text-gray-900">
                {profile.id}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                User ID
              </p>

              <p className="mt-1 break-all font-medium text-gray-900">
                {profile.userId}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Average Rating
              </p>

              <p className="mt-1 font-medium text-gray-900">
                ⭐ {profile.avgRating.toFixed(1)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Services
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {profile.services?.length || 0}
              </p>
            </div>

          </div>

        </div>

      </section>
    </main>
  );
}