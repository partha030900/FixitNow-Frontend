import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updateMyTechnicianAvailability,
  type AvailabilitySlot,
} from "@/lib/technician";

export const useUpdateTechnicianAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slots: AvailabilitySlot[]) =>
      updateMyTechnicianAvailability(slots),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-technician-profile"],
      });
    },

    onError: (error: any) => {
      console.log("STATUS:", error.response?.status);
      console.log(
        "BACKEND RESPONSE:",
        error.response?.data
      );
      console.log(
        "BACKEND MESSAGE:",
        error.response?.data?.message
      );
    },
  });
};