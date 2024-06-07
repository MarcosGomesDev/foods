"use client";

import { CartService } from "./cartTypes";
import { useCartServiceZustand, useCartZustand } from "./useCartZustand";

export function useCart(): CartService["cart"] {
  return useCartZustand();
}

export function useCartService(): Pick<
  CartService,
  | "addProductToCart"
  | "decreaseProductQuantity"
  | "increaseProductQuantity"
  | "removeProductFromCart"
  | "clearCart"
> {
  return useCartServiceZustand();
}
