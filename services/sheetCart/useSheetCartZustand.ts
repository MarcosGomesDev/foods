"use client";

import { create } from "zustand";
import { SheetCartService } from "./sheetCartTypes";

const sheetCartStore = create<SheetCartService>((set) => ({
  sheetCart: false,
  showSheetCart: () =>
    set({
      sheetCart: true,
    }),
  hideSheetCart: () =>
    set({
      sheetCart: false,
    }),
}));

export function useSheetCartZustand(): SheetCartService["sheetCart"] {
  return sheetCartStore((state) => state.sheetCart);
}

export function useSheetCartServiceZustand(): Pick<
  SheetCartService,
  "showSheetCart" | "hideSheetCart"
> {
  const showSheetCart = sheetCartStore((state) => state.showSheetCart);
  const hideSheetCart = sheetCartStore((state) => state.hideSheetCart);

  return {
    showSheetCart,
    hideSheetCart,
  };
}
