import { useQuery } from "@tanstack/react-query";

import { getTechnicianReviews } from "@/lib/review";

export const useTechnicianReviews = (
  technicianId: string
) => {
  return useQuery({
    queryKey: ["technician-reviews", technicianId],
    queryFn: () => getTechnicianReviews(technicianId),
    enabled: !!technicianId,
  });
};