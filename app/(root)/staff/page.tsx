"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface StaffData {
    id: number;
    name: string;
    role: string;
    email: string;
    avatar: string;
}

const page = () => {
    const [data, setData] = useState<StaffData[]>([]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await fetch(`/api/staff`);
                const data = await response.json();
                console.log(data);
                setData(data);
            }
            fetchData();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        const response = await fetch(`/api/staff`);
        const originalData = await response.json();
        const filteredData: StaffData[] = searchTerm === '' ? originalData : originalData.filter((member: StaffData): boolean =>
            member.name.toLowerCase().includes(searchTerm) ||
            member.role.toLowerCase().includes(searchTerm)
        );
        setData(filteredData);
    }

    return (
        <div className='min-h-screen bg-white mx-auto'>
            <div className='bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20'>
                <div className='mx-auto text-center'>
                    <h1 className='text-4xl font-bold mb-4'>
                        Meet Our Team
                    </h1>
                    <p className="text-xl opacity-90">The experts behind CarService Pro&apos;s exceptional service</p>
                </div>
            </div>

            <div className='container mx-auto px-4 py-16'>
                <div className='max-w-2xl mx-auto mb-12'>
                    <div className='relative'>
                        <Input
                            type="search"
                            placeholder='Search staff...'
                            className='w-full pl-10'
                            onChange={handleSearch}
                        />
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                    </div>
                </div>

                <Tabs defaultValue="all" className="w-full mb-12">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all">All Staff</TabsTrigger>
                        <TabsTrigger value="management">Management</TabsTrigger>
                        <TabsTrigger value="Mechanic">Technicians</TabsTrigger>
                        <TabsTrigger value="customer-service">Customer Service</TabsTrigger>
                    </TabsList>
                    {['all', 'management', 'Mechanic', 'customer-service'].map((category) => (

                        <TabsContent key={category} value={category}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data
                                    .filter(member =>
                                        category === 'all' || member.role === category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')
                                    )
                                    .map((member, index) => (
                                        <Card key={index}>
                                            <CardHeader>
                                                <Avatar className="w-24 h-24 mx-auto mb-4">
                                                    <AvatarImage src={member.avatar} alt={member.name} />
                                                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                <CardTitle>{member.name}</CardTitle>
                                                <CardDescription>{member.role}</CardDescription>
                                            </CardHeader>
                                            <CardFooter className="justify-center">
                                                <Badge>{member.role}</Badge>
                                            </CardFooter>
                                        </Card>
                                    ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { title: "Years of Experience", value: "10+" },
                        { title: "Certified Technicians", value: "20+" },
                        { title: "Happy Customers", value: "10,000+" }
                    ].map((stat, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{stat.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">{stat.value}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )

}
export default page

function renderStaffCards() {
    const [data, setData] = useState<StaffData[]>([]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await fetch(`/api/staff`);
                const data = await response.json();
                setData(data);
            }
            fetchData();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    return data.map((member, index) => (
        <Card key={index}>
            <CardHeader>
                <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={`/placeholder.jpg`
                    } alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
            </CardHeader>
            <CardFooter className="justify-center">
                <Badge>{member.role}</Badge>
            </CardFooter>
        </Card>
    ))
}