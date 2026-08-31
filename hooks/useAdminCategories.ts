import { useQuery } from "@tanstack/react-query";

import { getAdminCategories } from "@/lib/admin";

export const useAdminCategories = () => {
  return useQuery({
    queryKey: ["admin-categories"],
    queryFn: getAdminCategories,
  });
};