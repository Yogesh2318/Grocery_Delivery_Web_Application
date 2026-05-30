"use client";

import { formatCurrency } from "@/lib/format";
import { categories } from "@/lib/mock-data";
import { ProductCategory, type CartItem, type Product } from "@/lib/types";

type SheetType = "cart" | "favourites" | "filters" | "account";

interface MobileSheetProps {
  type: SheetType | null;
  products: Product[];
  cartItems: CartItem[];
  favoriteIds: string[];
  activeCategory: ProductCategory;
  user: { name: string; phone: string; location: string };
  onClose: () => void;
  onCategorySelect: (category: ProductCategory) => void;
  onAdd: (product: Product) => void;
  onDecrease: (productId: string) => void;
  onCheckout: () => void;
  onLogout: () => void;
}

export function MobileShopSheet({
  type,
  products,
  cartItems,
  favoriteIds,
  activeCategory,
  user,
  onClose,
  onCategorySelect,
  onAdd,
  onDecrease,
  onCheckout,
  onLogout,
}: MobileSheetProps) {
  if (!type) {
    return null;
  }

  const favouriteProducts = products.filter((product) =>
    favoriteIds.includes(product.id),
  );
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="fixed inset-0 z-40 bg-black/35 lg:hidden">
      <section className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-hidden rounded-t-[20px] bg-white shadow-2xl">
        <header className="flex h-16 items-center justify-between border-b border-[#edf0e9] px-5">
          <button
            className="text-2xl font-light text-[#17211a]"
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            x
          </button>
          <h2 className="text-base font-black text-[#17211a]">
            {type === "cart"
              ? "My Cart"
              : type === "favourites"
                ? "Favourite"
                : type === "filters"
                  ? "Filters"
                  : "Account"}
          </h2>
          <span className="w-5" />
        </header>

        <div className="max-h-[calc(88vh-64px)] overflow-y-auto px-5 py-5">
          {type === "cart" ? (
            <div className="space-y-4 pb-24">
              {cartItems.length === 0 ? (
                <p className="rounded-[8px] bg-[#f5f7f1] p-4 text-sm text-[#657160]">
                  Your cart is empty. Add products from the shop.
                </p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="grid grid-cols-[64px_1fr_auto] items-center gap-3 border-b border-[#edf0e9] pb-4"
                  >
                    <div className="grid h-16 w-16 place-items-center rounded-[8px] bg-[#f0f4ec] text-xs font-bold text-[#315a39]">
                      IMG
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#17211a]">
                        {item.product.name}
                      </p>
                      <p className="mt-1 text-xs text-[#7a8575]">
                        {item.product.unit}
                      </p>
                      <div className="mt-3 inline-grid h-9 w-[104px] grid-cols-3 overflow-hidden rounded-[8px] border border-[#d7e3d1] text-sm font-bold">
                        <button
                          type="button"
                          onClick={() => onDecrease(item.product.id)}
                        >
                          -
                        </button>
                        <span className="grid place-items-center">
                          {item.quantity}
                        </span>
                        <button type="button" onClick={() => onAdd(item.product)}>
                          +
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-black text-[#17211a]">
                      {formatCurrency(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))
              )}
              {cartItems.length > 0 ? (
                <button
                  className="fixed inset-x-5 bottom-5 mx-auto grid h-14 max-w-md place-items-center rounded-[16px] bg-[#53B878] text-sm font-black text-white"
                  type="button"
                  onClick={onCheckout}
                >
                  Go to Checkout {formatCurrency(subtotal)}
                </button>
              ) : null}
            </div>
          ) : null}

          {type === "favourites" ? (
            <div className="space-y-4 pb-24">
              {favouriteProducts.length === 0 ? (
                <p className="rounded-[8px] bg-[#f5f7f1] p-4 text-sm text-[#657160]">
                  No favourites yet. Tap Fav on products you like.
                </p>
              ) : (
                favouriteProducts.map((product) => (
                  <div
                    key={product.id}
                    className="grid grid-cols-[48px_1fr_auto] items-center gap-3 border-b border-[#edf0e9] pb-4"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-[8px] bg-[#f0f4ec] text-xs font-bold text-[#315a39]">
                      IMG
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#17211a]">
                        {product.name}
                      </p>
                      <p className="mt-1 text-xs text-[#7a8575]">
                        {product.unit}
                      </p>
                    </div>
                    <p className="text-sm font-black">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                ))
              )}
              {favouriteProducts.length > 0 ? (
                <button
                  className="fixed inset-x-5 bottom-5 mx-auto grid h-14 max-w-md place-items-center rounded-[16px] bg-[#53B878] text-sm font-black text-white"
                  type="button"
                  onClick={() => favouriteProducts.forEach(onAdd)}
                >
                  Add All To Cart
                </button>
              ) : null}
            </div>
          ) : null}

          {type === "filters" ? (
            <div className="space-y-7 pb-24">
              <div>
                <h3 className="text-lg font-black">Categories</h3>
                <div className="mt-4 space-y-3">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center gap-3 text-sm text-[#17211a]"
                    >
                      <input
                        className="h-5 w-5 accent-[#53B878]"
                        type="checkbox"
                        checked={activeCategory === category.id}
                        onChange={() => onCategorySelect(category.id)}
                      />
                      {category.label}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-black">Brand</h3>
                <div className="mt-4 space-y-3">
                  {["Individual Collection", "Cocola", "Ifad", "Kazi Farmas"].map(
                    (brand) => (
                      <label
                        key={brand}
                        className="flex items-center gap-3 text-sm text-[#17211a]"
                      >
                        <input
                          className="h-5 w-5 accent-[#53B878]"
                          type="checkbox"
                          defaultChecked={brand === "Cocola"}
                        />
                        {brand}
                      </label>
                    ),
                  )}
                </div>
              </div>
              <button
                className="fixed inset-x-5 bottom-5 mx-auto grid h-14 max-w-md place-items-center rounded-[16px] bg-[#53B878] text-sm font-black text-white"
                type="button"
                onClick={onClose}
              >
                Apply Filter
              </button>
            </div>
          ) : null}

          {type === "account" ? (
            <div className="space-y-4">
              <div className="rounded-[8px] bg-[#f5f7f1] p-4">
                <p className="text-lg font-black text-[#17211a]">{user.name}</p>
                <p className="mt-2 text-sm text-[#657160]">{user.phone}</p>
                <p className="mt-1 text-sm text-[#657160]">{user.location}</p>
              </div>
              <button
                className="h-12 w-full rounded-[8px] bg-[#17211a] text-sm font-black text-white"
                type="button"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
