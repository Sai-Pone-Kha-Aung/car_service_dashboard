'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { product } from '@/constants/Data'

const Page = () => {
    const data = product;
    const router = useRouter();
    const { addToCart } = useCart();
    const [activeTab, setActiveTab] = useState('all')
    const filteredData = activeTab === 'all' ? data : data.filter(item => item.category === activeTab)

    return (
        <div className='min-h-screen bg-white mx-auto'>

            <div className='bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20'>
                <div className='mx-auto text-center'>
                    <h1 className='text-4xl font-bold mb-4'>
                        Our Proudcts
                    </h1>
                    <p className="text-xl opacity-90">High-quality automotive products for your vehicle&apos;s needs</p>
                </div>
            </div>

            <div className='container mx-auto px-4 py-16'>
                <div className='max-w-2xl mx-auto mb-12'>
                    <div className='relative'>
                        <Input
                            type="search"
                            placeholder='Search products...'
                            className='w-full pl-10'
                        />
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                    </div>
                </div>

                <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className='w-fulll mb-12'>
                    <TabsList className='grid w-full grid-cols-5'>
                        <TabsTrigger value="all">All Products</TabsTrigger>
                        <TabsTrigger value="Oil">Oil</TabsTrigger>
                        <TabsTrigger value="Filters">Filters</TabsTrigger>
                        <TabsTrigger value="Brakes">Brakes</TabsTrigger>
                        <TabsTrigger value="Electrical">Electrical</TabsTrigger>
                    </TabsList>
                    <TabsContent value={activeTab} >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {filteredData.map((item) => (
                                <Card key={item.id}>
                                    <CardHeader className='items-center'>
                                        <Image src='/placeholder.jpg' alt={`${item.name}`}
                                            width={300} height={200}
                                            className="object-cover rounded-t-lg" />
                                    </CardHeader>
                                    <CardContent>
                                        <Badge className="mb-2">{item.category !== 'all' ? item.category : 'featured'}</Badge>
                                        <CardTitle className="mb-2">{item.name}</CardTitle>
                                        <CardDescription>
                                            High-quality {item.category !== 'all' ? item.category : 'automotive'} product for optimal vehicle performance.
                                        </CardDescription>
                                        <p className="mt-4 font-bold">${item.price}</p>
                                    </CardContent>
                                    <CardFooter className='gap-4'>
                                        <Button className="w-full"
                                            onClick={() => router.push(`/products/${item.id}`)}
                                        >View</Button>
                                        <Button className="w-full"
                                            onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, quantity: 1, product_id: item.id })}
                                        >Add to Cart</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div >
    )
}

export default Page