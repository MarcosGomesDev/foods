"use client";

import { useSheetCart, useSheetCartService } from "@/services/sheetCart";
import { Cart } from "../Cart";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

export function SheetCart() {
  const sheetCart = useSheetCart();
  const { hideSheetCart } = useSheetCartService();

  return (
    <Sheet open={sheetCart} onOpenChange={hideSheetCart}>
      <SheetContent className="w-[90vw]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>

        <Cart />
      </SheetContent>
    </Sheet>
  );
}
