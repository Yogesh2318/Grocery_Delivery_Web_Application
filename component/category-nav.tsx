"use client";

import { categories } from "@/lib/mock-data";
import { ProductCategory } from "@/lib/types";

interface CategoryNavProps {
  activeCategory: ProductCategory;
  onSelect: (category: ProductCategory) => void;
  variant?: "chips" | "sidebar";
}

export function CategoryNav({
  activeCategory,
  onSelect,
  variant = "chips",
}: CategoryNavProps) {
  if (variant === "sidebar") {
    return (
      <nav className="space-y-2" aria-label="Product categories">
        {categories.map((category) => {
          const isActive = category.id === activeCategory;

          return (
            <button
              key={category.id}
              className={`flex w-full items-center justify-between rounded-[8px] border px-4 py-3 text-left transition ${
                isActive
                  ? "border-[#315a39] bg-[#eef6e9] text-[#17211a]"
                  : "border-[#e3e7de] bg-white text-[#5f6b5a] hover:border-[#b8c9af]"
              }`}
              type="button"
              onClick={() => onSelect(category.id)}
            >
              <span>
                <span className="block text-sm font-semibold">
                  {category.label}
                </span>
                <span className="block text-xs text-[#7a8575]">
                  {category.description}
                </span>
              </span>
              <span className="text-sm" aria-hidden="true">
                {isActive ? "-" : "+"}
              </span>
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <nav
      className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Product categories"
    >
      {categories.map((category) => {
        const isActive = category.id === activeCategory;

        return (
          <button
            key={category.id}
            className={`h-10 shrink-0 rounded-[8px] border px-4 text-sm font-semibold transition ${
              isActive
                ? "border-[#315a39] bg-[#315a39] text-white"
                : "border-[#dde5d8] bg-white text-[#52604e]"
            }`}
            type="button"
            onClick={() => onSelect(category.id)}
          >
            {category.label}
          </button>
        );
      })}
    </nav>
  );
}
