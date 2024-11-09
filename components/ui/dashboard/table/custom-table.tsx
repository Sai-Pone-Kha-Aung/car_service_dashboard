'use client'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '../../button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../../dropdown-menu';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { Card } from '../../card';
import { usePathname, useRouter } from 'next/navigation';
import EditAppointment from '../appointment/edit-appointment';
import EditServiceForm from '../services/edit-form';
import EditInventoryForm from '../inventory/edit-form';

interface IColumn {
    header: string,
    accessor: string
}

interface CustomerData {
    id: number;
    [key: string]: any;
}

interface IContentTable<T> {
    columns: IColumn[];
    data: T[];
}

const ContentTable = <T,>({ columns, data }: IContentTable<T>) => {
    const router = useRouter();
    const pathname = usePathname();
    const isAppointmentsPath = pathname === '/appointments';
    const isServicesPath = pathname === '/services';
    const isInventoryPath = pathname === '/inventory';

    const handleEdit = (id: number) => {
        if (pathname === '/customers') {
            router.push(`/customers/${id}`)
        }
    }

    const switchEditForm = (row: T) => {
        if (isAppointmentsPath) {
            return <EditAppointment appointmentData={row as AppointmentData} />
        }

        if (isServicesPath) {
            return <EditServiceForm serviceData={row as ServiceData} />
        }

        if (isInventoryPath) {
            return <EditInventoryForm stockData={row as Stock} />
        }
    }

    return (
        <>
            <Card className='p-2'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableHead key={index}>{column.header}</TableHead>
                            ))}
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {columns.map((column, colIndex) => (
                                    <TableCell key={colIndex}>
                                        {column.accessor === 'status' ? (
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${(row as AppointmentData)[column.accessor] === 'Completed' ? 'bg-green-100 text-green-800' :
                                                (row as AppointmentData)[column.accessor] === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                                    (row as AppointmentData)[column.accessor] === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                                                        (row as AppointmentData)[column.accessor] === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                                            (row as CustomerData)[column.accessor as keyof CustomerData]
                                                }`}>
                                                {(row as AppointmentData)[column.accessor]}
                                            </span>
                                        ) : column.accessor === 'price' ? (
                                            `$${(row as Stock)[column.accessor]}`
                                        ) : (
                                            (row as CustomerData)[column.accessor]
                                        )}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    {isAppointmentsPath || isServicesPath || isInventoryPath ? (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className='h-8 w-8 p-0'>
                                                    <span className='sr-only'>Open menu</span>
                                                    <MoreHorizontal className='h-4 w-4' />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align='end'>
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                    {switchEditForm(row)}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Trash className='mr-2 h-4 w-4' /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    ) : (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className='h-8 w-8 p-0'>
                                                    <span className='sr-only'>Open menu</span>
                                                    <MoreHorizontal className='h-4 w-4' />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align='end'>
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => handleEdit((row as CustomerData).id)}>
                                                    <Edit className='mr-2 h-4 w-4' /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Trash className='mr-2 h-4 w-4' /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </>
    )
}

export default ContentTable