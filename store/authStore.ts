import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/lib/auth";

interface AuthState {
  user: User | null;
  accessToken: string | null;

  setAuth: (user: User, accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,

      setAuth: (user, accessToken) => {
        set({
          user,
          accessToken,
        });

        // Store the user's role in a cookie
        // so Next.js middleware can read it.
        if (typeof document !== "undefined") {
          document.cookie = `fixitnow-role=${encodeURIComponent(
            user.role
          )}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        }
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
        });

        // Remove the role cookie
        if (typeof document !== "undefined") {
          document.cookie =
            "fixitnow-role=; path=/; max-age=0; SameSite=Lax";
        }
      },
    }),
    {
      name: "fixitnow-auth",
    }
  )
);