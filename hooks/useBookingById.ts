import { useQuery } from "@tanstack/react-query";

import { getBookingById } from "@/lib/bookings";

export const useBookingById = (id: string) => {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBookingById(id),
    enabled: !!id,
  });
};