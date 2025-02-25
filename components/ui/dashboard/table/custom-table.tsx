'use client'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { usePathname, useRouter } from 'next/navigation';
import { EditCar, EditInventory, EditService, EditAppointment, EditStaff, EditOrder } from '@/utils/edit-form';
import { AddCustomer } from '@/utils/add-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface IColumn {
    header: string,
    accessor: string
}

// interface CustomerData {
//     id: number;
//     [key: string]: string | number;
// }

interface AvatarData {
    data: number[];
}

interface CustomerData {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    cars: Car[];
    orders: OrderData[];
    avatar?: string | AvatarData;
    password: string;
    appointments: AppointmentData[];
    cart: CartItem[];
    payments: PaymentData[];
    createdAt: string;
    updatedAt: string;
    [key: string]: any;
}

interface ICustomTable<T> {
    columns: IColumn[];
    data: T[];
}

interface BlogData {
    id: number;
    title: string;
    category: string;
    tags: string;
    image: string;
    content: string;
    createdat: string;
}

interface AppointmentServices {
    appointment_id: number;
    service_id: number;
    mechanic_id: number;
    appointment_name: string;
    appointment_car: string;
    appointment_date: string;
    appointment_status: string;
    service_name: string;
    service_price: string;
    mechanic_name: string;
    mechanic_role: string;
    mechanic_email: string;
    user_name: string;
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
    const isOrderPath = pathname === '/admin/orders';
    const isBlogPath = pathname === '/admin/blog';

    const editById = (id: number) => {
        if (pathname === '/admin/customers') {
            router.push(`/admin/customers/${id}`)
        }

        if (pathname === '/admin/blog') {
            router.push(`/admin/blog/${id}`)
        }
    }

    const switchEditForm = (row: T) => {
        switch (true) {
            case isAppointmentsPath || isHomePath:
                return <EditAppointment appointmentData={row as AppointmentData} />
            case isServicesPath:
                return <EditService serviceData={row as Service} />
            case isInventoryPath:
                return <EditInventory product={row as Product} />
            case isCarPath:
                return <EditCar carData={row as CarData} />
            case isStaffPath:
                return <EditStaff staffData={row as StaffData} />
            case isOrderPath:
                return <EditOrder orderData={row as OrderData} />
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
                        case 'Upcoming':
                            return 'bg-blue-100 text-blue-800';
                        case 'Cancelled':
                            return 'bg-red-100 text-red-800';
                        case 'Walk-In':
                            return 'bg-purple-100 text-purple-800';
                        case 'Pending':
                            return 'bg-orange-100 text-yellow-800';
                        case 'On The Way':
                            return 'bg-violet-100 text-blue-800';
                        default:
                            return '';
                    }
                })();
                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
                        {status}
                    </span>
                );
            case 'appointment_status':
                const appoint = (row as AppointmentServices)[column.accessor];
                const appointmentServices_Status = (() => {
                    switch (appoint) {
                        case 'Completed':
                            return 'bg-green-100 text-green-800';
                        case 'In Service':
                            return 'bg-yellow-100 text-yellow-800';
                        case 'Upcoming':
                            return 'bg-blue-100 text-blue-800';
                        case 'Cancelled':
                            return 'bg-red-100 text-red-800';
                        case 'Walk-In':
                            return 'bg-purple-100 text-purple-800';
                        case 'Pending':
                            return 'bg-orange-100 text-yellow-800';
                        case 'On The Way':
                            return 'bg-violet-100 text-blue-800';
                        default:
                            return '';
                    }
                })();
                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${appointmentServices_Status}`}>
                        {appoint}
                    </span>
                );
            case 'price':
                return `$${(row as Product)[column.accessor]}`;

            case 'avatar':

                const avatar = (row as CustomerData)[column.accessor];

                return (
                    <Avatar className='mx-2'>
                        <AvatarImage
                            src={avatar as string}
                            alt="Customer Avatar"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                );

            case 'paymentstatus':
                const paymentStatus = (row as PaymentData)[column.accessor];
                const paymentStatusClass = (() => {
                    switch (paymentStatus) {
                        case 'Completed':
                            return 'bg-green-100 text-green-800';
                        case 'Pending':
                            return 'bg-yellow-100 text-yellow-800';
                        default:
                            return '';
                    }
                })();
                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${paymentStatusClass}`}>
                        {paymentStatus}
                    </span>
                );
            case 'createdat':
                return new Date((row as BlogData)[column.accessor]).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
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
                            <h1 className='text-2xl font-bold'>Daily Customer - Walk-In</h1>
                        </CardTitle>
                        <AddCustomer />
                    </div>
                </CardHeader>}
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column, index) => (
                                column.accessor === 'avatar' ? (
                                    <TableHead key={index}></TableHead>
                                ) : (
                                    <TableHead key={index}>{column.header}</TableHead>
                                )
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
                                    {isAppointmentsPath || isServicesPath || isInventoryPath || isHomePath || isCarPath || isStaffPath || isOrderPath ? (
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
                                                <DropdownMenuItem onClick={() => editById((row as CustomerData).id)}>
                                                    <Edit className='mr-2 h-4 w-4' /> Edit
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