'use client'

import React, { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Trash2, Plus, Minus, CreditCard } from 'lucide-react'
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"

export default function AddToCartPage() {
    const { cart, addToCart, setCart, fetchCartItems, deleteCartItem, updateCartItem } = useCart();
    const { userData } = useAuth();

    console.log("User:", userData);
    useEffect(() => {
        if (userData) {
            fetchCartItems();
        }
    }, [userData]);

    const updateQuantity = (id: number, quantity: number, change: number) => {
        const item = cart.find(item => item.id === id);
        if (item) {
            updateCartItem({ ...item, quantity: quantity + change });
            setCart(cart.map(cartItem =>
                cartItem.id === id ? { ...cartItem, quantity: Math.max(0, cartItem.quantity + change) } : cartItem
            ).filter(cartItem => cartItem.quantity > 0))
        }
    }

    const removeItem = (id: number) => {
        setCart(cart.filter(item => item.id !== id))
    }

    const subtotal = Array.isArray(cart) ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0

    const router = useRouter()

    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            {/* Cart Content */}
            <div className="container mx-auto px-4 py-8" >
                <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="md:col-span-2 space-y-4">
                        {Array.isArray(cart) && cart.map((item) => (
                            <Card key={item.id}>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            {item.image ? (
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={80}
                                                    height={80}
                                                    className="rounded-md object-cover"
                                                />
                                            ) : (
                                                <div className="w-[80px] h-[80px] bg-gray-200 rounded-md" />
                                            )}
                                            <div>
                                                <h3 className="font-semibold">{item.name}</h3>
                                                <p className="text-sm text-gray-500">Unit Price: ${item.price}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => updateQuantity(item.id, item.quantity, -1)}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <Input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => updateQuantity(item.id, item.quantity, parseInt(e.target.value) - item.quantity)}
                                                    className="w-16 text-center"
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => updateQuantity(item.id, item.quantity, 1)}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => deleteCartItem(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={() => router.push("/checkout")}>
                                    <CreditCard className="mr-2 h-4 w-4" /> Proceed to Checkout
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>

                {/* Continue Shopping */}
                <div className="mt-8">
                    <Link href="/products">
                        <Button variant="outline" className="text-black" onClick={() => router.push("/products")}>
                            <ShoppingCart className="mr-2 h-4 w-4" /> Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>

        </div>
    )
}