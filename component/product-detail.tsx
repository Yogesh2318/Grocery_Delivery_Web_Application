"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/store/cart-store";
import { useProductStore } from "@/store/product-store";
import { useUserStore } from "@/store/user-store";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const addItem = useCartStore((state) => state.addItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const quantity =
    useCartStore((state) =>
      state.items.find((item) => item.product.id === product.id),
    )?.quantity ?? 0;
  const favorites = useProductStore((state) => state.favorites);
  const toggleFavorite = useProductStore((state) => state.toggleFavorite);
  const isFavorite = favorites.includes(product.id);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/auth/splash");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white text-[#17211a] lg:bg-[#f6f7f2] lg:px-8 lg:py-8">
      <section className="mx-auto min-h-screen max-w-md bg-white lg:grid lg:min-h-[calc(100vh-64px)] lg:max-w-6xl lg:grid-cols-[1fr_0.9fr] lg:overflow-hidden lg:rounded-[8px] lg:border lg:border-[#dfe7d9]">
        <div className="relative h-[300px] bg-[#f5f7f1] lg:h-auto">
          <button
            className="absolute left-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-[8px] bg-white text-2xl shadow-sm"
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
          >
            &lsaquo;
          </button>
          <button
            className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-[8px] bg-white text-sm font-black shadow-sm"
            type="button"
            onClick={() => toggleFavorite(product.id)}
            aria-pressed={isFavorite}
          >
            {isFavorite ? "Fav" : "Fav"}
          </button>
          <Image
            className="object-cover"
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>

        <div className="px-5 py-5 lg:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black lg:text-4xl">
                {product.name}
              </h1>
              <p className="mt-1 text-sm font-semibold text-[#7a8575]">
                {product.unit}
              </p>
            </div>
            <p className="text-xl font-black">{formatCurrency(product.price)}</p>
          </div>

          <div className="mt-7 flex items-center justify-between border-b border-[#edf0e9] pb-6">
            <div className="grid h-10 w-[118px] grid-cols-3 overflow-hidden rounded-[8px] border border-[#d7e3d1] text-sm font-black text-[#53B878]">
              <button type="button" onClick={() => decreaseItem(product.id)}>
                -
              </button>
              <span className="grid place-items-center text-[#17211a]">
                {quantity}
              </span>
              <button type="button" onClick={() => addItem(product)}>
                +
              </button>
            </div>
            <span className="rounded-[8px] bg-[#fff4cf] px-3 py-2 text-sm font-black text-[#745515]">
              Rating {product.rating}
            </span>
          </div>

          <section className="border-b border-[#edf0e9] py-5">
            <h2 className="text-base font-black">Product Detail</h2>
            <p className="mt-3 text-sm leading-6 text-[#657160]">
              Fresh, carefully selected groceries for everyday cooking. This
              product is packed for fast delivery and quality checked before it
              reaches your basket.
            </p>
          </section>

          <section className="grid gap-4 border-b border-[#edf0e9] py-5">
            <div className="flex items-center justify-between">
              <h2 className="font-black">Nutritions</h2>
              <span className="rounded-[8px] bg-[#f1f3ef] px-2 py-1 text-xs">
                100g
              </span>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="font-black">Review</h2>
              <span className="text-sm font-black text-[#e1593f]">
                5 stars
              </span>
            </div>
          </section>

          <button
            className="mt-7 h-14 w-full rounded-[16px] bg-[#53B878] text-sm font-black text-white"
            type="button"
            onClick={() => addItem(product)}
          >
            Add To Basket
          </button>
        </div>
      </section>
    </main>
  );
}
