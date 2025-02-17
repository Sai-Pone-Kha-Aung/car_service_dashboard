'use client'
import React, { useState } from 'react'
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

const Page = () => {
    // const customerID = customerData ? customerData.find(customer => customer.id === params.id) : null;


    const { id } = useParams();
    const [image, setImage] = useState<{ [key: string]: string | number | File }>({});
    const customerId = parseInt(id as string);

    const filteredCustomerData = customerData.filter((customer) => customer.id === customerId);
    const [cars, setCars] = useState<Car[]>(filteredCustomerData[0].cars);

    const handleAddCar = () => {
        const carID = cars.length > 0 ? cars[cars.length - 1].id + 1 : 1;
        setCars
            ([...cars, { id: carID, customer_id: customerId, make: '', model: '', year: 0 }])
    }

    const handleRemoveCar = (index: number) => {
        const removeCar = cars.filter((car) => car.id !== index);
        setCars(removeCar);
    }

    const handleCarChange = (id: number, field: string, value: string) => {
        const newCars = cars.map(car => car.id === id ? { ...car, [field]: value } : car);
        setCars(newCars)
        console.log(newCars)
    }

    const handleChange = (id: string, value: string | number | File) => {
        setImage(prev => ({ ...prev, [id]: value }))
    }

    return (
        <div className='flex-1 bg-gray-100 h-full p-6'>
            <div className='flex justify-end mb-6'>
                <EditCustomer customerData={filteredCustomerData[0]} />
            </div>

            <div className='grid gap-6 md:grid-cols-1'>
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
                                    src={String(image.avatar || filteredCustomerData[0].avatar)}
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
                        {filteredCustomerData.map((customer) => (
                            <div className='space-y-4' key={customer.id}>
                                <div>
                                    <h2 className='text-xl font-semibold'>{customer.name}</h2>
                                    <p className='text-sm text-muted-foreground'>Customer since: Jan 15, 2022</p>
                                </div>
                                <div className='flex items-center'>
                                    <Mail className='h-4 w-4 mr-2 text-muted-foreground' />
                                    <span>{customer.email}</span>
                                </div>
                                <div className='flex items-center'>
                                    <Phone className='h-4 w-4 mr-2 text-muted-foreground' />
                                    <span>{customer.phone}</span>
                                </div>
                                <div className='flex items-center'>
                                    <MapPin className='h-4 w-4 mr-2 text-muted-foreground' />
                                    <span>{customer.address}</span>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* <div className='flex justify-end m-y-6'>
                    <AddCustomerCar />
                </div> */}

                <Card>
                    <CardHeader>
                        <CardTitle className='text-2xl'>
                            Cars
                        </CardTitle>
                    </CardHeader>
                    {filteredCustomerData.map((customer) => (
                        <CardContent key={customer.id}>
                            <div className='space-y-4'>
                                <span className='text-lg font-semibold'>
                                    {cars.map((car) => (
                                        <div className='flex items-center' key={car.id}>
                                            <div className="mb-4 p-4 border rounded-lg">
                                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                    <div>
                                                        <Label htmlFor={`make-${car.make}`}>Make</Label>
                                                        <Input
                                                            id={`make-${car.id}`}
                                                            value={car.make}
                                                            onChange={(e) => handleCarChange(car.id, 'make', e.target.value)}
                                                            placeholder="e.g. Toyota"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor={`model-${car.model}`}>Model</Label>
                                                        <Input
                                                            id={`model-${car.model}`}
                                                            value={car.model}
                                                            onChange={(e) => handleCarChange(car.id, 'model', e.target.value)}
                                                            placeholder="e.g. Camry"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor={`year-${car.year}`}>Year</Label>
                                                        <Input
                                                            id={`year-${car.year}`}
                                                            value={car.year}
                                                            onChange={(e) => handleCarChange(car.id, 'year', e.target.value)}
                                                            placeholder="e.g. 2019"
                                                        />
                                                    </div>
                                                    <div className="flex items-end">
                                                        <Button variant="destructive" onClick={() => handleRemoveCar(car.id)}>
                                                            <Trash2 className="mr-2 h-4 w-4" /> Remove Car
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </span>
                                <div>
                                    <Button onClick={handleAddCar} className='mt-4'>
                                        <Plus className="mr-2 h-4 w-4" /> Add Another Car
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    ))}
                </Card>
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
                    <CustomerDetailTable data={filteredCustomerData[0]} />
                </Tabs>
            </div>
        </div>
    )
}

export default Page