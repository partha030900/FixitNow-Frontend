import { api } from "./api";

export interface TechnicianProfile {
  id: string;
  userId: string;
  bio: string;
  experience: number;
  skills: string[];
  hourlyRate: number;
  location: string;
  avgRating: number;
  availability?: any[];
  services?: any[];
}

interface TechnicianProfileResponse {
  success: boolean;
  message: string;
  data: TechnicianProfile;
}

export interface UpdateTechnicianProfileData {
  bio: string;
  experience: number;
  skills: string[];
  hourlyRate: number;
  location: string;
}

export const getMyTechnicianProfile =
  async (): Promise<TechnicianProfile> => {
    const response = await api.get<TechnicianProfileResponse>(
      "/technicians/me/profile"
    );

    return response.data.data;
  };

export const updateMyTechnicianProfile = async (
  data: UpdateTechnicianProfileData
): Promise<TechnicianProfile> => {
  const response =
    await api.put<TechnicianProfileResponse>(
      "/technicians/me/profile",
      data
    );

  return response.data.data;
};

export interface AvailabilitySlot {
  id?: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

interface AvailabilityResponse {
  success: boolean;
  message: string;
  data: unknown;
}

export const updateMyTechnicianAvailability = async (
  slots: AvailabilitySlot[]
) => {
  const response = await api.put<AvailabilityResponse>(
    "/technicians/me/availability",
    {
      slots,
    }
  );

  return response.data.data;
};