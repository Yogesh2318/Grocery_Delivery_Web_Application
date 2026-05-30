"use client";

import { OrderStatus } from "@/lib/types";

interface CheckoutResultProps {
  status: OrderStatus.Success | OrderStatus.Failure;
  onReset: () => void;
}

export function CheckoutResult({ status, onReset }: CheckoutResultProps) {
  const isSuccess = status === OrderStatus.Success;

  return (
    <section
      className={`rounded-[8px] border p-5 ${
        isSuccess
          ? "border-[#b9d5b0] bg-[#eef8eb]"
          : "border-[#f1c0b3] bg-[#fff0ec]"
      }`}
      aria-live="polite"
    >
      <p
        className={`text-sm font-black uppercase ${
          isSuccess ? "text-[#315a39]" : "text-[#b53b25]"
        }`}
      >
        {isSuccess ? "Order success" : "Order failed"}
      </p>
      <h2 className="mt-2 text-xl font-black text-[#17211a]">
        {isSuccess ? "Fresh groceries are on the way." : "Payment could not finish."}
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#657160]">
        {isSuccess
          ? "Your basket is confirmed and the rider will reach your door soon."
          : "No order was placed. Check the details and try checkout again."}
      </p>
      <button
        className="mt-4 h-11 rounded-[8px] bg-[#17211a] px-5 text-sm font-bold text-white transition hover:bg-[#2f3b31]"
        type="button"
        onClick={onReset}
      >
        Continue shopping
      </button>
    </section>
  );
}
