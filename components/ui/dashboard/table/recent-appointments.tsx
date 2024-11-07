import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../table'

const RecentAppointmentsData = [
    {
        customer: 'Alice Johnson',
        vehicle: 'Toyota Corolla',
        date: '2021-10-12',
        status: 'Completed',
    },
    {
        customer: 'John Miller',
        vehicle: 'Honda Civic',
        date: '2021-10-10',
        status: 'In Progress',
    },
    {
        customer: 'Jane Doe',
        vehicle: 'Toyota Camry',
        date: '2021-10-08',
        status: 'Cancelled'
    },
    {
        customer: 'McKenzie Scott',
        vehicle: 'Ford Wildtrak',
        date: '2021-10-08',
        status: 'Scheduled'
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
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                    appointment.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                                        appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {appointment.status}
                                        </span>

                                    </TableCell>
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