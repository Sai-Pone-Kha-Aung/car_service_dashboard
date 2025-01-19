'use client'

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ShoppingCart, Star, ChevronLeft, Wrench, Clock, DollarSign, CheckCircle } from 'lucide-react'

export default function SingleServicePage() {
    return (
        <>

            {/* Service Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <Link href="/services" className="text-blue-600 hover:underline flex items-center">
                        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Services
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Service Details */}
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Full Car Service</h1>
                            <Badge variant="secondary" className="mb-4">
                                <Clock className="mr-1 h-4 w-4" />
                                Estimated time: 3-4 hours
                            </Badge>
                        </div>
                        <p className="text-gray-700">
                            Our Full Car Service is a comprehensive maintenance package designed to keep your vehicle
                            in top condition. Our expert technicians will perform a thorough inspection and service
                            of your car, ensuring optimal performance, safety, and longevity.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Wrench className="mr-2 h-5 w-5 text-blue-600" />
                                        What's Included
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Oil and filter change</li>
                                        <li>Brake system check</li>
                                        <li>Tire rotation and pressure check</li>
                                        <li>Battery health test</li>
                                        <li>Fluid levels top-up</li>
                                        <li>Air filter replacement</li>
                                        <li>Multi-point vehicle inspection</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                                        Benefits
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Improved vehicle performance</li>
                                        <li>Enhanced fuel efficiency</li>
                                        <li>Extended vehicle lifespan</li>
                                        <li>Increased safety on the road</li>
                                        <li>Prevention of major repairs</li>
                                        <li>Maintenance of warranty requirements</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Pricing and Booking */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Book Your Service</CardTitle>
                                <CardDescription>Choose your preferred option</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Standard Service</span>
                                    <span className="text-2xl font-bold text-blue-600">$199</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Premium Service</span>
                                    <span className="text-2xl font-bold text-blue-600">$299</span>
                                </div>
                                <Input type="date" placeholder="Select Date" />
                                <Textarea placeholder="Any special requests or notes?" />
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">
                                    <DollarSign className="mr-2 h-4 w-4" /> Book Now
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>

                {/* Service Tabs */}
                <Tabs defaultValue="process" className="mb-12">
                    <TabsList>
                        <TabsTrigger value="process">Service Process</TabsTrigger>
                    </TabsList>
                    <TabsContent value="process" className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Our Service Process</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ol className="list-decimal list-inside space-y-4">
                                    <li className="font-semibold">Initial Inspection
                                        <p className="font-normal mt-1">Our technicians perform a thorough inspection of your vehicle to identify any issues or areas requiring attention.</p>
                                    </li>
                                    <li className="font-semibold">Oil and Filter Change
                                        <p className="font-normal mt-1">We replace your engine oil and oil filter with high-quality products suitable for your vehicle.</p>
                                    </li>
                                    <li className="font-semibold">Fluid Check and Top-up
                                        <p className="font-normal mt-1">All essential fluids are checked and topped up, including coolant, brake fluid, and power steering fluid.</p>
                                    </li>
                                    <li className="font-semibold">Tire Service
                                        <p className="font-normal mt-1">We rotate your tires, check the pressure, and inspect for any signs of wear or damage.</p>
                                    </li>
                                    <li className="font-semibold">Brake System Inspection
                                        <p className="font-normal mt-1">Your brake pads, rotors, and overall brake system are thoroughly checked for safety and performance.</p>
                                    </li>
                                    <li className="font-semibold">Final Checks and Road Test
                                        <p className="font-normal mt-1">We perform final checks and a road test to ensure everything is working correctly before returning your vehicle.</p>
                                    </li>
                                </ol>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Related Services */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Related Services</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                            { title: "Oil Change", description: "Keep your engine running smoothly", price: "$49.99" },
                            { title: "Brake Service", description: "Ensure your safety on the road", price: "$129.99" },
                            { title: "Tire Rotation", description: "Extend the life of your tires", price: "$39.99" }
                        ].map((service, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle>{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{service.description}</CardDescription>
                                    <p className="mt-2 font-bold text-blue-600">{service.price}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full">Learn More</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

        </>

    )
}