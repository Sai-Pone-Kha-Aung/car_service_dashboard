import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '../../button';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../../dropdown-menu';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
const appointments = [
    {
        id: 1,
        name: 'Alice Johnson',
        vehicle: '2019 Toyota Camry',
        serviceType: 'Oil Change',
        date: '2023-06-15',
        status: 'Completed'
    },
    {
        id: 2,
        name: 'Bob Smith',
        vehicle: '2020 Honda Accord',
        serviceType: 'Tire Rotation',
        date: '2023-07-20',
        status: 'In Progress'
    },
    {
        id: 3,
        name: 'Charlie Brown',
        vehicle: '2018 Ford Focus',
        serviceType: 'Brake Inspection',
        date: '2023-08-10',
        status: 'Pending'
    },
    {
        id: 4,
        name: 'Diana Prince',
        vehicle: '2021 Tesla Model 3',
        serviceType: 'Battery Check',
        date: '2023-09-05',
        status: 'Completed'
    },
    {
        id: 5,
        name: 'Ethan Hunt',
        vehicle: '2017 Chevrolet Malibu',
        serviceType: 'Transmission Repair',
        date: '2023-10-01',
        status: 'In Progress'
    }
];

const AppointmentsTable = () => {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Service Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appointments.map((appointment, index) => (
                        <TableRow key={index}>
                            <TableCell>{appointment.name}</TableCell>
                            <TableCell>{appointment.vehicle}</TableCell>
                            <TableCell>{appointment.serviceType}</TableCell>
                            <TableCell>{appointment.date}</TableCell>
                            <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                    appointment.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                        appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                                            'bg-red-100 text-red-800'
                                    }`}>
                                    {appointment.status}
                                </span>
                            </TableCell>
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
                                        <DropdownMenuItem>
                                            <Edit className='mr-2 h-4 w-4' /> Edit
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
            </Table>
        </div>
    )
}

export default AppointmentsTable