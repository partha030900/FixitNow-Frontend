import { api } from "./api";

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  categoryId: string;
  technicianId: string;
  createdAt: string;
  updatedAt: string;

  category: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
  };

  technician: {
    id: string;
    userId: string;
    bio: string;
    experience: number;
    skills: string[];
    hourlyRate: number | null;
    location: string;
    avgRating: number;
    createdAt: string;
    updatedAt: string;
    user: {
      name: string;
    };
  };
}

interface ServicesResponse {
  success: boolean;
  message: string;
  data: Service[];
}

export const getServices = async (): Promise<Service[]> => {
  const response = await api.get<ServicesResponse>("/services");

  return response.data.data;
};