"use client";

interface BottomNavProps {
  cartCount: number;
  favoriteCount: number;
  onOpen: (item: "shop" | "explore" | "cart" | "favourites" | "account") => void;
}

const navItems: Array<{
  id: "shop" | "explore" | "cart" | "favourites" | "account";
  label: string;
}> = [
  { id: "shop", label: "Shop" },
  { id: "explore", label: "Explore" },
  { id: "cart", label: "Cart" },
  { id: "favourites", label: "Favourite" },
  { id: "account", label: "Account" },
];

export function BottomNav({ cartCount, favoriteCount, onOpen }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-[#dfe7d9] bg-white/95 px-5 pb-3 pt-2 backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {navItems.map((item) => {
          const isActive = item.id === "shop";
          const badge =
            item.id === "cart"
              ? cartCount
              : item.id === "favourites"
                ? favoriteCount
                : 0;

          return (
            <button
              key={item.id}
              className={`relative h-12 rounded-[8px] text-xs font-bold transition ${
                isActive
                  ? "bg-[#eef6e9] text-[#315a39]"
                  : "text-[#7a8575] hover:bg-[#f2f5ee]"
              }`}
              type="button"
              onClick={() => onOpen(item.id)}
            >
              {item.label}
              {badge > 0 ? (
                <span className="absolute right-3 top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#e1593f] px-1 text-[10px] text-white">
                  {badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
