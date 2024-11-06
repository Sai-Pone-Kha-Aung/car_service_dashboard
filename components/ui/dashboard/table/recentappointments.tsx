import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../table'

const RecentAppointmentsData = [
    {
        customer: 'Alice Johnson',
        vehicle: 'Toyota Corolla',
        date: '2021-10-12',
        status: <span className='bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded'>Completed</span>
    },
    {
        customer: 'John Miller',
        vehicle: 'Honda Civic',
        date: '2021-10-10',
        status: <span className='bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded'>In Progress</span>
    },
    {
        customer: 'Jane Doe',
        vehicle: 'Toyota Camry',
        date: '2021-10-08',
        status: <span className='bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded'>Cancelled</span>
    },
    {
        customer: 'McKenzie Scott',
        vehicle: 'Ford Wildtrak',
        date: '2021-10-08',
        status: <span className='bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded'>Scheduled</span>
    }
]

const RecentAppointments = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Vehicle</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {RecentAppointmentsData.map((appointment, index) => (
                                <TableRow key={index}>
                                    <TableCell>{appointment.customer}</TableCell>
                                    <TableCell>{appointment.vehicle}</TableCell>
                                    <TableCell>{appointment.date}</TableCell>
                                    <TableCell>{appointment.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default RecentAppointments