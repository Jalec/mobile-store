import { create } from "zustand";

const useCartStore = create((set) => ({
  cartCount: 0,
  cartItems: [],

  // Add item to the cart
  addToCart: (item) =>
    set((state) => ({
      cartItems: [...state.cartItems, item],
      cartCount: state.cartCount + 1,
    })),

  //clearCart: () => set({ cartItems: [], cartCount: 0 }),
}));

export default useCartStore;
