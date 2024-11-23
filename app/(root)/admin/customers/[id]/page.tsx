'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CustomerDetailTable from '@/components/ui/dashboard/table/customer-detail-table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Car, Mail, MapPin, Phone } from 'lucide-react'
import { customerData } from '@/constants/Data'
import { useParams } from 'next/navigation'
import { AddCustomerCar } from '@/utils/add-form'
import { EditCustomer } from '@/utils/edit-form'

const Page = () => {
    // const customerID = customerData ? customerData.find(customer => customer.id === params.id) : null;

    const { id } = useParams();
    const filteredCustomerData = customerData.filter((customer) => customer.id === parseInt(id as string));

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

                <div className='flex justify-end m-y-6'>
                    <AddCustomerCar />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className='text-2xl'>
                            Cars
                        </CardTitle>
                    </CardHeader>
                    {filteredCustomerData.map((customer) => (
                        <CardContent key={customer.id}>
                            <div className='space-y-4'>
                                <span className='text-lg font-semibold'>{customer.cars.map((car) => (
                                    <div className='flex items-center p-2' key={car.id}>
                                        <Car className='h-4 w-4 mr-2 text-muted-foreground' />
                                        {car.name}
                                    </div>
                                ))}</span>
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