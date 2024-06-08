"use client";

import { Cart } from "@/components/Cart";
import { DeliveryInfo } from "@/components/DeliveryInfo";
import { DiscountBadge } from "@/components/DiscountBadge";
import { ProductList } from "@/components/ProductList";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { calculateProductTotalPrice, formatCurrency } from "@/helpers/price";
import { useCart, useCartService, useDialogService } from "@/services";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { showDialog, hideDialog } = useDialogService();

  const { products } = useCart();

  const { addProductToCart, clearCart } = useCartService();

  function handleAddToCartClick(): void {
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
    );

    if (hasDifferentRestaurantProduct) {
      showDialog({
        title: "Você só pode adicionar itens de um restaurante por vez!",
        message:
          "Deseja mesmo adicionar esse produto? Isso limpará sua sacola atual.",
        onConfirm: () => {
          clearCart();
          addProductToCart(product, quantity);
          hideDialog();
          setIsOpen(true);
        },
        onCancel: hideDialog,
      });
      return;
    }

    addProductToCart(product, quantity);
    setIsOpen(true);
  }

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
    <>
      <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
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
            <div className="flex items-center gap-3 text-center">
              <Button
                size="icon"
                variant="ghost"
                disabled={quantity === 1}
                className="border border-solid border-muted-foreground hover:bg-transparent"
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
          <DeliveryInfo restaurant={product.restaurant} />

          <div className="mt-6 space-y-3">
            <h3 className="font-semibold">Sobre</h3>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>
        </div>

        <ProductList
          title="Sucos"
          products={suggestedProducts}
          className="space-y-4 pt-6"
        />

        <div className="mt-6 px-5">
          <Button
            className="w-full font-semibold"
            onClick={handleAddToCartClick}
          >
            Adicionar à sacola
          </Button>
        </div>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-[90vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>

          <Cart />
        </SheetContent>
      </Sheet>
    </>
  );
}
