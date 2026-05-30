"use client";

import type { MouseEvent } from "react";

interface QuantityControlProps {
  quantity: number;
  onAdd: (event: MouseEvent<HTMLButtonElement>) => void;
  onDecrease: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function QuantityControl({
  quantity,
  onAdd,
  onDecrease,
}: QuantityControlProps) {
  if (quantity === 0) {
    return (
      <button
        className="h-9 rounded-[8px] bg-[#315a39] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#26462c]"
        type="button"
        onClick={onAdd}
      >
        Add
      </button>
    );
  }

  return (
    <div className="grid h-9 w-[104px] grid-cols-3 overflow-hidden rounded-[8px] border border-[#315a39] bg-white text-sm font-bold text-[#315a39]">
      <button
        className="grid place-items-center transition hover:bg-[#eef6e9]"
        type="button"
        onClick={onDecrease}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="grid place-items-center border-x border-[#d3dfce]">
        {quantity}
      </span>
      <button
        className="grid place-items-center transition hover:bg-[#eef6e9]"
        type="button"
        onClick={onAdd}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
