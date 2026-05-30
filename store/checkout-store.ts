"use client";

import { create } from "zustand";
import { OrderStatus } from "@/lib/types";

interface CheckoutState {
  orderStatus: OrderStatus;
  submitOrder: (shouldFail?: boolean) => void;
  resetOrder: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  orderStatus: OrderStatus.Idle,
  submitOrder: (shouldFail = false) => {
    set({ orderStatus: OrderStatus.Processing });

    window.setTimeout(() => {
      set({
        orderStatus: shouldFail ? OrderStatus.Failure : OrderStatus.Success,
      });
    }, 700);
  },
  resetOrder: () => set({ orderStatus: OrderStatus.Idle }),
}));
