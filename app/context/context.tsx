'use client'
// context/CartContext.js
import { Product } from "@/components/product-grid";
import { createContext, useState, useContext, ReactNode } from "react";

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: {children: ReactNode}) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
    console.log(`${product.name} agregado al carrito`)
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
