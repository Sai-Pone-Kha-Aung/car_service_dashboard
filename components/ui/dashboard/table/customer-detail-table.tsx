import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../../table'
import { TabsContent } from '../../tabs'

const CustomerDetailTable = () => {
    return (
        <div>
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
                                    <TableHead>Vehicle</TableHead>
                                    <TableHead>Cost</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableHead>2021-10-12</TableHead>
                                    <TableHead>Oil Change</TableHead>
                                    <TableHead>Toyota Corolla</TableHead>
                                    <TableHead>$50.00</TableHead>
                                </TableRow>
                                <TableRow>
                                    <TableHead>2021-10-10</TableHead>
                                    <TableHead>Brake Service</TableHead>
                                    <TableHead>Honda Civic</TableHead>
                                    <TableHead>$100.00</TableHead>
                                </TableRow>
                                <TableRow>
                                    <TableHead>2021-10-08</TableHead>
                                    <TableHead>General Inspection</TableHead>
                                    <TableHead>Toyota Camry</TableHead>
                                    <TableHead>$25.00</TableHead>
                                </TableRow>
                            </TableBody>
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
                                    <TableHead>Time</TableHead>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Vehicle</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableHead>2023-07-05</TableHead>
                                    <TableHead>10:00 AM</TableHead>
                                    <TableHead>Annual Inspection</TableHead>
                                    <TableHead>Toyota Camry</TableHead>
                                </TableRow>
                                <TableRow>
                                    <TableHead>2021-10-10</TableHead>
                                    <TableHead>2:00 PM</TableHead>
                                    <TableHead>Oil Change</TableHead>
                                    <TableHead>Honda Civic</TableHead>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </div>
    )
}

export default CustomerDetailTable