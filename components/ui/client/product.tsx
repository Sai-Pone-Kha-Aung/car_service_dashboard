import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../card'
import { Button } from '../button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs'

const ProductSection = () => {
    return (
        <section id='products' className='py-16'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <h2 className='text-3xl font-extrabold text-center mb-8'>
                    Featured Products
                </h2>
                <Tabs defaultValue='oils' className='w-full'>
                    <TabsList className='grid w-full grid-cols-4'>
                        <TabsTrigger value='oils'> Oils</TabsTrigger>
                        <TabsTrigger value='filters'> Filter</TabsTrigger>
                        <TabsTrigger value='breaks'> Breaks</TabsTrigger>
                        <TabsTrigger value='accessories'> Accessories</TabsTrigger>
                    </TabsList>

                    {['oils', 'filters', 'breaks', 'accessories'].map((category) => (
                        <TabsContent key={category} value={category}>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                {[1, 2, 3].map((product) => (
                                    <Card key={product}>
                                        <CardHeader>
                                            <CardTitle>
                                                Product {product}
                                            </CardTitle>
                                            <CardDescription>{category} category</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p>High-quality product description goes here.</p>
                                        </CardContent>
                                        <CardFooter>
                                            <Button>
                                                Add to Cart
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>

            </div>
        </section>
    )
}

export default ProductSection