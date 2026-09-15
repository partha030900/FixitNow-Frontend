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
  });
};