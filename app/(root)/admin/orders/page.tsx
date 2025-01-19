'use client'
import React, { useEffect } from 'react'
import CustomTable from '@/components/ui/dashboard/table/custom-table'
import { customerData, stockData } from '@/constants/Data';
import { AddInventory, AddOrder } from '@/utils/add-form';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useSearch from '@/hooks/useSearch';
import useSort from '@/hooks/useSort';

const page = () => {
    const columns = [
        { header: 'Name', accessor: 'name' },
        ...Object.keys(customerData[0].orders[0])
            .filter(key => key !== 'id')
            .map((key) => ({
                header: key.charAt(0).toUpperCase() + key.slice(1),
                accessor: key
            }))
    ];

    const data = customerData
        .flatMap(customer => customer
            .orders.map(order => ({
                ...order,
                name: customer.name
            })))
    // const { setSearchQuery, searchResults } = useSearch(data, 'product');
    // const { sortedData, sortOrder, handleSort } = useSort(searchResults, 'product');

    return (
        <div className='flex-1 overflow-y-auto p-6 bg-gray-100 h-full'>
            <div className='flex justify-between items-center mb-8'>
                <AddOrder />
            </div>
            <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center space-x-2'>
                    <Select defaultValue='A-Z' onValueChange={() => { }}>
                        <SelectTrigger className='w-[180px] bg-white'>
                            <SelectValue placeholder="Filter by A-Z" />
                            <SelectContent>
                                <SelectItem value='A-Z'>
                                    {/* {sortOrder === 'asc' ? 'A-Z' : 'Z-A'} */}
                                    A-Z
                                </SelectItem>
                                <SelectItem value='Z-A'>
                                    {/* {sortOrder === 'asc' ? 'Z-A' : 'A-Z'} */}
                                    Z-A
                                </SelectItem>
                            </SelectContent>
                        </SelectTrigger>
                    </Select>
                </div>
                <div className='relative'>
                    <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input placeholder='Search product' className='pl-8 w-[300px] bg-white'
                        onChange={() => { }}
                    />
                </div>
            </div>
            <CustomTable columns={columns} data={data} />
        </div>
    )
}

export default page