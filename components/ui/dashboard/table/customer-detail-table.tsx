import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../../table'
import { TabsContent } from '../../tabs'
import { appointments } from '@/constants/Data'

const CustomerDetailTable = ({ data }: { data: CustomerData }) => {
    const appointmentData = appointments.filter((appointment) => appointment.name === data.name);

    return (
        <div className='my-4'>
            <TabsContent value='service-history'>
                <Card>
                    <CardHeader>
                        <CardTitle>Service History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Car</TableHead>
                                </TableRow>
                            </TableHeader>
                            {appointmentData.map((appointment) => (
                                <TableBody key={appointment.id}>
                                    <TableRow>
                                        <TableHead>{appointment.date}</TableHead>
                                        <TableHead>{appointment.service}</TableHead>
                                        <TableHead>{appointment.car}</TableHead>
                                    </TableRow>
                                </TableBody>
                            ))}
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value='upcoming-appointments'>
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Car</TableHead>
                                </TableRow>
                            </TableHeader>
                            {appointmentData.map((appointment) => (
                                appointment.status === 'Scheduled' ? (
                                    <TableBody key={appointment.id}>
                                        <TableRow>
                                            <TableHead>{appointment.date}</TableHead>
                                            <TableHead>{appointment.service}</TableHead>
                                            <TableHead>{appointment.car}</TableHead>
                                        </TableRow>
                                    </TableBody>
                                ) : (
                                    <TableBody key={appointment.id}>
                                        <TableRow>
                                            <TableHead>No upcoming appointment</TableHead>
                                        </TableRow>
                                    </TableBody>

                                )
                            ))}
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </div>
    )
}

export default CustomerDetailTable