import React from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const Page = () => {
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

                <Tabs defaultValue='all' className='w-fulll mb-12'>
                    <TabsList className='grid w-full grid-cols-5'>
                        <TabsTrigger value="all">All Products</TabsTrigger>
                        <TabsTrigger value="oils">Oils</TabsTrigger>
                        <TabsTrigger value="filters">Filters</TabsTrigger>
                        <TabsTrigger value="brakes">Brakes</TabsTrigger>
                        <TabsTrigger value="accessories">Accessories</TabsTrigger>
                    </TabsList>
                    {['all', 'oils', 'filters', 'brakes', 'accessories'].map((category) => (
                        <TabsContent key={category} value={category}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((product) => (
                                    <Card key={product}>
                                        <CardHeader>
                                            <img src={`/placeholder.svg?height=200&width=300`} alt={`Product ${product}`} className="w-full h-48 object-cover rounded-t-lg" />
                                        </CardHeader>
                                        <CardContent>
                                            <Badge className="mb-2">{category !== 'all' ? category : 'Featured'}</Badge>
                                            <CardTitle className="mb-2">Product {product}</CardTitle>
                                            <CardDescription>
                                                High-quality {category !== 'all' ? category : 'automotive'} product for optimal vehicle performance.
                                            </CardDescription>
                                            <p className="mt-4 font-bold">$49.99</p>
                                        </CardContent>
                                        <CardFooter>
                                            <Button className="w-full">Add to Cart</Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>

            </div>
        </div>
    )
}

export default Page