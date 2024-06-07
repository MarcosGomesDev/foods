import { Prisma } from "@prisma/client";

interface ProductWithRestaurant
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          deliveryFee: true;
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
  discount: number;
}

export interface CartService {
  // products: CartProduct[];
  // subtotal: number;
  // total: number;
  // discount: number;
  cart: Cart;
  /* eslint-disable no-unused-vars */
  addProductToCart: (product: ProductWithRestaurant, quantity: number) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
  clearCart: () => void;
}