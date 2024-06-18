"use client";

import { calculateProductTotalPrice } from "@/helpers/price";
import { create } from "zustand";
import { CartService } from "./cartTypes";

const useCartStore = create<CartService>((set) => ({
  cart: {
    discounts: 0,
    products: [],
    subtotal: 0,
    total: 0,
  },
  setCart: (state) => set({ cart: state }),
  addProductToCart: (product, quantity) =>
    set((state) => {
      const { products } = state.cart;
      const isProductInCart = products.some(
        (cartProduct) => cartProduct.id === product.id,
      );

      let newProducts;

      if (isProductInCart) {
        newProducts = products.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
          }
          return cartProduct;
        });
      } else {
        newProducts = [
          ...products,
          {
            ...product,
            quantity,
          },
        ];
      }

      const subtotal = newProducts.reduce(
        (acc, p) => acc + Number(p.price) * p.quantity,
        0,
      );

      const total =
        newProducts.reduce(
          (acc, p) => acc + calculateProductTotalPrice(p) * p.quantity,
          0,
        ) +
        (newProducts.length > 0
          ? Number(newProducts[0].restaurant.deliveryFee)
          : 0);

      const discounts =
        subtotal -
        total +
        (newProducts.length > 0
          ? Number(newProducts[0].restaurant.deliveryFee)
          : 0);

      return {
        ...state,
        cart: {
          products: newProducts,
          subtotal,
          total,
          discounts,
        },
      };
    }),

  decreaseProductQuantity: (productId) =>
    set((state) => {
      const total =
        state.cart.products.reduce((acc, product) => {
          return (
            acc + calculateProductTotalPrice(product) * (product.quantity - 1)
          );
        }, 0) + Number(state.cart.products?.[0]?.restaurant?.deliveryFee);

      const subtotal = state.cart.products.reduce((acc, product) => {
        return acc + Number(product.price) * (product.quantity - 1);
      }, 0);

      return {
        cart: {
          products: state.cart.products.map((cartProduct) => {
            if (cartProduct.id === productId) {
              return {
                ...cartProduct,
                quantity: cartProduct.quantity - 1,
              };
            }

            return cartProduct;
          }),
          total,
          subtotal,
          discounts:
            subtotal -
            total +
            Number(state.cart.products?.[0]?.restaurant?.deliveryFee),
        },
      };
    }),
  increaseProductQuantity: (productId) =>
    set((state) => {
      const newProducts = state.cart.products.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }
        return cartProduct;
      });

      const subtotal = newProducts.reduce(
        (acc, product) => acc + Number(product.price) * product.quantity,
        0,
      );

      const total =
        newProducts.reduce(
          (acc, product) =>
            acc + calculateProductTotalPrice(product) * product.quantity,
          0,
        ) +
        (newProducts.length > 0
          ? Number(newProducts[0].restaurant.deliveryFee)
          : 0);

      const discounts =
        subtotal -
        total +
        (newProducts.length > 0
          ? Number(newProducts[0].restaurant.deliveryFee)
          : 0);

      return {
        cart: {
          products: newProducts,
          total,
          subtotal,
          discounts,
        },
      };
    }),
  removeProductFromCart: (productId) =>
    set((state) => {
      const products = state.cart.products.filter(
        (cartProduct) => cartProduct.id !== productId,
      );

      const subtotal = products.reduce(
        (acc, product) => acc + Number(product.price) * product.quantity,
        0,
      );

      const total =
        products.reduce(
          (acc, product) =>
            acc + calculateProductTotalPrice(product) * product.quantity,
          0,
        ) +
        (products.length > 0 ? Number(products[0].restaurant.deliveryFee) : 0);

      const discounts =
        subtotal -
        total +
        (products.length > 0 ? Number(products[0].restaurant.deliveryFee) : 0);

      return {
        cart: {
          products,
          total,
          subtotal,
          discounts,
        },
      };
    }),
  clearCart: () =>
    set((state) => ({
      ...state,
      cart: {
        discounts: 0,
        products: [],
        subtotal: 0,
        total: 0,
      },
    })),
}));

export function useCartZustand(): CartService["cart"] {
  return useCartStore((state) => state.cart);
}

export function useCartServiceZustand(): Pick<
  CartService,
  | "addProductToCart"
  | "decreaseProductQuantity"
  | "increaseProductQuantity"
  | "removeProductFromCart"
  | "clearCart"
  | "setCart"
> {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const decreaseProductQuantity = useCartStore(
    (state) => state.decreaseProductQuantity,
  );
  const increaseProductQuantity = useCartStore(
    (state) => state.increaseProductQuantity,
  );
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart,
  );
  const clearCart = useCartStore((state) => state.clearCart);

  const setCart = useCartStore((state) => state.setCart);

  return {
    addProductToCart,
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
    clearCart,
    setCart,
  };
}
