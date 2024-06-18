import { Prisma } from "@prisma/client";

interface ProductWithRestaurant
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          id: true;
          deliveryFee: true;
          deliveryTimeMinutes: true;
        };
      };
    };
  }> {}

export interface CartProduct extends ProductWithRestaurant {
  quantity: number;
}

export interface Cart {
  products: CartProduct[];
  subtotal: number;
  total: number;
  discounts: number;
}

export interface CartService {
  cart: Cart;
  /* eslint-disable no-unused-vars */
  setCart: (cart: Cart) => void;
  addProductToCart: (product: ProductWithRestaurant, quantity: number) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
  clearCart: () => void;
}
