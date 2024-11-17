'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Car, PenToolIcon as Tools, CheckCircle } from 'lucide-react'
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

const LandingPage = () => {
    const [date, setDate] = useState<Date>()

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
            <div className="max-w-4xl w-full space-y-8">
                <header className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-2">CarService Pro</h1>
                    <p className="text-xl text-blue-100">Expert care for your car, just a click away</p>
                </header>

                <Card className="w-full bg-white/10 backdrop-blur-lg border-none text-white">
                    <CardHeader>
                        <CardTitle className="text-2xl">Book Your Service Appointment</CardTitle>
                        <CardDescription className="text-blue-100">Fill in the details below to schedule your visit</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-blue-100">Full Name</Label>
                                <Input id="name" placeholder="John Doe" className="bg-white/20 border-none placeholder:text-blue-200 text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-blue-100">Email Address</Label>
                                <Input id="email" type="email" placeholder="john@example.com" className="bg-white/20 border-none placeholder:text-blue-200 text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-blue-100">Phone Number</Label>
                                <Input id="phone" type="tel" placeholder="(123) 456-7890" className="bg-white/20 border-none placeholder:text-blue-200 text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="car" className="text-blue-100">Car Model</Label>
                                <Input id="car" placeholder="Toyota Camry" className="bg-white/20 border-none placeholder:text-blue-200 text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="service" className="text-blue-100">Service Type</Label>
                                <Select>
                                    <SelectTrigger className="bg-white/20 border-none text-blue-100">
                                        <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="oil-change">Oil Change</SelectItem>
                                        <SelectItem value="tire-rotation">Tire Rotation</SelectItem>
                                        <SelectItem value="brake-service">Brake Service</SelectItem>
                                        <SelectItem value="general-inspection">General Inspection</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date" className="text-blue-100">Preferred Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal bg-white/20 border-none text-blue-100",
                                                !date && "text-blue-200"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Book Appointment</Button>
                    </CardFooter>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
                    <Card className="bg-white/10 backdrop-blur-lg border-none">
                        <CardHeader>
                            <Car className="w-10 h-10 mb-2" />
                            <CardTitle>Expert Technicians</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Our certified mechanics ensure top-notch service for your car.</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white/10 backdrop-blur-lg border-none">
                        <CardHeader>
                            <Tools className="w-10 h-10 mb-2" />
                            <CardTitle>State-of-the-Art Equipment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>We use the latest technology to diagnose and repair your car efficiently.</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white/10 backdrop-blur-lg border-none">
                        <CardHeader>
                            <CheckCircle className="w-10 h-10 mb-2" />
                            <CardTitle>Customer Satisfaction</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Our priority is your satisfaction, with transparent pricing and quality service.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default LandingPage