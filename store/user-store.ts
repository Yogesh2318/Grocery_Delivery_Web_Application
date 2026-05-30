"use client";

import { create } from "zustand";
import type { User } from "@/lib/types";

interface UserState {
  user: User;
  isLoggedIn: boolean;
  setLocation: (location: string) => void;
  completeAuth: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: "demo-user",
    name: "Ahoum Guest",
    phone: "+91 98765 43210",
    location: "Indiranagar, Bengaluru",
  },
  isLoggedIn: true,
  setLocation: (location) =>
    set((state) => ({ user: { ...state.user, location } })),
  completeAuth: () => set({ isLoggedIn: true }),
}));
