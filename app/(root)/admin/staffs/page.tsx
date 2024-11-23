'use client'
import React from 'react'
import CustomTable from '@/components/ui/dashboard/table/custom-table'
import { staffData } from '@/constants/Data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AddStaff } from '@/utils/add-form';
import useSearch from '@/hooks/useSearch';
import useSort from '@/hooks/useSort';


const Page = () => {
    const columns = Object.keys(staffData[0])
        .filter(key => key !== 'id')
        .map((key) => ({
            header: key.charAt(0).toUpperCase() + key.slice(1),
            accessor: key
        }))
    const data = staffData
    const { setSearchQuery, searchResults } = useSearch(data, 'name');
    const { sortedData, sortOrder, handleSort } = useSort(searchResults, 'name')
    return (
        <div className='flex-1 overflow-y-auto p-6 bg-gray-100 h-full'>
            <div className='flex justify-between items-center mb-8'>
                <AddStaff />
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
                    <Input placeholder='Search by name' className='pl-8 w-[300px] bg-white' onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
            </div>
            <CustomTable columns={columns} data={sortedData} />
        </div>
    )
}

export default Page