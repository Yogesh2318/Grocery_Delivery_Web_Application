"use client";

import { create } from "zustand";
import type { CartItem, Product } from "@/lib/types";

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  decreaseItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id,
      );

      if (!existingItem) {
        return { items: [...state.items, { product, quantity: 1 }] };
      }

      return {
        items: state.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };
    }),
  decreaseItem: (productId) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    })),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    })),
  clearCart: () => set({ items: [] }),
}));

export const getCartSubtotal = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.product.price * item.quantity, 0);

export const getCartCount = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.quantity, 0);
