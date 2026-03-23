'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSession, syncUserData } from "@/app/auth-actions";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  user: any;
  login: (userData: any) => void;
  logout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [user, setUser] = useState<any>(null);

  // Load from localStorage and Session on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('khaya_cart');
    const savedWishlist = localStorage.getItem('khaya_wishlist');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

    const checkSession = async () => {
        const session = await getSession();
        if (session) setUser(session);
    };
    checkSession();
  }, []);

  // Save to localStorage and Sync with DB if logged in
  useEffect(() => {
    localStorage.setItem('khaya_cart', JSON.stringify(cart));
    if (user?.id) syncUserData(user.id, cart, wishlist);
  }, [cart, user, wishlist]);

  useEffect(() => {
    localStorage.setItem('khaya_wishlist', JSON.stringify(wishlist));
    if (user?.id) syncUserData(user.id, cart, wishlist);
  }, [wishlist, user, cart]);

  const login = (userData: any) => setUser(userData);
  const logout = () => {
    setUser(null);
    localStorage.removeItem('khaya_cart');
    localStorage.removeItem('khaya_wishlist');
    setCart([]);
    setWishlist([]);
  };

  const addToCart = (product: any) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, clearCart, cartCount, cartTotal,
      wishlist, toggleWishlist, isInWishlist, user, login, logout
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
