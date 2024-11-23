'use client'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { usePathname, useRouter } from 'next/navigation';
import { EditCar, EditInventory, EditService, EditAppointment, EditStaff } from '@/utils/edit-form';
import { AddCustomer } from '@/utils/add-form';

interface IColumn {
    header: string,
    accessor: string
}

interface CustomerData {
    id: number;
    [key: string]: string | number;
}

interface ICustomTable<T> {
    columns: IColumn[];
    data: T[];
}

const CustomTable = <T,>({ columns, data }: ICustomTable<T>) => {
    const router = useRouter();
    const pathname = usePathname();
    const isAppointmentsPath = pathname === '/admin/appointments';
    const isServicesPath = pathname === '/admin/services';
    const isInventoryPath = pathname === '/admin/inventory';
    const isCarPath = pathname === '/admin/cars';
    const isHomePath = pathname === '/admin';
    const isStaffPath = pathname === '/admin/staffs';

    const editCustomerById = (id: number) => {
        if (pathname === '/admin/customers') {
            router.push(`/admin/customers/${id}`)
        }
    }

    const switchEditForm = (row: T) => {
        switch (true) {
            case isAppointmentsPath || isHomePath:
                return <EditAppointment appointmentData={row as AppointmentData} />
            case isServicesPath:
                return <EditService serviceData={row as ServiceData} />
            case isInventoryPath:
                return <EditInventory stockData={row as Stock} />
            case isCarPath:
                return <EditCar carData={row as CarData} />
            case isStaffPath:
                return <EditStaff staffData={row as StaffData} />
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
                        case 'In Service':
                            return 'bg-yellow-100 text-yellow-800';
                        case 'Scheduled':
                            return 'bg-blue-100 text-blue-800';
                        case 'Cancelled':
                            return 'bg-red-100 text-red-800';
                        case 'Walk-In':
                            return 'bg-purple-100 text-purple-800';
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
                {isHomePath && <CardHeader
                >
                    <div className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle>
                            <h1 className='text-2xl font-bold'>Daily Customer</h1>
                        </CardTitle>
                        <AddCustomer />
                    </div>
                </CardHeader>}
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
                                    {isAppointmentsPath || isServicesPath || isInventoryPath || isHomePath || isCarPath || isStaffPath ? (
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

export default CustomTable