'use client'
import React, { useState, useEffect } from 'react'
import CustomTable from '@/components/ui/dashboard/table/custom-table'
import { blogData, carData } from '@/constants/Data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AddCustomerCar } from '@/utils/add-form';
import useSearch from '@/hooks/useSearch';
import useSort from '@/hooks/useSort';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface BlogData {
    id: number;
    title: string;
    category: string;
    tags: string;
    image: string;
    content: string;
    createdat: Date;
}

const Page = () => {
    const router = useRouter();

    const [data, setData] = useState<BlogData[]>([])
    const { setSearchQuery, searchResults } = useSearch(data, 'tags');
    const { sortedData, sortOrder, handleSort } = useSort(searchResults, 'tags');
    const columns = data.length > 0 ? Object.keys(data[0])
        .filter(key => key !== 'id' && key !== 'content' && key !== 'image')
        .map((key) => ({
            header: key.charAt(0).toUpperCase() + key.slice(1),
            accessor: key
        })) : []

    const fetchData = async () => {
        const res = await fetch('/api/blog')
        const data = await res.json()
        console.log(data)
        setData(data)

        if (res.ok) {
            console.log("Fetched Blog")
        } else {
            console.log("Fetching Error")
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    console.log("Blog:", data)

    return (
        <div className='flex-1 overflow-y-auto p-6 bg-gray-100 h-full'>
            <div className='flex justify-between items-center mb-8'>
                <Button className='font-semibold' onClick={() => router.push("blog/add-blog")}>
                    <Plus className='mr-2 h-4 w-4' />
                    Add New Blog
                </Button>
            </div>
            <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center space-x-2'>
                    <Select defaultValue='A-Z' onValueChange={handleSort}>
                        <SelectTrigger className='w-[180px] bg-white'>
                            <SelectValue placeholder="Filter by A-Z" />
                            <SelectContent>
                                <SelectItem value='A-Z'>
                                    {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                                </SelectItem>
                                <SelectItem value='Z-A'>
                                    {sortOrder === 'asc' ? 'Z-A' : 'A-Z'}
                                </SelectItem>
                            </SelectContent>
                        </SelectTrigger>
                    </Select>
                </div>
                <div className='relative'>
                    <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input placeholder='Search by category' className='pl-8 w-[300px] bg-white' onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
            </div>
            <CustomTable columns={columns} data={sortedData} />
        </div>
    )
}

export default Page