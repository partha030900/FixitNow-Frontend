import { useQuery } from "@tanstack/react-query";

import { getMyTechnicianProfile } from "@/lib/technician";

export const useMyTechnicianProfile = () => {
  return useQuery({
    queryKey: ["my-technician-profile"],
    queryFn: getMyTechnicianProfile,
  });
};