import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  name: string;
  variant: string;
  servings: number;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string, variant: string, servings: number) => void;
  updateQuantity: (id: string, variant: string, servings: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((newItem: Omit<CartItem, 'quantity'>) => {
    setIsCartOpen(true);
    setItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === newItem.id && item.variant === newItem.variant && item.servings === newItem.servings
      );
      
      if (existingItem) {
        toast.success(`Updated quantity for ${newItem.name}`);
        return prev.map((item) =>
          item.id === newItem.id && item.variant === newItem.variant && item.servings === newItem.servings
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      toast.success(`${newItem.name} added to cart!`);
      return [...prev, { ...newItem, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string, variant: string, servings: number) => {
    setItems((prev) => prev.filter((item) => 
      !(item.id === id && item.variant === variant && item.servings === servings)
    ));
    toast.info('Item removed from cart');
  }, []);

  const updateQuantity = useCallback((id: string, variant: string, servings: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, variant, servings);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (
        item.id === id && item.variant === variant && item.servings === servings 
          ? { ...item, quantity } 
          : item
      ))
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
    toast.info('Cart cleared');
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
