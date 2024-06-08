import { formatCurrency } from "@/helpers/price";
import { useCart } from "@/services";
import { useSheetCartService } from "@/services/sheetCart";
import Image from "next/image";
import Link from "next/link";
import { CartItem } from "../CartItem";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

export function Cart() {
  const { discount, products, subtotal, total } = useCart();

  const { hideSheetCart } = useSheetCartService();

  return (
    <div className="flex h-full flex-col py-5">
      {/* Totals */}
      {products.length > 0 ? (
        <>
          <div className="flex-auto space-y-4">
            {products.map((product) => (
              <CartItem key={product.id} cartProduct={product} />
            ))}
          </div>
          <div className="mt-6">
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
                    {Number(products[0].restaurant.deliveryFee) === 0 ? (
                      <span className="uppercase text-primary">Grátis</span>
                    ) : (
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
          </div>
          <Button className="my-4">Finalizar pedido</Button>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center space-y-3">
          <div className="relative flex size-32 items-center justify-center">
            <Image
              src="/empty-bag.png"
              alt="Carrinho vazio"
              fill
              sizes="30vw"
              priority
              className="object-cover drop-shadow-md"
            />
          </div>
          <span className="text-lg text-muted-foreground">
            Seu carrinho está vazio
          </span>

          <Button className="mt-6" asChild>
            <Link href="/" onClick={hideSheetCart}>
              Voltar às compras
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
