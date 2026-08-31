import { api } from "./api";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "ACTIVE" | "BANNED";
  createdAt: string;
}

interface AdminUsersResponse {
  success: boolean;
  message: string;
  data: AdminUser[];
}

interface UpdateUserStatusResponse {
  success: boolean;
  message: string;
  data: AdminUser;
}

export const getAllUsers = async (
  role?: string
): Promise<AdminUser[]> => {
  const response = await api.get<AdminUsersResponse>(
    "/admin/users",
    {
      params: role ? { role } : undefined,
    }
  );

  return response.data.data;
};

export const updateUserStatus = async (
  id: string,
  status: "ACTIVE" | "BANNED"
): Promise<AdminUser> => {
  const response =
    await api.patch<UpdateUserStatusResponse>(
      `/admin/users/${id}`,
      {
        status,
      }
    );

  return response.data.data;
};
// =====================================================
// ADMIN BOOKINGS
// =====================================================

export interface AdminBooking {
  id: string;
  status: string;
  scheduledAt: string;
  address: string;
  createdAt: string;

  service: {
    id: string;
    title: string;
    description?: string;
    price: number;
  };

  customer: {
    name: string;
    email: string;
  };

  technician: {
    location: string;
    user: {
      name: string;
    };
  };

  payment?: {
    id: string;
    amount: number;
    status: string;
    provider: string;
    paidAt?: string | null;
  } | null;
}

interface AdminBookingsResponse {
  success: boolean;
  message: string;
  data: AdminBooking[];
}

export const getAdminBookings = async (): Promise<
  AdminBooking[]
> => {
  const response =
    await api.get<AdminBookingsResponse>(
      "/admin/bookings"
    );

  return response.data.data;
};


// =====================================================
// ADMIN CATEGORIES
// =====================================================

export interface AdminCategory {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

interface AdminCategoriesResponse {
  success: boolean;
  message: string;
  data: AdminCategory[];
}

interface CreateCategoryResponse {
  success: boolean;
  message: string;
  data: AdminCategory;
}

export const getAdminCategories = async (): Promise<
  AdminCategory[]
> => {
  const response =
    await api.get<AdminCategoriesResponse>(
      "/admin/categories"
    );

  return response.data.data;
};

export const createAdminCategory = async (
  data: {
    name: string;
    description?: string;
  }
): Promise<AdminCategory> => {
  const response =
    await api.post<CreateCategoryResponse>(
      "/admin/categories",
      data
    );

  return response.data.data;
};