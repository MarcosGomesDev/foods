"use client";

import { create } from "zustand";
import { QuantitySelectorService } from "./quantitySelectorTypes";

const quantitySelectorStore = create<QuantitySelectorService>((set) => ({
  quantity: 1,
  handleIncreaseQuantity: () =>
    set((state) => ({ quantity: state.quantity + 1 })),
  handleDecreaseQuantity: () => {
    set((state) => {
      if (state.quantity === 1) return state;
      return { quantity: state.quantity - 1 };
    });
  },
}));

export function useQuantitySelectorZustand(): QuantitySelectorService["quantity"] {
  return quantitySelectorStore((state) => state.quantity);
}

export function useQuantitySelectorServiceZustand(): Pick<
  QuantitySelectorService,
  "handleIncreaseQuantity" | "handleDecreaseQuantity"
> {
  const handleIncreaseQuantity = quantitySelectorStore(
    (state) => state.handleIncreaseQuantity,
  );
  const handleDecreaseQuantity = quantitySelectorStore(
    (state) => state.handleDecreaseQuantity,
  );

  return {
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };
}
