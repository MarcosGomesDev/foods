import { createOrder } from "@/actions/order";
import { formatCurrency } from "@/helpers/price";
import { useCart, useCartService, useDialogService } from "@/services";
import { useSheetCartService } from "@/services/sheetCart";
import { OrderStatus } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { CartItem } from "../CartItem";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

export function Cart() {
  const { discounts, products, subtotal, total } = useCart();
  const { clearCart } = useCartService();
  const { data } = useSession();

  const { hideSheetCart } = useSheetCartService();
  const { showDialog } = useDialogService();

  const [isSubmittingLogin, setIsSubmittingLogin] = useState<boolean>(false);

  async function handleFinishOrderClick() {
    if (!data?.user) return;

    const restaurant = products[0].restaurant;

    try {
      setIsSubmittingLogin(true);

      await createOrder({
        total,
        subtotal,
        discounts,
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
        status: OrderStatus.PENDING,
        user: {
          connect: {
            id: data.user.id,
          },
        },
      });
      hideSheetCart();
      clearCart();

      showDialog({
        title: "Pedido Efetuado!",
        message: "Seu pedido foi realizado com sucesso!",
        onConfirm: () => {},
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmittingLogin(false);
    }
  }

  function handleConfirmOrderClick() {
    showDialog({
      title: "Deseja finalizar seu pedido?",
      message:
        "Ao finalizar seu pedido, você concorda com os termos de uso e condições da nossa plataforma.",
      onCancel: () => {},
      onConfirm: () => {
        handleFinishOrderClick();
      },
    });
  }

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
                  <span>- {formatCurrency(discounts)}</span>
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
          <Button
            className="my-4"
            onClick={handleConfirmOrderClick}
            disabled={isSubmittingLogin}
          >
            {isSubmittingLogin ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Finalizar pedido"
            )}
          </Button>
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

          <Button className="mt-6" onClick={hideSheetCart}>
            Voltar às compras
          </Button>
        </div>
      )}
    </div>
  );
}
