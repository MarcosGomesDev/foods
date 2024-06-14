"use client";

import { formatCurrency } from "@/helpers/price";
import { useCart } from "@/services";
import { useSheetCartService } from "@/services/sheetCart";
import { Button } from "../ui/button";

export function CartBanner({ children }: { children: React.ReactNode }) {
  const { products, total } = useCart();
  const { showSheetCart } = useSheetCartService();

  const totalQuantity = products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  return (
    <>
      <div className={`${products.length > 0 ? "pb-24" : "pb-6"}`}>
        {children}
      </div>
      {products.length > 0 && (
        <div className="fixed bottom-0 left-0 z-50 h-20 w-full bg-white p-5 pt-3 drop-shadow-lg">
          <div className="container flex items-center justify-between">
            {/* PRICE */}
            <div>
              <span className="text-xs text-muted-foreground">
                Total sem entrega
              </span>
              <h3 className="font-semibold">
                {formatCurrency(total)}{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  {" "}
                  / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
                </span>
              </h3>
            </div>
            <Button onClick={showSheetCart}>Ver sacola</Button>
          </div>
        </div>
      )}
    </>
  );
}

export function Container({ children }: { children: React.ReactNode }) {
  const { products } = useCart();

  return (
    <div className={`${products.length > 0 ? "pb-24" : "pb-6"}`}>
      {children}
    </div>
  );
}
