'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import CustomTable from '@/components/ui/dashboard/table/custom-table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { customerData } from '@/constants/Data';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { AddCustomer } from '@/utils/add-form';
import useSearch from '@/hooks/useSearch';
import useSort from '@/hooks/useSort';

const Page = () => {
    const [data, setData] = useState<CustomerData[]>([]);
    const [error, setError] = useState<string>('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/customer');
                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }
                const data = await res.json();
                console.log("fetchData", data);
                setData(data);
            } catch (error) {
                setError("Failed to fetch");
            }
        };
        fetchData();
    }, []);

    const columns = data.length > 0 ? Object.keys(customerData[0])
        .filter(key => key !== 'id' && key !== 'cars')
        .map((key) => ({
            header: key.charAt(0).toUpperCase() + key.slice(1),
            accessor: key
        })) : []

    const { setSearchQuery, searchResults } = useSearch(customerData, 'name')
    const { sortedData, sortOrder, handleSort } = useSort(searchResults, 'name')

    return (
        <div className='flex-1 bg-gray-100 h-full p-6'>
            <div className='flex justify-between items-center mb-8'>
                <AddCustomer />
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
                    <Input placeholder='Search customer by name' className='pl-8 w-[300px] bg-white' onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
            </div>
            <CustomTable columns={columns} data={sortedData} />

            <div className='flex justify-between items-center space-x-2 py-4'>
                <div className='flex-1 text-sm text-muted-foreground'>
                    Showing 10 of 50 appointments
                </div>
                <div className='flex items-center space-x-2'>
                    <Button variant="outline" size="sm">
                        <ChevronLeft className='h-4 w-4' />
                        Previous
                    </Button>
                    <Button variant="outline" size="sm">
                        Next
                        <ChevronRight className='h-4 w-4' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Page