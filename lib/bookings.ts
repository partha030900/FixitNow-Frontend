import { api } from "./api";

export interface Booking {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  scheduledAt: string;
  status: string;
  address: string;
  createdAt: string;
  updatedAt: string;

  service: {
    id: string;
    title: string;
    description: string;
    price: number;
    categoryId: string;
    technicianId: string;
    createdAt: string;
    updatedAt: string;
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

interface BookingsResponse {
  success: boolean;
  message: string;
  data: Booking[];
}

export const getBookings = async (): Promise<Booking[]> => {
  const response = await api.get<BookingsResponse>("/bookings");

  return response.data.data;
};

export const getBookingById = async (
  id: string
): Promise<Booking> => {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: Booking;
  }>(`/bookings/${id}`);

  return response.data.data;
};

export interface CreateBookingData {
  serviceId: string;
  scheduledAt: string;
  address: string;
}

export const createBooking = async (
  data: CreateBookingData
) => {
  const response = await api.post("/bookings", data);

  return response.data.data;
};