import {api} from "./api";

export interface CreatePaymentResponse {
  success: boolean;
  message: string;
  data: {
    checkoutUrl: string;
  };
}

export const createPayment = async (bookingId: string) => {
  const response = await api.post<CreatePaymentResponse>(
    "/payments/create",
    {
      bookingId,
    }
  );

  return response.data.data;
};
export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  provider: string;
  transactionId: string;
  status: string;
  paidAt: string | null;
  createdAt: string;
  booking: {
    service: {
      title: string;
    };
  };
}

export interface PaymentsResponse {
  success: boolean;
  message: string;
  data: Payment[];
}

export const getPayments = async (): Promise<Payment[]> => {
  const response = await api.get<PaymentsResponse>("/payments");

  return response.data.data;
};