"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/lib/types";
import { QuantityControl } from "@/component/quantity-control";

interface ProductCardProps {
  product: Product;
  quantity: number;
  isFavorite: boolean;
  onAdd: () => void;
  onDecrease: () => void;
  onToggleFavorite: () => void;
  onOpen?: () => void;
}

export function ProductCard({
  product,
  quantity,
  isFavorite,
  onAdd,
  onDecrease,
  onToggleFavorite,
  onOpen,
}: ProductCardProps) {
  return (
    <article
      className="group flex min-h-[260px] cursor-pointer flex-col rounded-[8px] border border-[#e1e7dc] bg-white p-3 shadow-sm shadow-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
      onClick={onOpen}
    >
      <div className="relative aspect-square overflow-hidden rounded-[8px] bg-[#edf2e7]">
        <Image
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 220px, 45vw"
        />
        <button
          className={`absolute right-2 top-2 h-8 rounded-[8px] border px-2 text-xs font-bold shadow-sm ${
            isFavorite
              ? "border-[#e1593f] bg-[#fff1ed] text-[#b53b25]"
              : "border-white/80 bg-white/90 text-[#52604e]"
          }`}
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite();
          }}
          aria-pressed={isFavorite}
        >
          {isFavorite ? "Fav" : "Fav"}
        </button>
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-[15px] font-bold leading-5 text-[#17211a]">
              {product.name}
            </h3>
            <p className="mt-1 text-xs font-medium text-[#788374]">
              {product.unit} | {product.deliveryEta}
            </p>
          </div>
          <span className="shrink-0 rounded-[8px] bg-[#fff4cf] px-2 py-1 text-xs font-bold text-[#745515]">
            {product.rating}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <p className="text-base font-black text-[#17211a]">
            {formatCurrency(product.price)}
          </p>
          <QuantityControl
            quantity={quantity}
            onAdd={(event) => {
              event.stopPropagation();
              onAdd();
            }}
            onDecrease={(event) => {
              event.stopPropagation();
              onDecrease();
            }}
          />
        </div>
      </div>
    </article>
  );
}
