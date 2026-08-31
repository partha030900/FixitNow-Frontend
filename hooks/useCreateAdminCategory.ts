import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdminCategory } from "@/lib/admin";

export const useCreateAdminCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAdminCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-categories"],
      });
    },
  });
};