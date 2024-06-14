"use client";

import { Button } from "@/components/ui/button";
import {
  useCart,
  useCartService,
  useDialogService,
  useQuantitySelector,
  useSheetCartService,
} from "@/services";
import { Prisma } from "@prisma/client";

interface AddToBagButtonProps {
  product: Prisma.ProductGetPayload<{
    include: { restaurant: true };
  }>;
}

export function AddToBagButton({ product }: AddToBagButtonProps) {
  const { products } = useCart();
  const quantity = useQuantitySelector();
  const { addProductToCart, clearCart } = useCartService();
  const { showDialog, hideDialog } = useDialogService();
  const { showSheetCart } = useSheetCartService();

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
          showSheetCart();
        },
        onCancel: hideDialog,
      });
      return;
    }

    addProductToCart(product, quantity);
    showSheetCart();
  }

  return (
    <Button className="w-full font-semibold" onClick={handleAddToCartClick}>
      Adicionar à sacola
    </Button>
  );
}
