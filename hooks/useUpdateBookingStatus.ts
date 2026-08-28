import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  updateBookingStatus,
  type UpdateBookingStatusData,
} from "@/lib/bookings";

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateBookingStatusData) =>
      updateBookingStatus(data),

    onSuccess: (_, variables) => {
  queryClient.invalidateQueries({
    queryKey: ["bookings"],
  });

  queryClient.invalidateQueries({
    queryKey: ["booking", variables.bookingId],
  });
},
  });
};