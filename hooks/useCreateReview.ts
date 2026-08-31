import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createReview } from "@/lib/review";

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["booking", variables.bookingId],
      });

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
};