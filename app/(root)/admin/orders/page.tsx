'use client'
import React, { useEffect, useState } from 'react'
import CustomTable from '@/components/ui/dashboard/table/custom-table'
import { customerData } from '@/constants/Data';
import { AddInventory, AddOrder } from '@/utils/add-form';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useSearch from '@/hooks/useSearch';
import useSort from '@/hooks/useSort';

interface OrderData {
    id: number;
    product: string;
    quantity: number;
    price: number;
    total: number;
    date: string;
    status: string;
    user_id: string;
    product_id: string;
    product_name: string;
    user_name: string;
}

const page = () => {
    const orderKeys = Object.keys(customerData[0].orders[0] || {});
    const paymentKeys = Object.keys(customerData[0].payments[0] || {});
    const combinedKeys = Array.from(new Set([...orderKeys, ...paymentKeys]));
    const [data, setData] = useState<OrderData[]>([]);
    const [userData, setUserData] = useState<CustomerData[]>([]);
    const [productData, setProductData] = useState<Product[]>([]);

    const fetchOrders = async () => {
        const res = await fetch('/api/order');
        const data = await res.json();
        console.log('Orders:', data);
        setData(data);
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const formattedData = data.map(order => {
        return {
            ...order,
            date: new Date(order.date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })
        };
    })

    const orderColumns = [
        { header: 'Name', accessor: 'user_name' },
        { header: 'Quantity', accessor: 'quantity' },
        { header: 'Product', accessor: 'product_name' },
        { header: 'Price', accessor: 'price' },
        { header: 'Total', accessor: 'total' },
        { header: 'Date', accessor: 'date' },
        { header: 'Status', accessor: 'status' },
        { header: 'Payment Status', accessor: 'paymentstatus' }
    ]

    // const orderData = data.map(order => {
    //     const user = userData.find(u => u.id === order.user_id);
    //     const product = productData.find(p => p.id === order.product_id);
    //     return {
    //         ...order,
    //         name: user?.name || 'Unknown',
    //         product: product?.name || 'Unknown'
    //     };
    // });
    const { setSearchQuery, searchResults } = useSearch(data, 'product');
    const { sortedData, sortOrder, handleSort } = useSort(searchResults, 'product');



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
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='A-Z'>
                                {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                            </SelectItem>
                            <SelectItem value='Z-A'>
                                {sortOrder === 'asc' ? 'Z-A' : 'A-Z'}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className='relative'>
                    <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input placeholder='Search product' className='pl-8 w-[300px] bg-white'
                        onChange={() => { }}
                    />
                </div>
            </div>
            <CustomTable columns={orderColumns} data={formattedData} />
        </div>
    )
}

export default page