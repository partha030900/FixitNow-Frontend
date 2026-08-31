import { api } from "./api";

export interface CreateReviewData {
  bookingId: string;
  rating: number;
  comment?: string;
}

export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  technicianId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  customer?: {
    name: string;
  };
}

export const createReview = async (data: CreateReviewData) => {
  const response = await api.post("/reviews", data);

  return response.data.data;
};

export const getTechnicianReviews = async (
  technicianId: string
): Promise<Review[]> => {
  const response = await api.get(
    `/reviews/technician/${technicianId}`
  );

  return response.data.data;
};