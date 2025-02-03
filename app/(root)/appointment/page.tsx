"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarIcon, ChevronLeft, Clock, PenToolIcon as Tool, Wrench } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from "next/link"

interface Appointment {
    id: string
    service: string
    date: Date
    time: string
    status: "upcoming" | "completed" | "cancelled"
}

export default function AppointmentManager() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [appointments] = useState<Appointment[]>([
        {
            id: "1",
            service: "Oil Change",
            date: new Date(),
            time: "10:00 AM",
            status: "upcoming",
        },
        {
            id: "2",
            service: "Break Repair",
            date: new Date(Date.now() + 86400000),
            time: "2:30 PM",
            status: "upcoming",
        },
        {
            id: "3",
            service: "Engine Diagnostics",
            date: new Date(Date.now() - 86400000),
            time: "11:00 AM",
            status: "completed",
        },
    ])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 p-6">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <Link href="/" className="text-white hover:underline flex items-center">
                        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Home
                    </Link>
                </div>
                <div className="mb-8 text-center text-white">
                    <h1 className="text-4xl font-bold">Manage Your Appointments</h1>
                    <p className="mt-2 text-lg">Schedule and track your car service appointments</p>
                </div>

                <div className="grid gap-6 md:grid-cols-[400px_1fr]">
                    <Card>
                        <CardHeader>
                            <CardTitle>Schedule Service</CardTitle>
                            <CardDescription>Select a date for your appointment</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border"
                            />
                            <div className="mt-4 space-y-4">
                                <div className="flex flex-col space-y-1.5">
                                    <label htmlFor="time" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Time</label>
                                    <Select>
                                        <SelectTrigger id="time">
                                            <SelectValue placeholder="Select time" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="09:00">09:00 AM</SelectItem>
                                            <SelectItem value="10:00">10:00 AM</SelectItem>
                                            <SelectItem value="11:00">11:00 AM</SelectItem>
                                            <SelectItem value="13:00">01:00 PM</SelectItem>
                                            <SelectItem value="14:00">02:00 PM</SelectItem>
                                            <SelectItem value="15:00">03:00 PM</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <label htmlFor="time" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Choose Services</label>
                                    <Select>
                                        <SelectTrigger id="service">
                                            <SelectValue placeholder="Select service" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="oil-change">Oil change</SelectItem>
                                            <SelectItem value="break-repair">Break Repair</SelectItem>
                                            <SelectItem value="engine-diagnostics">Engine Diagnostics</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <label htmlFor="time" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Choose Mechanic</label>
                                    <Select>
                                        <SelectTrigger id="mechanic">
                                            <SelectValue placeholder="Select mechanic" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="john-doe">John Doe</SelectItem>
                                            <SelectItem value="will-smith">Will Smith</SelectItem>
                                            <SelectItem value="mike-william">Mike William</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button className="w-full" onClick={() => alert("Booked")}>Book Appointment</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Your Appointments</CardTitle>
                            <CardDescription>View and manage your scheduled services</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="upcoming">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                                    <TabsTrigger value="completed">Completed</TabsTrigger>
                                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                                </TabsList>
                                <TabsContent value="upcoming">
                                    <ScrollArea className="h-[400px] pr-4">
                                        {appointments
                                            .filter((apt) => apt.status === "upcoming")
                                            .map((appointment) => (
                                                <div
                                                    key={appointment.id}
                                                    className="mb-4 rounded-lg border p-4 hover:bg-muted/50"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-medium">{appointment.service}</h3>
                                                            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                                                <CalendarIcon className="h-4 w-4" />
                                                                {appointment.date.toLocaleDateString()}
                                                                <Clock className="h-4 w-4 ml-2" />
                                                                {appointment.time}
                                                            </div>
                                                        </div>
                                                        <Badge variant="secondary">{appointment.status}</Badge>
                                                    </div>
                                                    <div className="mt-4 flex gap-2">
                                                        <Button variant="outline" size="sm">
                                                            Reschedule
                                                        </Button>
                                                        <Button variant="destructive" size="sm">
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                    </ScrollArea>
                                </TabsContent>
                                <TabsContent value="completed">
                                    <ScrollArea className="h-[400px] pr-4">
                                        {appointments
                                            .filter((apt) => apt.status === "completed")
                                            .map((appointment) => (
                                                <div
                                                    key={appointment.id}
                                                    className="mb-4 rounded-lg border p-4 hover:bg-muted/50"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-medium">{appointment.service}</h3>
                                                            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                                                <CalendarIcon className="h-4 w-4" />
                                                                {appointment.date.toLocaleDateString()}
                                                                <Clock className="h-4 w-4 ml-2" />
                                                                {appointment.time}
                                                            </div>
                                                        </div>
                                                        <Badge variant="secondary">{appointment.status}</Badge>
                                                    </div>
                                                    <div className="mt-4">
                                                        <Button variant="outline" size="sm">
                                                            Book Again
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                    </ScrollArea>
                                </TabsContent>
                                <TabsContent value="cancelled">
                                    <div className="flex h-[400px] items-center justify-center text-muted-foreground">
                                        No cancelled appointments
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

