import { useMutation } from "@tanstack/react-query";
import { createBooking } from "@/lib/bookings";

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: createBooking,
  });
};