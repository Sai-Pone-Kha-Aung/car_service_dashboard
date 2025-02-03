'use client'
import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle } from 'lucide-react'
import { useCart } from "@/context/CartContext"

export default function CheckoutPage() {
    const [step, setStep] = React.useState(1)
    const [orderComplete, setOrderComplete] = React.useState(false)

    const { cart } = useCart()

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const total = subtotal
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (step < 3) {
            setStep(step + 1)
        } else {
            setOrderComplete(true)
        }
    }

    return (

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white ">

            {/* Checkout Content */}
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                {orderComplete ? (
                    <Card className="max-w-2xl mx-auto">
                        <CardContent className="pt-6 text-center">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold mb-2">Order Complete!</h2>
                            <p className="text-gray-600 mb-4">Thank you for your purchase. Your order has been received and is being processed.</p>
                            <Button asChild>
                                <Link href="/">Return to Home</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Checkout Steps */}
                        <div className="md:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Checkout Steps</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between mb-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className={`flex items-center ${i <= step ? 'text-blue-600' : 'text-gray-400'}`}>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${i <= step ? 'border-blue-600' : 'border-gray-400'}`}>
                                                    {i}
                                                </div>
                                                <span className="ml-2 text-sm font-medium">
                                                    {i === 1 ? 'Shipping' : i === 2 ? 'Payment' : 'Review'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <form onSubmit={handleSubmit}>
                                {step === 1 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Shipping Information</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="firstName">First Name</Label>
                                                    <Input id="firstName" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="lastName">Last Name</Label>
                                                    <Input id="lastName" required />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="address">Address</Label>
                                                <Input id="address" required />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="city">City</Label>
                                                    <Input id="city" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="zipCode">ZIP Code</Label>
                                                    <Input id="zipCode" required />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="country">Country</Label>
                                                <Select>
                                                    <SelectTrigger id="country">
                                                        <SelectValue placeholder="Select country" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="us">United States</SelectItem>
                                                        <SelectItem value="ca">Canada</SelectItem>
                                                        <SelectItem value="uk">United Kingdom</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button type="submit" className="w-full">Continue to Payment</Button>
                                        </CardFooter>
                                    </Card>
                                )}

                                {step === 2 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Payment Information</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="cardName">Name on Card</Label>
                                                <Input id="cardName" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="cardNumber">Card Number</Label>
                                                <Input id="cardNumber" required />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="expDate">Expiration Date</Label>
                                                    <Input id="expDate" placeholder="MM/YY" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="cvv">CVV</Label>
                                                    <Input id="cvv" required />
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button type="submit" className="w-full">Review Order</Button>
                                        </CardFooter>
                                    </Card>
                                )}

                                {step === 3 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Review Order</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div>
                                                <h3 className="font-semibold mb-2">Shipping Address</h3>
                                                <p>John Doe</p>
                                                <p>123 Main St</p>
                                                <p>Anytown, ST 12345</p>
                                                <p>United States</p>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-2">Payment Method</h3>
                                                <p>Visa ending in 1234</p>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-2">Order Items</h3>
                                                {cart.map((item) => (
                                                    <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                                                        <span>{item.name} x {item.quantity}</span>
                                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button type="submit" className="w-full">Place Order</Button>
                                        </CardFooter>
                                    </Card>
                                )}
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex justify-between">
                                            <span>{item.name} x {item.quantity}</span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                    <Separator />
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-bold">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}