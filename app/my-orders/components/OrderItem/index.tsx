"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/price";
import { useCartService } from "@/services";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

function getStatusOrderLabel(status: OrderStatus): string {
  switch (status) {
    case "CANCELED":
      return "Cancelado";
    case "COMPLETED":
      return "Entregue";
    case "CONFIRMED":
      return "Confirmado";
    case "DELIVERING":
      return "Em transporte";
    case "PENDING":
      return "Pendente";
    case "PREPARING":
      return "Preparando";
  }
}

function getStatusOrderColor(status: OrderStatus): string {
  switch (status) {
    case "CANCELED":
      return "bg-[#EA1D2C]";
    case "COMPLETED":
      return "bg-[#323232]";
    case "CONFIRMED":
      return "bg-[#60A5FA]";
    case "DELIVERING":
      return "bg-[#5DC05B]";
    case "PENDING":
      return "bg-[#7E8392]";
    case "PREPARING":
      return "bg-[#FFB100]";
  }
}

export function OrderItem({ order }: OrderItemProps) {
  const { addProductToCart } = useCartService();
  const router = useRouter();

  function handleRedoOrderClick() {
    order.products.forEach((orderProduct) => {
      addProductToCart(
        {
          ...orderProduct.product,
          restaurant: order.restaurant,
        },
        orderProduct.quantity,
      );
    });

    router.push(`/restaurant/${order.restaurant.id}`);
  }

  return (
    <Card>
      <CardContent className="space-y-3 p-5">
        <div
          className={twMerge([
            "w-fit rounded-full px-2 py-1 text-white",
            `${getStatusOrderColor(order.status)}`,
          ])}
        >
          <span className="block text-xs font-semibold">
            {getStatusOrderLabel(order.status)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src={order.restaurant.imageUrl} />
              <AvatarFallback>{order.restaurant.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>

          <Button variant="ghost" className="size-5 p-0">
            <ChevronRightIcon />
          </Button>
        </div>

        <Separator className="my-3" />

        <div className="space-y-2">
          {order.products.map((orderProduct) => (
            <div key={orderProduct.id} className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-full bg-muted-foreground">
                <span className="block text-xs text-white">
                  {orderProduct.quantity}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {orderProduct.product.name}
              </span>
            </div>
          ))}
        </div>

        <Separator className="my-3" />

        <div className="flex items-center justify-between">
          <p className="text-xs">{formatCurrency(Number(order.total))}</p>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-semibold text-primary"
            disabled={order.status !== "COMPLETED"}
            onClick={handleRedoOrderClick}
          >
            Adicionar à sacola
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
