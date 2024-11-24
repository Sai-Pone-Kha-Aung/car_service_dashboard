import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const posts = [
    {
        title: "5 Tips for Better Fuel Efficiency",
        excerpt: "Learn how to maximize your vehicle's fuel efficiency with these proven tips and techniques.",
        category: "Tips & Tricks",
        author: "Alice Johnson",
        date: "Nov 22, 2024"
    },
    {
        title: "Understanding Your Car's Warning Lights",
        excerpt: "A comprehensive guide to interpreting and responding to your vehicle's dashboard warning lights.",
        category: "Maintenance",
        author: "Bob Wilson",
        date: "Nov 21, 2024"
    },
    {
        title: "The Importance of Regular Oil Changes",
        excerpt: "Why regular oil changes are crucial for your engine's health and longevity.",
        category: "Maintenance",
        author: "Carol Davis",
        date: "Nov 20, 2024"
    },
    {
        title: "Winter Car Care Essentials",
        excerpt: "Prepare your vehicle for cold weather with these essential maintenance tips.",
        category: "Seasonal",
        author: "David Brown",
        date: "Nov 19, 2024"
    },
    {
        title: "Common Brake Problems and Solutions",
        excerpt: "Learn to identify and address common brake issues before they become serious.",
        category: "Repairs",
        author: "Emma White",
        date: "Nov 18, 2024"
    },
    {
        title: "Choosing the Right Tires",
        excerpt: "A guide to selecting the perfect tires for your vehicle and driving conditions.",
        category: "Tips & Tricks",
        author: "Frank Miller",
        date: "Nov 17, 2024"
    }
]
const Page = () => {
    return (
        <div className='min-h-screen bg-white mx-auto'>
            <div className='bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20'>
                <div className='mx-auto text-center'>
                    <h1 className='text-4xl font-bold mb-4'>
                        Our Blog
                    </h1>
                    <p className="text-xl opacity-90">Stay updated with the latest automotive news and maintenance tips</p>
                </div>
            </div>

            <div className='container mx-auto px-4 py-16'>
                <div className='max-w-2xl mx-auto mb-12'>
                    <div className='relative'>
                        <Input
                            type="search"
                            placeholder='Search blog posts...'
                            className='w-full pl-10'
                        />
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                    </div>
                    <div className='flex flex-wrap gap-2 justify-center mt-4'>
                        <Button variant="outline" className="rounded-full">All Posts</Button>
                        <Button variant="outline" className="rounded-full">Maintenance</Button>
                        <Button variant="outline" className="rounded-full">Repairs</Button>
                        <Button variant="outline" className="rounded-full">Tips & Tricks</Button>
                        <Button variant="outline" className="rounded-full">News</Button>
                    </div>
                </div>

                <div className='mb-16'>
                    <Card className='overflow-hidden'>
                        <div className='md:flex'>
                            <div className='md:w-1/2'>
                                <Image
                                    src="/pic.png"
                                    width={600}
                                    height={400}
                                    alt="Featured post"
                                    className="w-full h-64 md:h-full object-cover"
                                />
                            </div>
                            <div className='md:w-1/2 p-8'>
                                <Badge className='mb-2'>Featured</Badge>
                                <h2>The Complete Guid to Electric Vehicle Maintenance</h2>
                                <p className="text-gray-600 mb-4">
                                    Learn everything you need to know about maintaining your electric vehicle, from battery care to optimal charging practices.
                                </p>
                                <div className='flex items-center justify-between'>
                                    <Button>Read More</Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {posts.map((post, index) => (
                        <Card key={index} className='flex flex-col'>
                            <Image
                                src="/pic.png"
                                width={400}
                                height={200}
                                alt={post.title}
                                className="w-full h-48 object-cover"
                            />
                            <CardContent className='flex-1 p-6'>
                                <Badge className='mb-2'>{post.category}</Badge>
                                <h3 className='text-xl font-bold mb-2'>{post.title}</h3>
                                <p className='text-gray-600 mb-4'>
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <Button size="sm">Read More</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Page