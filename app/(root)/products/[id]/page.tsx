'use client'

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Star, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from "next/image"

export default function SingleProductPage() {
    const [quantity, setQuantity] = React.useState(1)

    const incrementQuantity = () => setQuantity(prev => prev + 1)
    const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1))

    return (
        <>
            {/* Product Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <Link href="/products" className="text-blue-600 hover:underline flex items-center">
                        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Products
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <Image
                            src="/placeholder.jpg"
                            alt="Premium Motor Oil"
                            width={800}
                            height={500}
                            className="w-full rounded-lg shadow-lg"
                        />
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <Image
                                    key={i}
                                    src={'/placeholder.jpg'}
                                    alt={`Product thumbnail ${i}`}
                                    width={200}
                                    height={200}
                                    className="w-full rounded-lg shadow cursor-pointer"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Premium Motor Oil</h1>
                            <p className="text-2xl font-bold text-blue-600">$29.99</p>
                        </div>
                        <p className="text-gray-700">
                            Our Premium Motor Oil is designed to provide superior engine protection and performance.
                            Suitable for a wide range of vehicles, this high-quality oil helps improve fuel efficiency
                            and extends engine life.
                        </p>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center border rounded-md">
                                <Button variant="ghost" size="icon" onClick={decrementQuantity}>
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="px-4">{quantity}</span>
                                <Button variant="ghost" size="icon" onClick={incrementQuantity}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <Button className="flex-1">
                                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                            </Button>
                        </div>
                        <div className="border-t pt-4">
                            <h3 className="font-semibold mb-2">Product Specifications:</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>Viscosity: 5W-30</li>
                                <li>Capacity: 5 Liters</li>
                                <li>Type: Full Synthetic</li>
                                <li>Suitable for: Gasoline and Diesel engines</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Product Tabs */}
                <Tabs defaultValue="description" className="mb-12">
                    <TabsList>
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="specifications">Specifications</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    Our Premium Motor Oil is formulated with advanced additives and base oils to provide
                                    exceptional protection against engine wear, even under extreme conditions. It helps to
                                    keep your engine clean and efficient, reducing harmful deposits and sludge build-up.
                                </p>
                                <p className="mt-4">
                                    Key Benefits:
                                </p>
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                    <li>Excellent wear protection</li>
                                    <li>Improved fuel economy</li>
                                    <li>Enhanced engine cleanliness</li>
                                    <li>Superior performance in high and low temperatures</li>
                                    <li>Extended oil change intervals</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="specifications" className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Specifications</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-semibold mb-2">General</h3>
                                        <ul className="space-y-1">
                                            <li><span className="font-medium">Brand:</span> CarService Pro</li>
                                            <li><span className="font-medium">Model:</span> CSP-5W30-5L</li>
                                            <li><span className="font-medium">Type:</span> Full Synthetic</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Performance</h3>
                                        <ul className="space-y-1">
                                            <li><span className="font-medium">Viscosity Grade:</span> 5W-30</li>
                                            <li><span className="font-medium">API Service:</span> SN Plus</li>
                                            <li><span className="font-medium">ACEA:</span> A3/B4</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                </Tabs>

                {/* Related Products */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Related Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((product) => (
                            <Card key={product}>
                                <CardHeader>
                                    <Image
                                        src={`/placeholder.jpg?height=200&width=300`}
                                        alt={`Related Product ${product}`}
                                        width={400}
                                        height={200}
                                        className="w-full h-48 object-cover rounded-t-lg"
                                    />
                                </CardHeader>
                                <CardContent>
                                    <CardTitle className="mb-2">Related Product {product}</CardTitle>
                                    <CardDescription>Brief description of the related product.</CardDescription>
                                    <p className="mt-2 font-bold text-blue-600">$24.99</p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full">View Product</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>

    )
}