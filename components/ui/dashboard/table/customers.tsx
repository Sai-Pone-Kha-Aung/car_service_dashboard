'use client'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '../../button';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../../dropdown-menu';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

const customers = [
    {
        id: 1,
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        phone: '555-1234',
        address: '123 Maple Street, Springfield, IL'
    },
    {
        id: 2,
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        phone: '555-5678',
        address: '456 Oak Avenue, Springfield, IL'
    },
    {
        id: 3,
        name: 'Carol White',
        email: 'carol.white@example.com',
        phone: '555-8765',
        address: '789 Pine Road, Springfield, IL'
    },
    {
        id: 4,
        name: 'David Brown',
        email: 'david.brown@example.com',
        phone: '555-4321',
        address: '101 Birch Lane, Springfield, IL'
    },
    {
        id: 5,
        name: 'Eve Black',
        email: 'eve.black@example.com',
        phone: '555-6789',
        address: '202 Cedar Street, Springfield, IL'
    }
];

const CustomersTable = () => {
    const router = useRouter();
    return (
        <div><Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {customers.map((customer) => (
                    <TableRow key={customer.id}>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{customer.address}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className='h-8 w-8 p-0'>
                                        <span className='sr-only'>Open menu</span>
                                        <MoreHorizontal className='h-4 w-4' />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end'>
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem >
                                        <Edit className='mr-2 h-4 w-4' /> <span
                                            onClick={() => router.push(`customers/${customer.id}`)}>
                                            Edit
                                        </span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Trash className='mr-2 h-4 w-4' /> Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table></div>
    )
}

export default CustomersTable