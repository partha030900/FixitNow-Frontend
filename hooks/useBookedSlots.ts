import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const useBookedSlots = (
  technicianId: string,
  date: string
) => {
  return useQuery({
    queryKey: ["booked-slots", technicianId, date],
    queryFn: async () => {
      const response = await api.get(
        `/bookings/technician/${technicianId}/slots`,
        {
          params: { date },
        }
      );

      return response.data.data as string[];
    },
    enabled: Boolean(technicianId && date),
  });
};