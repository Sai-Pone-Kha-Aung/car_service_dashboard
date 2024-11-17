import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { appointments } from '@/constants/Data'

const RecentAppointments = () => {
    const filteredAppointments = appointments.filter(appointment => appointment.status !== 'Walk-In');

    const sortedAppointments = filteredAppointments
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 4);
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
                                <TableHead>Car</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedAppointments.map((appointment, index) => (
                                <TableRow key={index}>
                                    <TableCell>{appointment.name}</TableCell>
                                    <TableCell>{appointment.car}</TableCell>
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