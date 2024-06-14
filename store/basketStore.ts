import { create } from "zustand";

interface Product {
  id: number;
  name: string;
  price: number;
  info: string;
  img: any;
}

export interface BasketState {
  items: number;
  total: number;
  products: Array<Product & { quantity: number }>;
  reduceProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  clearCart: () => void;
}

const useBasketStore = create<BasketState>()((set) => ({
  products: [],
  items: 0,
  total: 0,
  addProduct: (product) => {
    set((state) => {
      state.items += 1;
      state.total += Number(product.price.toFixed(2));
      const index = state.products.findIndex((p) => p.id == product.id);
      if (index >= 0) {
        const updatedProds = [...state.products];
        updatedProds[index].quantity += 1;
        return { products: updatedProds };
      } else {
        return { products: [...state.products, { ...product, quantity: 1 }] };
      }
    });
  },
  reduceProduct: (product) => {
    set((state) => {
      state.items -= 1;
      state.total -= Number(product.price.toFixed(2));
      return {
        products: state.products
          .map((p) => {
            if (p.id === product.id) {
              p.quantity -= 1;
            }
            return p;
          })
          .filter((p) => p.quantity > 0),
      };
    });
  },
  clearCart: () => set({ products: [], items: 0, total: 0 }),
}));

export default useBasketStore;
