'use client'

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Plus, Trash2 } from 'lucide-react'

export default function ProfilePage() {
    const [cars, setCars] = React.useState([
        { make: "Toyota", model: "Camry", year: "2019" },
        { make: "Honda", model: "Civic", year: "2020" }
    ])

    const handleAddCar = () => {
        setCars([...cars, { make: "", model: "", year: "" }])
    }

    const handleRemoveCar = (index: number) => {
        setCars(cars.filter((_, i) => i !== index))
    }

    const handleCarChange = (index: number, field: string, value: string) => {
        const newCars = [...cars]
        newCars[index] = { ...newCars[index], [field]: value }
        setCars(newCars)
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
                                    <AvatarImage src="/placeholder.jpg?height=96&width=96" alt="Profile picture" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div>
                                    <Button variant="outline" size="sm">
                                        <Camera className="mr-2 h-4 w-4" /> Change Photo
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="john.doe@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Textarea id="address" placeholder="123 Main St, City, State, ZIP" />
                            </div>
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
                                <p>January 1, 2020</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Last Service</p>
                                <p>Oil Change - March 15, 2024</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Loyalty Points</p>
                                <p>2,500 points</p>
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