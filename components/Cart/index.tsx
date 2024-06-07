import { formatCurrency } from "@/helpers/price";
import { useCart } from "@/services";
import { CartItem } from "../CartItem";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

export function Cart() {
  const { discount, products, subtotal, total } = useCart();

  console.log(discount, products, subtotal, total);

  return (
    <div className="py-5">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem key={product.id} cartProduct={product} />
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <Card>
          <CardContent className="space-y-2 p-5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Descontos</span>
              <span>- {formatCurrency(discount)}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Entrega</span>
              <span>
                {products.length > 0 &&
                Number(products[0].restaurant.deliveryFee) === 0 ? (
                  <span className="uppercase text-primary">Grátis</span>
                ) : (
                  products.length > 0 &&
                  formatCurrency(Number(products[0].restaurant.deliveryFee))
                )}
              </span>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs font-semibold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </CardContent>
        </Card>

        <Button className="w-full">Finalizar pedido</Button>
      </div>
    </div>
  );
}
