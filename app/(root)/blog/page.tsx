'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface BlogData {
    id: number;
    title: string;
    category: string;
    tags: string;
    image: string;
    content: string;
    createdat: string;
}

const Page = () => {
    const [data, setData] = useState<BlogData[]>([])
    const router = useRouter();
    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await fetch('/api/blog')
                const data = await res.json()
                console.log(data)
                setData(data)
            }
            fetchData();
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    }, [])


    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        const response = await fetch(`/api/blog`);
        const originalData = await response.json();
        const filteredData: BlogData[] = searchTerm === '' ? originalData : originalData.filter((member: BlogData): boolean =>
            member.tags.toLowerCase().includes(searchTerm) ||
            member.category.toLowerCase().includes(searchTerm)
        );
        setData(filteredData);
    }

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
                            onChange={handleSearch}
                        />
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                    </div>
                    <div className='flex flex-wrap gap-2 justify-center mt-4'>
                        <Button
                            variant="outline"
                            className="rounded-full"
                            onClick={() => handleSearch({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}
                        >
                            All Posts
                        </Button>
                        <Button
                            variant="outline"
                            className="rounded-full"
                            onClick={() => handleSearch({ target: { value: 'maintenance' } } as React.ChangeEvent<HTMLInputElement>)}
                        >
                            Maintenance
                        </Button>
                        <Button
                            variant="outline"
                            className="rounded-full"
                            onClick={() => handleSearch({ target: { value: 'repairs' } } as React.ChangeEvent<HTMLInputElement>)}
                        >
                            Repairs
                        </Button>
                        <Button
                            variant="outline"
                            className="rounded-full"
                            onClick={() => handleSearch({ target: { value: 'tips' } } as React.ChangeEvent<HTMLInputElement>)}
                        >
                            Tips & Tricks
                        </Button>
                        <Button
                            variant="outline"
                            className="rounded-full"
                            onClick={() => handleSearch({ target: { value: 'news' } } as React.ChangeEvent<HTMLInputElement>)}
                        >
                            News
                        </Button>
                    </div>
                </div>

                <div className='mb-16'>
                    <Card className='overflow-hidden'>
                        <div className='md:flex'>
                            <div className='md:w-1/2'>
                                {data[0]?.image && (
                                    <Image
                                        src={data[0]?.image}
                                        width={600}
                                        height={400}
                                        alt="Featured post"
                                        className="w-full h-64 md:h-full object-cover"
                                    />
                                )}
                            </div>
                            <div className='md:w-1/2 p-8'>
                                <Badge className='mb-2'>Featured</Badge>
                                <h2>{data[0]?.title || 'Featured Post'}</h2>
                                <p className="text-gray-600 mb-4">
                                    Learn everything you need to know about maintaining your electric vehicle, from battery care to optimal charging practices.
                                </p>
                                <div className='flex items-center justify-between'>
                                    <Button onClick={() => router.push(`/blog/${data[0]?.id}`)}>Read More</Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {data.map((post, index) => (
                        <Card key={index} className='flex flex-col'>
                            <Image
                                src={post.image}
                                width={400}
                                height={200}
                                alt={post.title}
                                className="w-full h-48 object-cover"
                            />
                            <CardContent className='flex-1 p-6'>
                                <Badge className='mb-2'>{post.category}</Badge>
                                <h3 className='text-xl font-bold mb-2'>{post.title}</h3>
                                <p className='text-gray-600 mb-4'>

                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <Button onClick={() => router.push(`/blog/${post.id}`)} size="sm">Read More</Button>
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