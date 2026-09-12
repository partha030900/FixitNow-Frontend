"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

import { useMyTechnicianProfile } from "@/hooks/useMyTechnicianProfile";
import { useUpdateTechnicianAvailability } from "@/hooks/useUpdateTechnicianAvailability";
import type { AvailabilitySlot } from "@/lib/technician";

const days = [
  { name: "MONDAY", value: 0 },
  { name: "TUESDAY", value: 1 },
  { name: "WEDNESDAY", value: 2 },
  { name: "THURSDAY", value: 3 },
  { name: "FRIDAY", value: 4 },
  { name: "SATURDAY", value: 5 },
  { name: "SUNDAY", value: 6 },
];

interface DaySchedule {
  enabled: boolean;
  startTime: string;
  endTime: string;
}

const defaultSchedule: Record<string, DaySchedule> = {
  MONDAY: {
    enabled: false,
    startTime: "09:00",
    endTime: "17:00",
  },
  TUESDAY: {
    enabled: false,
    startTime: "09:00",
    endTime: "17:00",
  },
  WEDNESDAY: {
    enabled: false,
    startTime: "09:00",
    endTime: "17:00",
  },
  THURSDAY: {
    enabled: false,
    startTime: "09:00",
    endTime: "17:00",
  },
  FRIDAY: {
    enabled: false,
    startTime: "09:00",
    endTime: "17:00",
  },
  SATURDAY: {
    enabled: false,
    startTime: "09:00",
    endTime: "17:00",
  },
  SUNDAY: {
    enabled: false,
    startTime: "09:00",
    endTime: "17:00",
  },
};

export default function TechnicianAvailabilityPage() {
  const {
    data: profile,
    isLoading,
    isError,
  } = useMyTechnicianProfile();

  const updateAvailabilityMutation =
    useUpdateTechnicianAvailability();

  const [schedule, setSchedule] =
    useState<Record<string, DaySchedule>>(
      defaultSchedule
    );

  
  {/*LOAD EXISTING AVAILABILITY*/}

  useEffect(() => {
    if (!profile?.availability) {
      return;
    }

    const existingSchedule: Record<
      string,
      DaySchedule
    > = {
      MONDAY: {
        enabled: false,
        startTime: "09:00",
        endTime: "17:00",
      },
      TUESDAY: {
        enabled: false,
        startTime: "09:00",
        endTime: "17:00",
      },
      WEDNESDAY: {
        enabled: false,
        startTime: "09:00",
        endTime: "17:00",
      },
      THURSDAY: {
        enabled: false,
        startTime: "09:00",
        endTime: "17:00",
      },
      FRIDAY: {
        enabled: false,
        startTime: "09:00",
        endTime: "17:00",
      },
      SATURDAY: {
        enabled: false,
        startTime: "09:00",
        endTime: "17:00",
      },
      SUNDAY: {
        enabled: false,
        startTime: "09:00",
        endTime: "17:00",
      },
    };

    const dayNames = [
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ];

    profile.availability.forEach((slot: any) => {
      const dayName = dayNames[slot.dayOfWeek];

      if (dayName) {
        existingSchedule[dayName] = {
          enabled: true,
          startTime: slot.startTime,
          endTime: slot.endTime,
        };
      }
    });

    setSchedule(existingSchedule);
  }, [profile]);

  //  UPDATE ONE DAY //
  

  const updateDay = (
    dayName: string,
    field: keyof DaySchedule,
    value: boolean | string
  ) => {
    setSchedule((previous) => ({
      ...previous,

      [dayName]: {
        ...previous[dayName],
        [field]: value,
      },
    }));
  };

  {/*SAVE AVAILABILITY*/}

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const slots: AvailabilitySlot[] = days
      .filter(
        (day) => schedule[day.name].enabled
      )
      .map((day) => ({
        dayOfWeek: day.value,
        startTime:
          schedule[day.name].startTime,
        endTime:
          schedule[day.name].endTime,
      }));

    updateAvailabilityMutation.mutate(slots);
  };

  {/*LOADING*/}

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="mx-auto max-w-4xl px-6 py-12">
          <p className="text-gray-600">
            Loading availability...
          </p>
        </div>
      </main>
    );
  }

  {/*ERROR*/}

  if (isError || !profile) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
            Failed to load technician profile.
          </div>
        </div>
      </main>
    );
  }

  {/*PAGE*/}
  

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-12">

        {/* HEADER */}

        <div className="mb-8">
          <p className="font-semibold text-blue-600">
            TECHNICIAN AVAILABILITY
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Set Your Working Hours
          </h1>

          <p className="mt-4 text-gray-600">
            Choose the days and times when
            customers can book your services.
          </p>
        </div>

        {/* SCHEDULER */}

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border bg-white p-8 shadow-sm"
        >
          <div className="space-y-4">

            {days.map((day) => {
              const daySchedule =
                schedule[day.name];

              return (
                <div
                  key={day.name}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    {/* DAY */}

                    <div className="flex items-center gap-3">

                      <input
                        type="checkbox"
                        checked={
                          daySchedule.enabled
                        }
                        onChange={(e) =>
                          updateDay(
                            day.name,
                            "enabled",
                            e.target.checked
                          )
                        }
                        className="h-5 w-5 rounded border-gray-300 text-blue-600"
                      />

                      <span className="font-semibold text-gray-900">
                        {day.name.charAt(0) +
                          day.name
                            .slice(1)
                            .toLowerCase()}
                      </span>

                    </div>

                    {/* TIME INPUTS */}

                    {daySchedule.enabled ? (
                      <div className="flex flex-wrap items-center gap-4">

                        {/* START */}

                        <div className="flex items-center gap-2">

                          <label
                            htmlFor={`${day.name}-start`}
                            className="text-sm text-gray-500"
                          >
                            From
                          </label>

                          <input
                            id={`${day.name}-start`}
                            type="time"
                            value={
                              daySchedule.startTime
                            }
                            onChange={(e) =>
                              updateDay(
                                day.name,
                                "startTime",
                                e.target.value
                              )
                            }
                            className="rounded-lg border border-gray-300 px-3 py-2"
                          />

                        </div>

                        {/* END */}

                        <div className="flex items-center gap-2">

                          <label
                            htmlFor={`${day.name}-end`}
                            className="text-sm text-gray-500"
                          >
                            To
                          </label>

                          <input
                            id={`${day.name}-end`}
                            type="time"
                            value={
                              daySchedule.endTime
                            }
                            onChange={(e) =>
                              updateDay(
                                day.name,
                                "endTime",
                                e.target.value
                              )
                            }
                            className="rounded-lg border border-gray-300 px-3 py-2"
                          />

                        </div>

                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">
                        Unavailable
                      </span>
                    )}

                  </div>
                </div>
              );
            })}

          </div>

          {/* ERROR */}

          {updateAvailabilityMutation.isError && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              Failed to update availability.
              Please check your working hours and
              try again.
            </div>
          )}

          {/* SUCCESS */}

          {updateAvailabilityMutation.isSuccess && (
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              Availability updated successfully!
            </div>
          )}

          {/* SAVE */}

          <button
            type="submit"
            disabled={
              updateAvailabilityMutation.isPending
            }
            className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {updateAvailabilityMutation.isPending
              ? "Saving..."
              : "Save Availability"}
          </button>

        </form>

      </section>
    </main>
  );
}