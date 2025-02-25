'use client'

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Plus, Minus, ChevronLeft } from 'lucide-react'
import Image from "next/image"
import { useCart } from "@/context/CartContext"
import { product } from "@/constants/Data"
import { useParams } from "next/navigation"

export default function SingleProductPage() {
    const { id } = useParams()
    const [quantity, setQuantity] = React.useState(1)
    const { addToCart } = useCart()
    const incrementQuantity = () => setQuantity(prev => prev + 1)
    const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1))
    const [data, setData] = useState<Product[]>([]);
    const [relatedData, setRelatedData] = useState<Product[]>([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/product/${id}`);
            const result = await response.json();
            setData(Array.isArray(result) ? result : [result]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchRelatedData = async () => {
        try {
            const response = await fetch(`/api/product`);
            const result = await response.json();
            setRelatedData(Array.isArray(result) ? result : [result]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        fetchData();
        fetchRelatedData();
    }, [id]);


    console.log(data)
    if (!data || data.length === 0) {
        return <div>Product not found</div>
    }

    return (
        <>
            {/* Product Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <Link href="/products" className="text-blue-600 hover:underline flex items-center">
                        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Products
                    </Link>
                </div>
                {data.map((item) => (
                    <div key={item.id}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            {/* Product Images */}
                            <div className="space-y-4">
                                <Image
                                    src={item.image || "/placeholder.png"}
                                    alt="Premium Motor Oil"
                                    width={800}
                                    height={500}
                                    className="w-full rounded-lg shadow-lg"
                                />
                            </div>

                            {/* Product Details */}
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
                                    <p className="text-2xl font-bold text-blue-600">${item.price}</p>
                                </div>
                                <p className="text-gray-700">
                                    {item.description}
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
                                    <Button className="flex-1" onClick={() => addToCart({ ...item, quantity, id: item?.id, product_id: item?.id })}>
                                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div>
                            {/* Product Tabs */}
                            <Tabs defaultValue="description" className="mb-12">
                                <TabsList>
                                    <TabsTrigger value="description">Description</TabsTrigger>
                                </TabsList>
                                <TabsContent value="description" className="mt-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Product Description</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>
                                                {item.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                ))}

                {/* Related Products */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Related Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {relatedData
                            .filter((product) => product.category === data[0].category)
                            .map((product) => (
                                <Card key={product.id}>
                                    <CardHeader>
                                        <Image
                                            src={product.image}
                                            alt={`Related Product ${product}`}
                                            width={400}
                                            height={200}
                                            className="w-full h-48 object-cover rounded-t-lg"
                                        />
                                    </CardHeader>
                                    <CardContent>
                                        <CardTitle className="mb-2">{product.name}</CardTitle>
                                        <CardDescription>{product.description}</CardDescription>
                                        <p className="mt-2 font-bold text-blue-600">${product.price}</p>
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