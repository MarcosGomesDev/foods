"use client";

import { calculateProductTotalPrice } from "@/helpers/price";
import { Prisma } from "@prisma/client";
import { createContext, ReactNode, useMemo, useState } from "react";

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

interface ICartContext {
  products: CartProduct[];
  subtotal: number;
  total: number;
  discount: number;
  /* eslint-disable no-unused-vars */
  addProductToCart: (product: ProductWithRestaurant, quantity: number) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  subtotal: 0,
  total: 0,
  discount: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  function addProductToCart(product: ProductWithRestaurant, quantity: number) {
    const isProductInCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (isProductInCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
          }

          return cartProduct;
        }),
      );
    }

    setProducts((prevProducts) => [...prevProducts, { ...product, quantity }]);
  }

  function decreaseProductQuantity(productId: string) {
    setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          if (cartProduct.quantity === 1) {
            return cartProduct;
          }

          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }

        return cartProduct;
      }),
    );
  }

  function increaseProductQuantity(productId: string) {
    setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }

        return cartProduct;
      }),
    );
  }

  function removeProductFromCart(productId: string) {
    setProducts((prev) =>
      prev.filter((cartProduct) => cartProduct.id !== productId),
    );
  }

  const subtotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + calculateProductTotalPrice(product) * product.quantity;
    }, 0);
  }, [products]);

  const discount = subtotal - total;

  return (
    <CartContext.Provider
      value={{
        products,
        discount,
        subtotal,
        total,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
