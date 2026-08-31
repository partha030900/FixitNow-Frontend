import { useQuery } from "@tanstack/react-query";

import { getAllUsers } from "@/lib/admin";

export const useAdminUsers = (role?: string) => {
  return useQuery({
    queryKey: ["admin-users", role],
    queryFn: () => getAllUsers(role),
  });
};