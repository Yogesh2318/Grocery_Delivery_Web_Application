"use client";

import { formatCurrency } from "@/lib/format";
import { OrderStatus, type CartItem } from "@/lib/types";
import { getCartSubtotal } from "@/store/cart-store";
import { CheckoutResult } from "@/component/checkout-result";

interface CartSummaryProps {
  items: CartItem[];
  orderStatus: OrderStatus;
  onAdd: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onCheckout: () => void;
  onFailCheckout: () => void;
  onResetOrder: () => void;
  compact?: boolean;
}

const DELIVERY_FEE = 29;

export function CartSummary({
  items,
  orderStatus,
  onAdd,
  onDecrease,
  onCheckout,
  onFailCheckout,
  onResetOrder,
  compact = false,
}: CartSummaryProps) {
  const subtotal = getCartSubtotal(items);
  const total = subtotal > 0 ? subtotal + DELIVERY_FEE : 0;
  const isProcessing = orderStatus === OrderStatus.Processing;

  if (
    orderStatus === OrderStatus.Success ||
    orderStatus === OrderStatus.Failure
  ) {
    return <CheckoutResult status={orderStatus} onReset={onResetOrder} />;
  }

  return (
    <aside className="rounded-[8px] border border-[#dfe7d9] bg-white p-4 shadow-sm shadow-black/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase text-[#315a39]">
            Basket
          </p>
          <h2 className="mt-1 text-xl font-black text-[#17211a]">
            {items.length ? `${items.length} items added` : "Your cart is empty"}
          </h2>
        </div>
        {subtotal > 0 ? (
          <p className="rounded-[8px] bg-[#fff4cf] px-3 py-2 text-sm font-black text-[#745515]">
            {formatCurrency(total)}
          </p>
        ) : null}
      </div>

      {items.length === 0 ? (
        <div className="mt-5 rounded-[8px] bg-[#f5f7f1] p-4 text-sm leading-6 text-[#657160]">
          Add fresh produce, bakery, dairy, or pantry items to see checkout
          details here.
        </div>
      ) : (
        <>
          <div
            className={`mt-5 space-y-3 overflow-y-auto ${
              compact ? "max-h-44" : "max-h-72"
            }`}
          >
            {items.map((item) => (
              <div
                key={item.product.id}
                className="grid grid-cols-[1fr_auto] gap-3 rounded-[8px] bg-[#f8faf5] p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#17211a]">
                    {item.product.name}
                  </p>
                  <p className="mt-1 text-xs text-[#788374]">
                    {item.quantity} x {formatCurrency(item.product.price)}
                  </p>
                </div>
                <div className="grid h-8 w-[88px] grid-cols-3 overflow-hidden rounded-[8px] border border-[#cbd9c3] bg-white text-sm font-bold text-[#315a39]">
                  <button
                    type="button"
                    onClick={() => onDecrease(item.product.id)}
                    aria-label={`Decrease ${item.product.name}`}
                  >
                    -
                  </button>
                  <span className="grid place-items-center border-x border-[#dce7d7]">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onAdd(item.product.id)}
                    aria-label={`Increase ${item.product.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <dl className="mt-5 space-y-2 border-t border-[#e3e8de] pt-4 text-sm">
            <div className="flex justify-between text-[#657160]">
              <dt>Subtotal</dt>
              <dd>{formatCurrency(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-[#657160]">
              <dt>Delivery</dt>
              <dd>{formatCurrency(DELIVERY_FEE)}</dd>
            </div>
            <div className="flex justify-between text-base font-black text-[#17211a]">
              <dt>Total</dt>
              <dd>{formatCurrency(total)}</dd>
            </div>
          </dl>

          <div className="mt-5 grid gap-2">
            <button
              className="h-12 rounded-[8px] bg-[#315a39] text-sm font-black text-white transition hover:bg-[#26462c] disabled:cursor-wait disabled:bg-[#8ca58c]"
              type="button"
              onClick={onCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? "Placing order" : "Checkout"}
            </button>
            <button
              className="h-11 rounded-[8px] border border-[#e7b6a9] bg-[#fff7f4] text-sm font-bold text-[#b53b25] transition hover:bg-[#fff0ec] disabled:cursor-wait disabled:opacity-60"
              type="button"
              onClick={onFailCheckout}
              disabled={isProcessing}
            >
              Simulate failure
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
