"use client";

import { formatCurrency } from "@/helpers/price";
import { useCart } from "@/services";
import { useSheetCartService } from "@/services/sheetCart";
import { Button } from "../ui/button";

export function CartBanner() {
  const { products, total } = useCart();
  const { showSheetCart } = useSheetCartService();

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-white p-5 pt-3 drop-shadow-lg">
      <div className="flex items-center justify-between">
        {/* PRICE */}
        <div>
          <span className="text-xs text-muted-foreground">
            Total sem entrega
          </span>
          <h3 className="font-semibold">{formatCurrency(total)}</h3>
        </div>
        <Button onClick={showSheetCart}>Ver sacola</Button>
      </div>
    </div>
  );
}
