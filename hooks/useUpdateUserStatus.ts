import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateUserStatus } from "@/lib/admin";

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "ACTIVE" | "BANNED";
    }) => updateUserStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },
  });
};