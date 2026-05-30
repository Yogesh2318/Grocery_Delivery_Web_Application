"use client";

import { create } from "zustand";
import type { User } from "@/lib/types";

interface UserState {
  user: User;
  isLoggedIn: boolean;
  dummyEmail: string;
  dummyPassword: string;
  signupDraft: {
    name: string;
    email: string;
    password: string;
    phone: string;
    code: string;
  };
  setSignupDraft: (draft: Partial<UserState["signupDraft"]>) => void;
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
  signupDraft: {
    name: "Afsar Hossen Shuvo",
    email: "imshuvo97@gmail.com",
    password: "nectar123",
    phone: "+880",
    code: "",
  },
  setSignupDraft: (draft) =>
    set((state) => ({ signupDraft: { ...state.signupDraft, ...draft } })),
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
