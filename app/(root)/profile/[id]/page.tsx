'use client'

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Plus, Trash2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { customerData } from "@/constants/Data"
import ImageUpload from "@/components/share_components/image_upload"

export default function ProfilePage() {
    const { id } = useParams();
    const customerId = parseInt(id as string);
    const data = customerData.filter((customer) => customer.id === customerId);
    const [image, setImage] = useState<{ [key: string]: string | number | File }>({});

    const [cars, setCars] = useState<Car[]>(data[0].cars);

    const handleChange = (id: string, value: string | number | File) => {
        setImage(prev => ({ ...prev, [id]: value }))
    }

    const handleAddCar = () => {
        const carID = cars.length > 0 ? cars[cars.length - 1].id + 1 : 1;
        setCars([...cars, { id: carID, customer_id: customerId, make: "", model: "", year: 0 }])
    }

    const handleRemoveCar = (index: number) => {
        setCars(cars.filter((_, i) => i !== index))
    }

    const handleCarChange = (index: number, field: string, value: string) => {
        const newCars = [...cars]
        newCars[index] = { ...newCars[index], [field]: value }
        setCars(newCars)
    }

    const lastService = () => {
        const services = data[0].appointments.filter((service) => service.id === data[0].appointments[0].id)
        const completedService = services.filter((service) => service.status === "Completed")
        if (completedService.length === 0) {
            return (
                <p>No services found</p>
            )
        }
        const recentService = completedService.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
        return (
            <p>{recentService.service[0].name} - {recentService.date}</p>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Profile Content */}
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Personal Information */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your personal details here.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <Avatar className="w-24 h-24">
                                    <AvatarImage
                                        src={String(image.avatar || data[0].avatar)}
                                        height={96}
                                        width={96}
                                        alt="Profile picture" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>

                                {ImageUpload({ fieldId: 'avatar', onChange: (fieldId, value) => handleChange(fieldId, value) })}
                                <div>
                                    <Button variant="outline" size="sm"
                                        onClick={() => document.getElementById(`file-input-avatar`)?.click()}>
                                        <Camera className="mr-2 h-4 w-4" /> Change Photo
                                    </Button>
                                </div>
                            </div>
                            {data.map((user) => (
                                <div key={user.id}>
                                    <div className="space-y-2">
                                        <Label htmlFor="name">{user.name}</Label>
                                        <Input
                                            id="name"
                                            placeholder="John"
                                            defaultValue={user.name} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email" type="email"
                                            placeholder="john.doe@example.com"
                                            defaultValue={user.email}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="(123) 456-7890"
                                            defaultValue={user.phone}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Textarea
                                            id="address"
                                            placeholder="123 Main St, City, State, ZIP"
                                            defaultValue={user.address}
                                        />
                                    </div>
                                </div>

                            ))}

                        </CardContent>
                        <CardFooter>
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Account Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium">Member Since</p>
                                <p>{data[0].createdAt}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Last Service</p>
                                <ul>
                                    <li>{lastService()}</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Cars */}
                    <Card className="md:col-span-3">
                        <CardHeader>
                            <CardTitle>Your Cars</CardTitle>
                            <CardDescription>Manage the vehicles associated with your account.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {cars.map((car, index) => (
                                <div key={index} className="mb-4 p-4 border rounded-lg">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div>
                                            <Label htmlFor={`make-${index}`}>Make</Label>
                                            <Input
                                                id={`make-${index}`}
                                                value={car.make}
                                                onChange={(e) => handleCarChange(index, 'make', e.target.value)}
                                                placeholder="e.g. Toyota"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`model-${index}`}>Model</Label>
                                            <Input
                                                id={`model-${index}`}
                                                value={car.model}
                                                onChange={(e) => handleCarChange(index, 'model', e.target.value)}
                                                placeholder="e.g. Camry"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`year-${index}`}>Year</Label>
                                            <Input
                                                id={`year-${index}`}
                                                value={car.year}
                                                onChange={(e) => handleCarChange(index, 'year', e.target.value)}
                                                placeholder="e.g. 2019"
                                            />
                                        </div>
                                        <div className="flex items-end">
                                            <Button variant="destructive" onClick={() => handleRemoveCar(index)}>
                                                <Trash2 className="mr-2 h-4 w-4" /> Remove Car
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Button onClick={handleAddCar} className="mt-4">
                                <Plus className="mr-2 h-4 w-4" /> Add Another Car
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}