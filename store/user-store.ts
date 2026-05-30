"use client";

import { create } from "zustand";
import type { User } from "@/lib/types";

interface UserState {
  user: User;
  isLoggedIn: boolean;
  dummyEmail: string;
  dummyPassword: string;
  setLocation: (location: string) => void;
  completeAuth: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: "demo-user",
    name: "Afsar Hossen Shuvo",
    phone: "+91 98765 43210",
    location: "Indiranagar, Bengaluru",
  },
  isLoggedIn: false,
  dummyEmail: "imshuvo97@gmail.com",
  dummyPassword: "nectar123",
  setLocation: (location) =>
    set((state) => ({ user: { ...state.user, location } })),
  completeAuth: (email, password) => {
    const canLogin =
      email.trim().toLowerCase() === "imshuvo97@gmail.com" &&
      password === "nectar123";

    if (canLogin) {
      set({ isLoggedIn: true });
    }

    return canLogin;
  },
  logout: () => set({ isLoggedIn: false }),
}));
