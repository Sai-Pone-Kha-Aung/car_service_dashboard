"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarIcon, ChevronLeft, Package, PenToolIcon as Tool, Truck } from 'lucide-react'
import Link from "next/link"

interface Order {
    id: string
    type: "service" | "product"
    name: string
    date: Date
    status: "pending" | "in-progress" | "completed" | "cancelled"
    total: number
}

export default function OrderManager() {
    const [orders] = useState<Order[]>([
        {
            id: "ORD001",
            type: "service",
            name: "Oil Change",
            date: new Date(),
            status: "pending",
            total: 49.99,
        },
        {
            id: "ORD002",
            type: "product",
            name: "Brake Pads",
            date: new Date(Date.now() - 86400000),
            status: "completed",
            total: 79.99,
        },
        {
            id: "ORD003",
            type: "service",
            name: "Engine Diagnostics",
            date: new Date(Date.now() + 86400000),
            status: "in-progress",
            total: 129.99,
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
                                <TabsTrigger value="all">All Orders</TabsTrigger>
                                <TabsTrigger value="services">Services</TabsTrigger>
                                <TabsTrigger value="products">Products</TabsTrigger>
                            </TabsList>
                            <TabsContent value="all">
                                <OrderList orders={orders} />
                            </TabsContent>
                            <TabsContent value="services">
                                <OrderList orders={orders.filter(order => order.type === "service")} />
                            </TabsContent>
                            <TabsContent value="products">
                                <OrderList orders={orders.filter(order => order.type === "product")} />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function OrderList({ orders }: { orders: Order[] }) {
    return (
        <ScrollArea className="h-[500px] pr-4">
            {orders.map((order) => (
                <div
                    key={order.id}
                    className="mb-4 rounded-lg border p-4 hover:bg-muted/50"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="font-medium">{order.name}</h3>
                            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                <CalendarIcon className="h-4 w-4" />
                                {order.date.toLocaleDateString()}
                                {order.type === "service" ? (
                                    <Tool className="h-4 w-4 ml-2" />
                                ) : (
                                    <Package className="h-4 w-4 ml-2" />
                                )}
                                {order.type.charAt(0).toUpperCase() + order.type.slice(1)}
                            </div>
                        </div>
                        <div className="text-right">
                            <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                            <p className="mt-1 font-medium">${order.total.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm">
                            View Details
                        </Button>
                        {order.status === "pending" && (
                            <Button variant="destructive" size="sm">
                                Cancel Order
                            </Button>
                        )}
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

function getStatusVariant(status: Order["status"]): "default" | "secondary" | "destructive" | "outline" {
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

