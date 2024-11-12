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
import EditVehicleForm from '../vehicles/edit-form';

interface IColumn {
    header: string,
    accessor: string
}

interface CustomerData {
    id: number;
    [key: string]: string | number;
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
    const isVehiclePath = pathname === '/vehicles';

    const editCustomerById = (id: number) => {
        if (pathname === '/customers') {
            router.push(`/customers/${id}`)
        }
    }

    const switchEditForm = (row: T) => {
        switch (true) {
            case isAppointmentsPath:
                return <EditAppointment appointmentData={row as AppointmentData} />
            case isServicesPath:
                return <EditServiceForm serviceData={row as ServiceData} />
            case isInventoryPath:
                return <EditInventoryForm stockData={row as Stock} />
            case isVehiclePath:
                return <EditVehicleForm vehicleData={row as VehicleData} />
            default:
                return null;
        }
    }

    const renderCellContent = (row: T, column: IColumn) => {
        switch (column.accessor) {
            case 'status':
                const status = (row as AppointmentData)[column.accessor];
                const statusClass = (() => {
                    switch (status) {
                        case 'Completed':
                            return 'bg-green-100 text-green-800';
                        case 'In Progress':
                            return 'bg-yellow-100 text-yellow-800';
                        case 'Scheduled':
                            return 'bg-blue-100 text-blue-800';
                        case 'Cancelled':
                            return 'bg-red-100 text-red-800';
                        default:
                            return '';
                    }
                })();
                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
                        {status}
                    </span>
                );
            case 'price':
                return `$${(row as Stock)[column.accessor]}`;
            default:
                return (row as CustomerData)[column.accessor];
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
                                        {renderCellContent(row, column)}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    {isAppointmentsPath || isServicesPath || isInventoryPath || isVehiclePath ? (
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
                                                <DropdownMenuItem onClick={() => editCustomerById((row as CustomerData).id)}>
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