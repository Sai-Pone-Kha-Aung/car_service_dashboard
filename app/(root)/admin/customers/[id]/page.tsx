'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CustomerDetailTable from '@/components/ui/dashboard/table/customer-detail-table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Mail, MapPin, Phone, Plus, Trash2, Upload } from 'lucide-react'
import { customerData } from '@/constants/Data'
import { useParams } from 'next/navigation'
import { EditCustomer } from '@/utils/edit-form'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import ImageUpload from '@/components/share_components/image_upload'
import { useRouter } from 'next/navigation'

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
    createdat: string;
    updatedat: string;
}

const Page = () => {
    // const customerID = customerData ? customerData.find(customer => customer.id === params.id) : null;
    const { id } = useParams();
    const customerId = parseInt(id as string);
    const [image, setImage] = useState<{ [key: string]: string | number | File }>({});
    const [userData, setUserData] = useState<CustomerData>();
    const [updatedUserData, setUpdatedUserData] = useState<CustomerData>({} as CustomerData);
    const [cars, setCars] = useState<Car[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();
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


    return (
        <div className='flex-1 bg-gray-100 h-full p-6'>
            <div className='flex justify-between mb-6'>
                <Button variant={'outline'} onClick={() => router.push('/admin/customers')}>
                    Back to Customers
                </Button>
                {userData && <EditCustomer customerData={userData} />}
            </div>

            <div className='grid md:grid-cols-1 w-full'>
                <div className='md:col-span-1 mb-4'>
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-2xl'>
                                Personal Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <div className="flex flex-col justify-start items-start gap-4">
                                    <Image
                                        src={userData?.avatar || '/images/avatars/avatar.png'}
                                        alt="Featured"
                                        width={160}
                                        height={160}
                                        className="object-cover rounded"
                                    />

                                    {ImageUpload({ fieldId: 'avatar', onChange: (fieldId, value) => handleChange(fieldId, value) })}
                                    <Button type="button" variant="outline"
                                        onClick={() => document.getElementById(`file-input-avatar`)?.click()}
                                    >
                                        <Upload className="mr-2 h-4 w-4" /> Upload New Image
                                    </Button>
                                </div>
                            </div>
                            <div className='space-y-4'>
                                <div>
                                    <h2 className='text-xl font-semibold'>{userData?.name}</h2>
                                    <p>Customer Since: {userData?.createdat ? new Date(userData.createdat).toLocaleDateString('en-GB') : ''}</p>
                                </div>
                                <div className='flex items-center'>
                                    <Mail className='h-4 w-4 mr-2 text-muted-foreground' />
                                    <span>{userData?.email}</span>
                                </div>
                                <div className='flex items-center'>
                                    <Phone className='h-4 w-4 mr-2 text-muted-foreground' />
                                    <span>{userData?.phone}</span>
                                </div>
                                <div className='flex items-center'>
                                    <MapPin className='h-4 w-4 mr-2 text-muted-foreground' />
                                    <span>{userData?.address}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>


                {/* <div className='flex justify-end m-y-6'>
                    <AddCustomerCar />
                </div> */}
                <div>

                    <Card className='md:col-span-3'>
                        <CardHeader>
                            <CardTitle className='text-2xl'>
                                Cars
                            </CardTitle>
                        </CardHeader>
                        {cars?.map((car, index) => (
                            <div key={car.id} className="mb-4 p-4 border rounded-lg mx-4">
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
                        <Button onClick={handleAddCar} className="m-4">
                            <Plus className="mr-2 h-4 w-4" /> Add Another Car
                        </Button>
                    </Card>
                </div>

            </div>

            <div className='mt-6'>
                <Tabs defaultValue='service-history'>
                    <TabsList className='bg-slate-200'>
                        <TabsTrigger value='service-history' className='text-md'>
                            Service History
                        </TabsTrigger>
                        <TabsTrigger value='upcoming-appointments' className='text-md'>
                            Upcoming Appointments
                        </TabsTrigger>
                    </TabsList>
                    {userData && <CustomerDetailTable data={userData} />}
                </Tabs>
            </div>
        </div>
    )
}

export default Page