"use client";

import { QuantitySelectorService } from "./quantitySelectorTypes";
import {
  useQuantitySelectorServiceZustand,
  useQuantitySelectorZustand,
} from "./useQuantitySelectorZustand";

export function useQuantitySelector(): QuantitySelectorService["quantity"] {
  return useQuantitySelectorZustand();
}

export function useQuantitySelectorService(): Pick<
  QuantitySelectorService,
  "handleIncreaseQuantity" | "handleDecreaseQuantity"
> {
  return useQuantitySelectorServiceZustand();
}
