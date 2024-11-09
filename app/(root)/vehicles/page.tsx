import React from 'react'
import ContentTable from '@/components/ui/dashboard/table/custom-table'
import { vehicleData } from '@/constants/Data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const columns = Object.keys(vehicleData[0])
    .filter(key => key !== 'id')
    .map((key) => ({
        header: key.charAt(0).toUpperCase() + key.slice(1),
        accessor: key
    }))

const page = () => {
    return (
        <div className='flex-1 overflow-y-auto p-6 bg-gray-100 h-full'>
            <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center space-x-2'>
                    <Select defaultValue='A-Z' >
                        <SelectTrigger className='w-[180px] bg-white'>
                            <SelectValue placeholder="Filter by A-Z" />
                            <SelectContent>
                                <SelectItem value='A-Z'>
                                    A-Z
                                </SelectItem>
                                <SelectItem value='Z-A'>
                                    Z-A
                                </SelectItem>
                            </SelectContent>
                        </SelectTrigger>
                    </Select>
                </div>
                <div className='relative'>
                    <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input placeholder='Search vehicle' className='pl-8 w-[300px] bg-white' />
                </div>
            </div>
            <ContentTable columns={columns} data={vehicleData} />
        </div>
    )
}

export default page