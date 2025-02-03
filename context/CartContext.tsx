'use client'
import React, { createContext, useContext, useEffect, useState } from "react";

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: CartItem) => void;
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: CartItem) => {
        setCart(prevCart => {
            const existingProduct = Array.isArray(prevCart) ? prevCart.find(item => item.id === product.id) : null;
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
                );
            } else {
                return Array.isArray(prevCart) ? [...prevCart, product] : [product];
            }
        });
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, setCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}