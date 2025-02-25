'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

interface CartItem {
    id: number;
    user_id: number;
    name: string;
    price: number;
    quantity: number;
    product_id: number;
    image: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Omit<CartItem, 'user_id'>) => void;
    updateCartItem: (product: CartItem) => void;
    deleteCartItem: (id: number) => void;
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
    fetchCartItems: () => Promise<void>;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const { isAuthenticated, userData } = useAuth();

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

    const fetchCartItems = async () => {
        if (!isAuthenticated || !userData) {
            setCart([]);
            return;
        }
        const response = await fetch(`/api/cart?user_id=${userData.id}`);
        const data = await response.json();
        setCart(data);
    };

    const addToCart = async (product: Omit<CartItem, 'user_id'>) => {
        if (!isAuthenticated || !userData) {
            throw new Error("User is not authenticated");
        }
        const productWithUserId = { ...product, user_id: userData.id };
        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productWithUserId),
        });
        const newProduct = await response.json();
        if (!newProduct) {
            throw new Error("Failed to add product to cart");
        }
        setCart(prevCart => Array.isArray(prevCart) ? [...prevCart, newProduct] : [newProduct]);
    };

    const updateCartItem = async (product: CartItem) => {
        if (!isAuthenticated || !userData) {
            throw new Error("User is not authenticated");
        }
        const response = await fetch('/api/cart', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        const updatedProduct = await response.json();
        setCart(prevCart => prevCart.map(item => item.id === updatedProduct.id ? updatedProduct : item));
    };

    const deleteCartItem = async (id: number) => {
        if (!isAuthenticated || !userData) {
            throw new Error("User is not authenticated");
        }
        await fetch('/api/cart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const clearCart = async () => {
        if (!isAuthenticated || !userData) {
            throw new Error("User is not authenticated");
        }
        await fetch('/api/cart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userData.id }),
        });
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateCartItem, deleteCartItem, setCart, fetchCartItems, clearCart }}>
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