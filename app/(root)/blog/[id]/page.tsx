'use client'
import React, { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { useParams } from 'next/navigation'

interface Blog {
    id: number;
    title: string;
    category: string;
    tags: string;
    image: string;
    content: string;
    createdat: string;
}

const Page = () => {
    const { id } = useParams()
    const [data, setData] = useState<Blog[]>([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/blog/${id}`);
            const result = await response.json();
            setData(Array.isArray(result) ? result : [result]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    useEffect(() => {
        fetchData();
    }, [id]);

    console.log(data)

    return (
        <article className='container mx-auto px-4 py-16 max-w-4xl'>
            <div className="mb-8">
                <Link href="/blog" className="text-blue-600 hover:underline flex items-center">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back to Blog
                </Link>
            </div>
            <Badge className='mb-4'>{data[0]?.tags}</Badge>
            <h1 className='text-4xl font-bold mb-6'>{data[0]?.title}</h1>


            {data[0]?.image && (
                <Image
                    src={data[0]?.image}
                    width={1200}
                    height={600}
                    alt="Featured post"
                    className="w-full h-64 md:h-full object-cover"
                />
            )}

            <div className="prose max-w-none pt-4">
                <p>{data[0]?.content}</p>
            </div>
        </article>
    )
}

export default Page