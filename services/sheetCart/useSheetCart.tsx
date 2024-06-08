"use client";

import { SheetCartService } from "./sheetCartTypes";
import {
  useSheetCartServiceZustand,
  useSheetCartZustand,
} from "./useSheetCartZustand";

export function useSheetCart(): SheetCartService["sheetCart"] {
  return useSheetCartZustand();
}

export function useSheetCartService(): Pick<
  SheetCartService,
  "showSheetCart" | "hideSheetCart"
> {
  return useSheetCartServiceZustand();
}
