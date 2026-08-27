import { api } from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: User;
  };
}

interface MeResponse {
  success: boolean;
  message: string;
  data: User;
}

export const registerUser = async (data: RegisterData) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse["data"]> => {
  const response = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  return response.data.data;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<MeResponse>("/auth/me");

  return response.data.data;
};