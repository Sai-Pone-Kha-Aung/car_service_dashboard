'use client'
import React from 'react'
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


const Page = () => {
    const router = useRouter();
    const columns = Object.keys(blogData[0])
        .filter(key => key !== 'id' && key !== 'content' && key !== 'image')
        .map((key) => ({
            header: key.charAt(0).toUpperCase() + key.slice(1),
            accessor: key
        }))
    const data = blogData
    const { setSearchQuery, searchResults } = useSearch(data, 'tags');
    const { sortedData, sortOrder, handleSort } = useSort(searchResults, 'tags');
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