"use client"

import { useEffect, useState } from "react"
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
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

interface AppointmentData {
    id: number;
    name: string;
    car: string;
    user_id: number;
    service: string[];
    date: string;
    status: string;
    time: string;
    appointment_id: number;
    mechanics: string[];
}

interface StaffData {
    id: number;
    name: string;
    role: string;
    email: string;
    avatar: string;
}

interface Service {
    id: number;
    name: string;
    price: number;
    title: string;
    description: string;
    category: string;
}

export default function AppointmentManager() {
    const { id } = useParams();
    const [data, setData] = useState<AppointmentData[]>([]);
    const [appointments, setAppointments] = useState<AppointmentData[]>([]);
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [staff, setStaff] = useState<StaffData[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<string | undefined>();
    const [selectedMechanic, setSelectedMechanic] = useState<string | undefined>();
    const [selectedTime, setSelectedTime] = useState<string | undefined>();
    const [selectedCar, setSelectedCar] = useState<string | undefined>();
    const [car, setCar] = useState<Car[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    const { isAuthenticated, userData } = useAuth()
    const fetchData = async () => {
        const response = await fetch(`/api/user/${userData?.id}`);
        const result = await response.json();
        if (response.ok) {
            console.log("Result", result);
            setData(result.appointments);
            setCar(result.cars);
        } else {
            console.error("Error fetching appointments");
        }
    };

    const fetchStaff = async () => {
        const response = await fetch(`/api/staff`);
        const data = await response.json();
        console.log("Staff", data);
        setStaff(data);
    }

    const fetchServices = async () => {
        const response = await fetch(`/api/service`);
        const data = await response.json();
        console.log("Services", data);
        setServices(data);
    }
    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
            fetchStaff();
            fetchServices();
        }
    }, [isAuthenticated, userData]);

    const fetchAppointments = async () => {
        const response = await fetch(`/api/appointment/user?id=${userData?.id}`);
        const data = await response.json();
        console.log("Appointments", data);
        if (Array.isArray(data)) {
            setAppointments(data.filter((apt: AppointmentData) => apt.user_id === userData?.id));
        } else {
            console.error("Error fetching appointments for user ID:", id);
        }
    }

    useEffect(() => {
        if (isAuthenticated && id) {
            fetchAppointments();
        }
    }, [isAuthenticated, id]);

    const handleBookAppointment = async () => {
        if (!selectedService || !selectedMechanic || !date || !selectedTime) {
            alert("Please fill all fields");
            return;
        }

        const service = services.find(s => s.name === selectedService);
        const mechanic = staff.find(m => m.name === selectedMechanic);


        if (!service || !mechanic) {
            alert("Invalid service or mechanic");
            return;
        }

        const body = {
            user_id: userData?.id,
            name: service.name,
            car: selectedCar || car[0].make + " " + car[0].model,
            service: [service],
            date: date.toISOString(),
            time: selectedTime,
            status: "upcoming",
            mechanics: [mechanic],
        };
        try {

            const response = await fetch(`/api/appointment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                alert("Appointment booked successfully!");
                router.refresh();
            } else {
                alert("Failed to book appointment.");
            }
        } catch (error) {
            console.error("Error booking appointment:", error);
            alert("Failed to book appointment.");
        }
    }

    const handleCancelAppointment = async (id: number) => {
        try {
            const response = await fetch(`/api/appointment`, {
                method: "PUT", // Change from DELETE to PUT
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, status: "cancelled" }), // Only send id and status
            });

            if (response.ok) {
                alert("Appointment cancelled successfully!");
                fetchAppointments(); // Refresh the appointments list
                fetchData(); // Also refresh the data state to reflect the change
            } else {
                alert("Failed to cancel appointment.");
            }
        } catch (error) {
            console.error("Error cancelling appointment:", error);
            alert("Failed to cancel appointment.");
        }
    };


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
                                    <Select onValueChange={setSelectedTime}>
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
                                    <label htmlFor="service" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Choose Services</label>
                                    <Select onValueChange={setSelectedService}>
                                        <SelectTrigger id="service">
                                            <SelectValue placeholder="Select service" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            {services.map((service) => (
                                                <SelectItem key={service.id} value={service.name}>
                                                    {service.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <label htmlFor="mechanic" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Choose Mechanic</label>
                                    <Select onValueChange={setSelectedMechanic}>
                                        <SelectTrigger id="mechanic">
                                            <SelectValue placeholder="Select mechanic" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            {staff.map((mechanic) => (
                                                <SelectItem key={mechanic.id} value={mechanic.name}>
                                                    {mechanic.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <label htmlFor="car" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Choose Your Car</label>
                                    <Select onValueChange={setSelectedCar}>
                                        <SelectTrigger id="car">
                                            <SelectValue placeholder="Select car" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            {car.map((car) => (
                                                <SelectItem key={`${car.id}-${car.make}`} value={`${car.make} ${car.model}`}>
                                                    {car.make} {car.model}
                                                </SelectItem>
                                            )) ?? <SelectItem value="No cars found">No cars found</SelectItem>}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button className="w-full" onClick={handleBookAppointment}>Book Appointment</Button>
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
                                        {data
                                            ?.filter((apt) => apt.status === "upcoming" || apt.status === "Upcoming")
                                            .map((appointment, index) => (
                                                <div
                                                    key={index}
                                                    className="mb-4 rounded-lg border p-4 hover:bg-muted/50"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-medium">{String(appointment.name)}</h3>
                                                            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                                                <CalendarIcon className="h-4 w-4" />
                                                                {new Date(appointment.date).toLocaleDateString()}
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
                                                        <Button onClick={() => handleCancelAppointment(appointment.appointment_id)} variant="destructive" size="sm">
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                    </ScrollArea>
                                </TabsContent>
                                <TabsContent value="completed">
                                    <ScrollArea className="h-[400px] pr-4">
                                        {data
                                            .filter((apt) => apt.status === "completed")
                                            .map((appointment) => (
                                                <div
                                                    key={appointment.id}
                                                    className="mb-4 rounded-lg border p-4 hover:bg-muted/50"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-medium">{String(appointment.service)}</h3>
                                                            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                                                <CalendarIcon className="h-4 w-4" />
                                                                {new Date(appointment.date).toLocaleDateString()}
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
                                    <ScrollArea className="h-[400px] pr-4">
                                        {data
                                            ?.filter((apt) => apt.status === "cancelled")
                                            .map((appointment) => (
                                                <div
                                                    key={appointment.id}
                                                    className="mb-4 rounded-lg border p-4 hover:bg-muted/50"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-medium">{String(appointment.name)}</h3>
                                                            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                                                <CalendarIcon className="h-4 w-4" />
                                                                {new Date(appointment.date).toLocaleDateString()}
                                                                <Clock className="h-4 w-4 ml-2" />
                                                                {appointment.time}
                                                            </div>
                                                        </div>
                                                        <Badge variant="secondary">{appointment.status}</Badge>
                                                    </div>
                                                    <div className="mt-4 flex gap-2">
                                                        <Button onClick={() => router.push('/services')} variant="outline" size="sm">
                                                            Book Again
                                                        </Button>
                                                    </div>
                                                </div>
                                            )) ?? <div>No cancelled appointments found.</div>}
                                    </ScrollArea>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

