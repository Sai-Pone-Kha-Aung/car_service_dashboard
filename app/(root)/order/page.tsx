"use client"

import { use, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarIcon, ChevronLeft, Package, PenToolIcon as Tool, Truck } from 'lucide-react'
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

interface OrderData {
    id: number;
    product_name: string;
    quantity: number;
    price: number;
    total: number;
    date: string;
    status: string;
    type: "service" | "product";
}
interface CustomerData {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    cars: Car[];
    orders: OrderData[];
    avatar?: string;
    password: string;
    appointments: AppointmentData[];
    cart: CartItem[];
    payments: PaymentData[];
    createdAt: string;
    updatedAt: string;
}

interface AppointmentData {
    appointment_id: number;
    id: number;
    name: string;
    car: string;
    user_id: number;
    service: Service[];
    date: string;
    status: string;
    time: string;
    mechanics: StaffData[];
}


export default function OrderManager() {
    const [data, setData] = useState<CustomerData[]>([]);
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [appointments, setAppointments] = useState<AppointmentData[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { userData, isAuthenticated } = useAuth();

    const fetchData = async () => {
        const response = await fetch(`/api/user/${userData?.id}`);
        const result = await response.json();
        if (response.ok) {
            console.log("Result", result);
            setOrders(result.orders);
            setAppointments(result.appointments);
        } else {
            console.error("Error fetching appointments");
        }
    };

    console.log("Orders", orders?.[0]?.product_name);

    useEffect(() => {
        if (isAuthenticated) {
            setIsLoggedIn(false);
            fetchData();
        }
    }, [isAuthenticated, userData]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 p-6">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <Link href="/" className="text-white hover:underline flex items-center">
                        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Home
                    </Link>
                </div>
                <div className="mb-8 text-center text-white">
                    <h1 className="text-4xl font-bold">Manage Your Orders</h1>
                    <p className="mt-2 text-lg">View and track your services and product orders</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Your Orders</CardTitle>
                        <CardDescription>View and manage your orders for services and products</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="all">
                            <TabsList className="mb-4">
                                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                                <TabsTrigger value="products">Products</TabsTrigger>
                            </TabsList>
                            <TabsContent value="appointments">
                                <AppointmentList appointments={appointments} />
                            </TabsContent>
                            <TabsContent value="products">
                                <OrderList orders={orders} />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function OrderList({ orders }: { orders: OrderData[] }) {
    return (
        <ScrollArea className="h-[500px] pr-4">
            {orders?.map((order) => (
                <div
                    key={order.id}
                    className="mb-4 rounded-lg border p-4 hover:bg-muted/50"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="font-medium">{order.product_name}</h3>
                            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                <CalendarIcon className="h-4 w-4" />
                                {new Date(order.date).toLocaleDateString()}

                                <Package className="h-4 w-4 ml-2" />
                                {order.product_name}
                            </div>
                        </div>
                        <div className="text-right">
                            <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                            <p className="mt-1 font-medium">${order.total}</p>
                        </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                        {order.status === "completed" && order.type === "product" && (
                            <Button variant="outline" size="sm">
                                <Truck className="mr-2 h-4 w-4" />
                                On the Way
                            </Button>
                        )}
                    </div>
                </div>
            ))}
        </ScrollArea>
    )
}

function AppointmentList({ appointments, }: { appointments: AppointmentData[] }) {


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
            } else {
                alert("Failed to cancel appointment.");
            }
        } catch (error) {
            console.error("Error cancelling appointment:", error);
            alert("Failed to cancel appointment.");
        }
    };
    return (
        <ScrollArea className="h-[500px] pr-4">
            {appointments?.map((appointment) => (
                <div
                    key={appointment.appointment_id}
                    className="mb-4 rounded-lg border p-4 hover:bg-muted/50"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="font-medium">{appointment.name}</h3>
                            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                <CalendarIcon className="h-4 w-4" />
                                {new Date(appointment.date).toLocaleDateString()}
                                <Tool className="h-4 w-4 ml-2" />
                                {appointment.name}
                            </div>
                        </div>
                        <div className="text-right">
                            <Badge variant={getStatusVariant(appointment.status)}>{appointment.status}</Badge>
                        </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                        {(appointment.status === "upcoming" || appointment.status === "Upcoming") && (
                            <Button variant="destructive" size="sm" onClick={() => handleCancelAppointment(appointment.appointment_id)}>
                                Cancel Appointment
                            </Button>
                        )}
                    </div>
                </div>
            ))}
        </ScrollArea>
    )
}

function getStatusVariant(status: OrderData["status"]): "default" | "secondary" | "destructive" | "outline" {
    switch (status) {
        case "pending":
            return "default"
        case "in-progress":
            return "secondary"
        case "completed":
            return "outline"
        case "cancelled":
            return "destructive"
        default:
            return "default"
    }
}

