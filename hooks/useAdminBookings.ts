import { useQuery } from "@tanstack/react-query";

import { getAdminBookings } from "@/lib/admin";

export const useAdminBookings = () => {
  return useQuery({
    queryKey: ["admin-bookings"],
    queryFn: getAdminBookings,
  });
};