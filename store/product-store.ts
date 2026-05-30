"use client";

import { create } from "zustand";
import { products } from "@/lib/mock-data";
import { ProductCategory, type Product } from "@/lib/types";

interface ProductState {
  products: Product[];
  activeCategory: ProductCategory;
  searchQuery: string;
  favorites: string[];
  isLoading: boolean;
  error: string | null;
  loadProducts: () => void;
  setActiveCategory: (category: ProductCategory) => void;
  setSearchQuery: (query: string) => void;
  toggleFavorite: (productId: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  activeCategory: ProductCategory.All,
  searchQuery: "",
  favorites: [],
  isLoading: false,
  error: null,
  loadProducts: () => {
    set({ isLoading: true, error: null });

    window.setTimeout(() => {
      set({ products, isLoading: false });
    }, 550);
  },
  setActiveCategory: (category) => set({ activeCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleFavorite: (productId) =>
    set((state) => ({
      favorites: state.favorites.includes(productId)
        ? state.favorites.filter((id) => id !== productId)
        : [...state.favorites, productId],
    })),
}));
