'use client'
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { appointments } from '@/constants/Data'
import { format } from 'date-fns'

interface AppointmentData {
    appointment_id: number;
    service_id: number;
    mechanic_id: number;
    appointment_name: string;
    appointment_car: string;
    appointment_date: string;
    appointment_time: string;
    appointment_status: string;
    service_name: string;
    service_price: string;
    mechanic_name: string;
    mechanic_role: string;
    mechanic_email: string;
    user_name: string;
}

const RecentAppointments = () => {
    const [data, setData] = useState<AppointmentData[]>([]);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/appointmentServices');
            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }
            const response = await res.json();
            setData(response);
        } catch (error) {
            console.error("Failed to fetch");
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    const filteredAppointments = data.filter(appointment => appointment.appointment_status !== 'Walk-In');

    const sortedAppointments = filteredAppointments
        .sort((a, b) => new Date(b.appointment_date).getTime() - new Date(a.appointment_date).getTime())
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
                                <TableHead>Time</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedAppointments.map((appointment, index) => (
                                <TableRow key={index}>
                                    <TableCell>{appointment.user_name}</TableCell>
                                    <TableCell>{appointment.appointment_car}</TableCell>
                                    <TableCell>{format(new Date(appointment.appointment_date), 'dd/MM/yyyy')}</TableCell>
                                    <TableCell>{appointment.appointment_time}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${appointment.appointment_status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                appointment.appointment_status === 'In Service' ? 'bg-yellow-100 text-yellow-800' :
                                                    appointment.appointment_status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {appointment.appointment_status}
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