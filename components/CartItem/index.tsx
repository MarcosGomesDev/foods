import { CartContext, CartProduct } from "@/app/contexts/cart";
import { calculateProductTotalPrice, formatCurrency } from "@/helpers/price";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import { Button } from "../ui/button";

interface CartItemProps {
  cartProduct: CartProduct;
}

export function CartItem({ cartProduct }: CartItemProps) {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* IMAGE AND INFO */}
        <div className="relative size-20">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-1">
          <div className="items-center gap-1">
            <h3 className="text-xs">{cartProduct.name}</h3>
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-3 text-center">
            <Button
              size="icon"
              variant="ghost"
              disabled={cartProduct.quantity === 1}
              className="size-7 border border-solid border-muted-foreground hover:bg-transparent"
              onClick={() => decreaseProductQuantity(cartProduct.id)}
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <span className="block w-3 text-xs">{cartProduct.quantity}</span>
            <Button
              size="icon"
              className="size-7"
              onClick={() => increaseProductQuantity(cartProduct.id)}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="size-8 border border-solid border-muted-foreground"
        onClick={() => removeProductFromCart(cartProduct.id)}
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
}
