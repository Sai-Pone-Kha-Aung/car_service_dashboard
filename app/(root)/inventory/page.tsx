import React from 'react'
import ContentTable from '@/components/ui/dashboard/table/custom-table'
import { stockData } from '@/constants/Data';

const columns = Object.keys(stockData[0])
    .filter(key => key !== 'id')
    .map((key) => ({
        header: key.charAt(0).toUpperCase() + key.slice(1),
        accessor: key
    }))

const page = () => {
    return (
        <div className='flex-1 overflow-y-auto p-6 bg-gray-100 h-full'>
            <ContentTable columns={columns} data={stockData} />
        </div>
    )
}

export default page