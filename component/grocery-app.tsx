"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/component/bottom-nav";
import { CartSummary } from "@/component/cart-summary";
import { CategoryNav } from "@/component/category-nav";
import { MobileShopSheet } from "@/component/mobile-shop-sheets";
import { ProductCard } from "@/component/product-card";
import { ProductSkeleton } from "@/component/product-skeleton";
import { SearchBar } from "@/component/search-bar";
import { formatCurrency } from "@/lib/format";
import { categories } from "@/lib/mock-data";
import { ProductCategory, type Product } from "@/lib/types";
import {
  getCartCount,
  getCartSubtotal,
  useCartStore,
} from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";
import { useProductStore } from "@/store/product-store";
import { useUserStore } from "@/store/user-store";

type SidebarView = "browse" | "filters" | "favourites";

export function GroceryApp() {
  const router = useRouter();
  const [activeSheet, setActiveSheet] = useState<
    "cart" | "favourites" | "filters" | "account" | null
  >(null);
  const [sidebarView, setSidebarView] = useState<SidebarView>("browse");

  const products = useProductStore((state) => state.products);
  const activeCategory = useProductStore((state) => state.activeCategory);
  const searchQuery = useProductStore((state) => state.searchQuery);
  const favorites = useProductStore((state) => state.favorites);
  const isLoading = useProductStore((state) => state.isLoading);
  const error = useProductStore((state) => state.error);
  const loadProducts = useProductStore((state) => state.loadProducts);
  const setActiveCategory = useProductStore((state) => state.setActiveCategory);
  const setSearchQuery = useProductStore((state) => state.setSearchQuery);
  const toggleFavorite = useProductStore((state) => state.toggleFavorite);

  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);

  const orderStatus = useCheckoutStore((state) => state.orderStatus);
  const submitOrder = useCheckoutStore((state) => state.submitOrder);
  const resetOrder = useCheckoutStore((state) => state.resetOrder);

  const user = useUserStore((state) => state.user);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const logout = useUserStore((state) => state.logout);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/auth/splash");
      return;
    }
    loadProducts();
  }, [isLoggedIn, loadProducts, router]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === ProductCategory.All ||
        product.category === activeCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, products, searchQuery]);

  const featuredProduct = products.find((product) => product.featured);
  const cartCount = getCartCount(cartItems);
  const subtotal = getCartSubtotal(cartItems);
  const favouriteProducts = products.filter((p) => favorites.includes(p.id));

  const getQuantity = (productId: string) =>
    cartItems.find((item) => item.product.id === productId)?.quantity ?? 0;

  const addCartItemById = (productId: string) => {
    const product =
      products.find((entry) => entry.id === productId) ??
      cartItems.find((item) => item.product.id === productId)?.product;
    if (product) addItem(product);
  };

  const placeOrder = (shouldFail = false) => {
    submitOrder(shouldFail);
    window.setTimeout(() => {
      router.push(
        shouldFail ? "/main/orderplace?status=failure" : "/main/orderplace",
      );
    }, 720);
  };

  const handleLogout = () => {
    logout();
    router.replace("/auth/splash");
  };

  const renderProducts = (items: Product[]) => {
    if (isLoading) {
      return Array.from({ length: 8 }, (_, index) => (
        <ProductSkeleton key={index} />
      ));
    }
    if (error) {
      return (
        <div className="col-span-full rounded-[8px] border border-[#f0c3b7] bg-[#fff0ec] p-5 text-sm font-semibold text-[#b53b25]">
          {error}
        </div>
      );
    }
    if (items.length === 0) {
      return (
        <div className="col-span-full rounded-[8px] border border-[#dfe7d9] bg-white p-6 text-center">
          <p className="text-lg font-black text-[#17211a]">No products found</p>
          <p className="mt-2 text-sm text-[#657160]">
            Try another search term or choose a different category.
          </p>
        </div>
      );
    }
    return items.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        quantity={getQuantity(product.id)}
        isFavorite={favorites.includes(product.id)}
        onAdd={() => addItem(product)}
        onDecrease={() => decreaseItem(product.id)}
        onToggleFavorite={() => toggleFavorite(product.id)}
        onOpen={() => router.push(`/main/product/${product.id}`)}
      />
    ));
  };

  if (!isLoggedIn) return null;

  return (
    <>
      {/* ── Mobile ── */}
      <main className="min-h-screen bg-[#f6f7f2] text-[#17211a] lg:hidden">
        <div className="mx-auto max-w-md px-4 pb-36 pt-4">
          <header className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#e1593f]">Ahoum Fresh</p>
              <h1 className="mt-1 truncate text-lg font-black">
                {user.location}
              </h1>
            </div>
            <button
              className="grid h-11 w-11 shrink-0 place-items-center rounded-[8px] bg-[#315a39] text-sm font-black text-white"
              type="button"
              aria-label="Open profile"
              onClick={() => setActiveSheet("account")}
            >
              A
            </button>
          </header>

          <section className="mt-4 overflow-hidden rounded-[8px] bg-[#51b873] text-white shadow-sm">
            <div className="grid grid-cols-[1fr_112px] gap-3 p-4">
              <div>
                <p className="text-xs font-bold">Exclusive offer</p>
                <h2 className="mt-2 text-2xl font-black leading-tight">
                  Groceries delivered in minutes
                </h2>
                <p className="mt-2 text-sm text-white/85">
                  Fresh picks, daily staples, and bakery favorites.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-[8px] bg-white/20">
                <Image
                  className="h-full w-full object-cover"
                  src="/color_carrot.svg"
                  alt="Fresh grocery offer"
                  fill
                  sizes="112px"
                />
              </div>
            </div>
          </section>

          <div className="mt-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <button
              className="mt-3 h-11 w-full rounded-[8px] border border-[#dbe7d5] bg-white text-sm font-black text-[#315a39]"
              type="button"
              onClick={() => setActiveSheet("filters")}
            >
              Filters
            </button>
          </div>

          <section className="mt-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-black">Categories</h2>
              <button
                className="text-xs font-bold text-[#315a39]"
                type="button"
                onClick={() => setActiveCategory(ProductCategory.All)}
              >
                See all
              </button>
            </div>
            <CategoryNav
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
            />
          </section>

          <section className="mt-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-black">Best selling</h2>
              {featuredProduct ? (
                <p className="text-xs font-bold text-[#657160]">
                  From {formatCurrency(featuredProduct.price)}
                </p>
              ) : null}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {renderProducts(filteredProducts)}
            </div>
          </section>
        </div>

        {cartCount > 0 ? (
          <div className="fixed inset-x-4 bottom-[78px] z-20 mx-auto max-w-md rounded-[8px] bg-[#315a39] p-3 text-white shadow-lg shadow-black/20">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold">
                {cartCount} items | {formatCurrency(subtotal)}
              </p>
              <button
                className="h-9 rounded-[8px] bg-white px-4 text-sm font-black text-[#315a39]"
                type="button"
                onClick={() => setActiveSheet("cart")}
              >
                View cart
              </button>
            </div>
          </div>
        ) : null}

        <BottomNav
          cartCount={cartCount}
          favoriteCount={favorites.length}
          onOpen={(item) => {
            if (item === "shop") return;
            if (item === "explore") {
              setActiveSheet("filters");
              return;
            }
            setActiveSheet(item);
          }}
        />
        <MobileShopSheet
          type={activeSheet}
          products={products}
          cartItems={cartItems}
          favoriteIds={favorites}
          activeCategory={activeCategory}
          user={user}
          onClose={() => setActiveSheet(null)}
          onCategorySelect={setActiveCategory}
          onAdd={addItem}
          onDecrease={decreaseItem}
          onCheckout={() => placeOrder(false)}
          onLogout={handleLogout}
        />
      </main>

      {/* ── Desktop ── */}
      <main className="hidden min-h-screen bg-[#f6f7f2] text-[#17211a] lg:block">
        <div className="mx-auto max-w-7xl px-8 py-8">
          <header className="grid grid-cols-[1fr_minmax(320px,460px)_auto] items-center gap-6">
            <div>
              <p className="text-sm font-bold text-[#e1593f]">Ahoum Fresh</p>
              <h1 className="mt-1 text-3xl font-black">
                Grocery delivery dashboard
              </h1>
              <p className="mt-2 text-sm text-[#657160]">{user.location}</p>
            </div>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <div className="relative">
              <button
                className="h-12 rounded-[8px] bg-[#315a39] px-5 text-sm font-black text-white"
                type="button"
                onClick={() =>
                  setActiveSheet((s) => (s === "account" ? null : "account"))
                }
              >
                Account
              </button>
              {activeSheet === "account" && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setActiveSheet(null)}
                  />
                  <div className="absolute right-0 top-14 z-20 w-64 overflow-hidden rounded-[8px] border border-[#dfe7d9] bg-white shadow-lg shadow-black/10">
                    <div className="border-b border-[#edf0e9] px-4 py-4">
                      <p className="text-sm font-black text-[#17211a]">{user.name}</p>
                      <p className="mt-1 text-xs text-[#657160]">{user.phone}</p>
                      <p className="mt-0.5 text-xs text-[#657160]">{user.location}</p>
                    </div>
                    <div className="px-4 py-3">
                      <button
                        className="h-10 w-full rounded-[8px] bg-[#17211a] text-sm font-black text-white"
                        type="button"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </header>

          <section className="mt-8 grid grid-cols-[250px_1fr_340px] gap-6">
            {/* ── Sidebar ── */}
            <aside className="sticky top-8 h-fit rounded-[8px] border border-[#dfe7d9] bg-white p-4 shadow-sm shadow-black/5">
              {/* Sidebar tab switcher */}
              <div className="mb-4 grid grid-cols-3 overflow-hidden rounded-[8px] border border-[#dfe7d9] text-xs font-black">
                {(["browse", "filters", "favourites"] as SidebarView[]).map(
                  (view) => (
                    <button
                      key={view}
                      type="button"
                      onClick={() => setSidebarView(view)}
                      className={`h-9 capitalize transition-colors ${
                        sidebarView === view
                          ? "bg-[#315a39] text-white"
                          : "bg-white text-[#657160] hover:bg-[#f5f7f1]"
                      }`}
                    >
                      {view === "favourites"
                        ? `Favs${favorites.length > 0 ? ` (${favorites.length})` : ""}`
                        : view.charAt(0).toUpperCase() + view.slice(1)}
                    </button>
                  ),
                )}
              </div>

              {/* Browse: categories */}
              {sidebarView === "browse" && (
                <>
                  <h2 className="mb-4 text-lg font-black">Categories</h2>
                  <CategoryNav
                    activeCategory={activeCategory}
                    onSelect={setActiveCategory}
                    variant="sidebar"
                  />
                </>
              )}

              {/* Filters: categories + brands */}
              {sidebarView === "filters" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 text-base font-black">Categories</h3>
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <label
                          key={category.id}
                          className="flex cursor-pointer items-center gap-3 text-sm text-[#17211a]"
                        >
                          <input
                            className="h-4 w-4 accent-[#53B878]"
                            type="checkbox"
                            checked={activeCategory === category.id}
                            onChange={() => setActiveCategory(category.id)}
                          />
                          {category.label}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 text-base font-black">Brand</h3>
                    <div className="space-y-3">
                      {[
                        "Individual Collection",
                        "Cocola",
                        "Ifad",
                        "Kazi Farmas",
                      ].map((brand) => (
                        <label
                          key={brand}
                          className="flex cursor-pointer items-center gap-3 text-sm text-[#17211a]"
                        >
                          <input
                            className="h-4 w-4 accent-[#53B878]"
                            type="checkbox"
                            defaultChecked={brand === "Cocola"}
                          />
                          {brand}
                        </label>
                      ))}
                    </div>
                  </div>
                  <button
                    className="h-11 w-full rounded-[8px] bg-[#315a39] text-sm font-black text-white"
                    type="button"
                    onClick={() => setSidebarView("browse")}
                  >
                    Apply Filters
                  </button>
                </div>
              )}

              {/* Favourites */}
              {sidebarView === "favourites" && (
                <div className="space-y-3">
                  {favouriteProducts.length === 0 ? (
                    <p className="rounded-[8px] bg-[#f5f7f1] p-4 text-sm text-[#657160]">
                      No favourites yet. Tap the heart on products you like.
                    </p>
                  ) : (
                    <>
                      {favouriteProducts.map((product) => (
                        <div
                          key={product.id}
                          className="grid grid-cols-[40px_1fr_auto] items-center gap-2 border-b border-[#edf0e9] pb-3"
                        >
                          <div className="grid h-10 w-10 place-items-center rounded-[6px] bg-[#f0f4ec] text-[10px] font-bold text-[#315a39]">
                            IMG
                          </div>
                          <div>
                            <p className="text-xs font-black text-[#17211a] leading-tight">
                              {product.name}
                            </p>
                            <p className="mt-0.5 text-[11px] text-[#7a8575]">
                              {product.unit}
                            </p>
                          </div>
                          <p className="text-xs font-black text-[#17211a]">
                            {formatCurrency(product.price)}
                          </p>
                        </div>
                      ))}
                      <button
                        className="mt-2 h-11 w-full rounded-[8px] bg-[#315a39] text-sm font-black text-white"
                        type="button"
                        onClick={() => favouriteProducts.forEach(addItem)}
                      >
                        Add All to Cart
                      </button>
                    </>
                  )}
                </div>
              )}
            </aside>

            {/* Product grid */}
            <section>
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-sm font-bold text-[#315a39]">
                    {filteredProducts.length} products
                  </p>
                  <h2 className="text-2xl font-black">Explore groceries</h2>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {renderProducts(filteredProducts)}
              </div>
            </section>

            {/* Cart summary */}
            <div className="sticky top-8 h-fit">
              <CartSummary
                items={cartItems}
                orderStatus={orderStatus}
                onAdd={addCartItemById}
                onDecrease={decreaseItem}
                onCheckout={() => placeOrder(false)}
                onFailCheckout={() => placeOrder(true)}
                onResetOrder={resetOrder}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}