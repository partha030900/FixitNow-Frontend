import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/lib/services";

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });
};