import { useQuery } from "@tanstack/react-query";

import { getPayments } from "@/lib/payment";

export const usePayments = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
  });
};