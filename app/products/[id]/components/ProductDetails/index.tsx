"use client";

import { DiscountBadge } from "@/components/DiscountBadge";
import { ProductList } from "@/components/ProductList";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { calculateProductTotalPrice, formatCurrency } from "@/helpers/price";
import { Prisma } from "@prisma/client";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: { restaurant: true };
  }>;
  suggestedProducts: Prisma.ProductGetPayload<{
    include: { restaurant: true };
  }>[];
}

export function ProductDetails({
  product,
  suggestedProducts,
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState<number>(1);

  function handleIncreaseQuantityClick(): void {
    setQuantity((prev) => prev + 1);
  }

  function handleDecreaseQuantityClick(): void {
    setQuantity((prev) => {
      if (prev === 1) return 1;
      return prev - 1;
    });
  }

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
      <div className="px-5">
        {/* RESTAURANT */}
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative size-6">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>
        {/* PRODUCT NAME */}
        <h1 className="mb-3 mt-1 text-xl font-semibold">{product.name}</h1>

        {/* PRODUCT PRICE & QUANTITY */}
        <div className="flex justify-between">
          {/* DISCOUNT PRICE */}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">
                {formatCurrency(calculateProductTotalPrice(product))}
              </h2>
              {product.discountPercentage > 0 && (
                <DiscountBadge product={product} />
              )}
            </div>

            {/* ORIGINAL PRICE */}
            {product.discountPercentage > 0 && (
              <p className="text-sm text-muted-foreground line-through">
                De: {formatCurrency(Number(product.price))}
              </p>
            )}
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-3 text-center">
            <Button
              size="icon"
              variant="ghost"
              className="border border-solid border-muted-foreground"
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-4">{quantity}</span>
            <Button size="icon" onClick={handleIncreaseQuantityClick}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        {/* DELIVERY DETAILS */}
        <Card className="mt-6 flex justify-around py-3">
          {/* COAST */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <BikeIcon size={14} />
            </div>

            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="text-xs">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="text-xs font-semibold">Grátis</p>
            )}
          </div>

          {/* TIME */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <TimerIcon size={14} />
            </div>

            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="text-xs">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="text-xs font-semibold">Grátis</p>
            )}
          </div>
        </Card>

        <div className="mt-6 space-y-3">
          <h3 className="font-semibold">Sobre</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
      </div>

      <ProductList
        title="Sucos"
        products={suggestedProducts}
        className="space-y-4 pt-6"
      />
    </div>
  );
}
