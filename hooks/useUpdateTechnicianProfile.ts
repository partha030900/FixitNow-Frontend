import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updateMyTechnicianProfile,
  type UpdateTechnicianProfileData,
} from "@/lib/technician";

export const useUpdateTechnicianProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: UpdateTechnicianProfileData
    ) => updateMyTechnicianProfile(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-technician-profile"],
      });
    },
  });
};