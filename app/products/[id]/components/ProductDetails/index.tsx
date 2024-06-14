"use client";

import { DeliveryInfo } from "@/components/DeliveryInfo";
import { DiscountBadge } from "@/components/DiscountBadge";
import { QuantitySelector } from "@/components/QuantitySelector";
import { Card, CardContent } from "@/components/ui/card";
import { calculateProductTotalPrice, formatCurrency } from "@/helpers/price";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { AddToBagButton } from "../AddToBagButton";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: { restaurant: true };
  }>;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <>
      <div className="container relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5 pb-10 lg:hidden">
        <div className="px-5">
          {/* RESTAURANT */}
          <div className="flex items-center gap-[0.375rem]">
            <div className="relative size-6">
              <Image
                src={product.restaurant.imageUrl}
                alt={product.restaurant.name}
                fill
                sizes="20vw"
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
            <QuantitySelector />
          </div>

          {/* DELIVERY DETAILS */}
          <DeliveryInfo restaurant={product.restaurant} />

          <div className="mt-6 space-y-3">
            <h3 className="font-semibold">Sobre</h3>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:flex lg:flex-col">
        <Card className="hidden h-[500px] w-[500px] lg:flex lg:flex-col xl:w-[550px]">
          <CardContent className="overflow-hidden p-4">
            <div className="flex items-center gap-4">
              <div className="relative size-6">
                <Image
                  src={product.restaurant.imageUrl}
                  alt={product.restaurant.name}
                  fill
                  sizes="20vw"
                  className="rounded-full object-cover"
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {product.restaurant.name}
              </span>
            </div>
            <h1 className="mb-3 mt-1 text-xl font-semibold">{product.name}</h1>
            <div className="flex justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">
                    {formatCurrency(calculateProductTotalPrice(product))}
                  </h2>
                  {product.discountPercentage > 0 && (
                    <DiscountBadge product={product} />
                  )}
                </div>
                {product.discountPercentage > 0 && (
                  <p className="text-sm text-muted-foreground line-through">
                    De: {formatCurrency(Number(product.price))}
                  </p>
                )}
              </div>
              <QuantitySelector />
            </div>
            <DeliveryInfo restaurant={product.restaurant} />
            <div className="mt-6 space-y-3">
              <h3 className="font-semibold">Sobre</h3>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div className="mt-3">
              <AddToBagButton product={product} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
