import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cancelBooking } from "@/lib/bookings";

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBooking,

    onSuccess: (_, bookingId) => {
      queryClient.invalidateQueries({
        queryKey: ["booking", bookingId],
      });

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
};