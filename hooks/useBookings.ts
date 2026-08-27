import { getBookings } from "@/lib/bookings";
import { useQuery } from "@tanstack/react-query";


export const useBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });
};