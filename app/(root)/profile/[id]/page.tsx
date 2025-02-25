'use client'

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Plus, Trash2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import ImageUpload from "@/components/share_components/image_upload"


export default function ProfilePage() {
    const { id } = useParams();
    const customerId = parseInt(id as string);
    const [image, setImage] = useState<{ [key: string]: string | number | File }>({});
    const [userData, setUserData] = useState<CustomerData>();
    const [updatedUserData, setUpdatedUserData] = useState<CustomerData>({} as CustomerData);
    const [cars, setCars] = useState<Car[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        try {
            const fetchData = async () => {
                const response = await fetch(`/api/user/${customerId}`);
                const data = await response.json();
                setUserData(data);
                const carResponse = await fetch(`/api/car/user?id=${customerId}`);
                const carData = await carResponse.json();
                setCars(carData.filter((car: Car) => car.user_id === customerId));
            }
            fetchData();
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }, [customerId]);

    const handleChange = async (id: string, value: string | number | File) => {
        if (!isMounted) return;
        setImage(prev => ({ ...prev, [id]: value }))
        if (typeof File !== 'undefined' && value instanceof File) {
            const uploadUrl = await uploadImage(value);
            if (uploadUrl) {
                setUpdatedUserData(prev => ({ ...prev, avatar: uploadUrl }));
            }
        }
    }

    useEffect(() => {
        if (updatedUserData.avatar || Object.keys(updatedUserData).length > 0) {
            window.location.reload();
        }
    }, [updatedUserData.avatar]);

    const handleUserChange = (field: string, value: string) => {
        setUpdatedUserData(prev => ({ ...prev, [field]: value }));
    }

    const handleAddCar = () => {
        const newCar: Car = { id: 0, user_id: customerId, make: '', model: '', year: 2020 };
        setCars([...(cars || []), newCar]);
    }

    const handleConfirmCar = async (index: number) => {
        if (!cars) return;
        const car = { ...cars[index], user_id: customerId }
        const response = await fetch(`/api/car`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car),
        });
        const data = await response.json();
        const newCars = [...cars];
        newCars[index] = data;
        setCars(newCars);
    }

    const handleRemoveCar = async (index: number) => {
        if (!cars) return;
        const carId = cars[index].id;
        await fetch('/api/car', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: carId }),
        });
        setCars(cars.filter((_, i) => i !== index));
    }

    const handleCarChange = async (index: number, field: string, value: string) => {
        if (!cars) return;
        const updatedCar = { ...cars[index], [field]: value };
        const newCars = [...cars];
        newCars[index] = updatedCar;
        setCars(newCars);
    }

    const uploadImage = async (file: File): Promise<string | null> => {
        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await fetch(`/api/user/${customerId}`, {
                method: 'PATCH',
                body: formData,
            });

            if (response.ok) {
                // After upload, refetch user data to get the updated avatar
                const userResponse = await fetch(`/api/user/${customerId}`);
                const updatedData = await userResponse.json();
                setUserData(updatedData);
                setUpdatedUserData(updatedData);
                return updatedData.avatar; // Return the avatar URL from the server
            } else {
                console.error("Failed to upload image");
                return null;
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const handleSaveChanges = async () => {
        const response = await fetch(`/api/user/${customerId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUserData),
        });

        if (response.ok) {
            const data = await response.json();
            setUserData(data);
            setUpdatedUserData(data);
        } else {
            console.error("Failed to update user data");
        }
    }

    const lastService = () => {
        if (!userData?.appointments) return <p>No services found</p>;
        const services = userData.appointments.filter((service) => service.id === userData.appointments[0].id)
        const completedService = services?.filter((service) => service.status === "Completed") || [];
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
                                        src={updatedUserData.avatar || userData?.avatar}
                                        height={96}
                                        width={96}
                                        alt="Profile picture" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>

                                <ImageUpload fieldId='avatar' onChange={handleChange} />
                                <div>
                                    <Button variant="outline" size="sm"
                                        onClick={() => document.getElementById(`file-input-avatar`)?.click()}>
                                        <Camera className="mr-2 h-4 w-4" /> Change Photo
                                    </Button>
                                </div>
                            </div>
                            {userData && (
                                <>
                                    <div key={userData.id}>
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                placeholder="John"
                                                value={updatedUserData.name ?? userData.name ?? ''}
                                                onChange={(e) => handleUserChange('name', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email" type="email"
                                                placeholder="john.doe@example.com"
                                                value={updatedUserData.email ?? userData.email ?? ''}
                                                onChange={(e) => handleUserChange('email', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="(123) 456-7890"
                                                value={updatedUserData.phone ?? userData.phone ?? ''}
                                                onChange={(e) => handleUserChange('phone', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="address">Address</Label>
                                            <Textarea
                                                id="address"
                                                placeholder="123 Main St, City, State, ZIP"
                                                value={updatedUserData.address ?? userData.address ?? ''}
                                                onChange={(e) => handleUserChange('address', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </>

                            )}

                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSaveChanges}>Save Changes</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Account Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium">Member Since</p>
                                <p>{userData?.createdAt}</p>
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

                            {cars?.map((car, index) => (
                                <div key={car.id} className="mb-4 p-4 border rounded-lg">
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
                                        <div className="flex items-end space-x-2">
                                            <Button onClick={() => handleConfirmCar(index)} >
                                                <Plus />
                                            </Button>
                                            <Button variant="destructive" onClick={() => handleRemoveCar(index)}>
                                                <Trash2 />
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