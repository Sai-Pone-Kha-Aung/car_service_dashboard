'use client'
import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface Service {
    id: number;
    name: string;
    price: number;
    title: string;
    description: string;
    category: string;
}

const Page = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [data, setData] = useState<Service[]>([]);
    const router = useRouter();

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await fetch(`/api/service`);
                const data = await response.json();
                setData(data);
            }
            fetchData();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        const response = await fetch(`/api/service`);
        const originalData = await response.json();
        const filteredData: Service[] = searchTerm === '' ? originalData : originalData.filter((member: Service): boolean =>
            member.name.toLowerCase().includes(searchTerm) ||
            member.category.toLowerCase().includes(searchTerm)
        );
        setData(filteredData);
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);
    return (
        <div className='min-h-screen bg-white mx-auto'>

            <div className='bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20'>
                <div className='mx-auto text-center'>
                    <h1 className='text-4xl font-bold mb-4'>
                        Our Services
                    </h1>
                    <p className="text-xl opacity-90">Professional automotive care for your vehicle</p>
                </div>
            </div>

            <div className='container mx-auto px-4 py-16'>
                <div className='max-w-2xl mx-auto mb-12'>
                    <div className='relative'>
                        <Input
                            type="search"
                            placeholder='Search service...'
                            className='w-full pl-10'
                            onChange={handleSearch}
                        />
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                    </div>
                </div>

                <Tabs defaultValue='all' className='w-full mb-12'>

                    <TabsList className='grid w-full grid-cols-3'>
                        <TabsTrigger value="all">All Services</TabsTrigger>
                        <TabsTrigger value="Maintenance">Maintenance</TabsTrigger>
                        <TabsTrigger value="Wash">Wash</TabsTrigger>
                    </TabsList>
                    {['all', 'Maintenance', 'Wash'].map((category) => (
                        <TabsContent key={category} value={category}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {data
                                    .filter(service => category === 'all' || service.category === category)
                                    .map((service, index) => (
                                        <Card key={index}>
                                            <CardHeader>
                                                <CardTitle>{service.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <Badge className='mb-2'>{service.category}</Badge>
                                                <CardDescription>{service.description}</CardDescription>
                                                <p className='font-bold mt-2'>${service.price}</p>
                                            </CardContent>
                                            <CardFooter className='flex items-center'>
                                                <div className='flex flex-col gap-4 justify-center items-start'>
                                                    <Button size="sm"
                                                        onClick={() => router.push('/appointment')}
                                                    >Book Service</Button>
                                                </div>
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
