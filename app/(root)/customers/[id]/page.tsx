import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CustomerDetailTable from '@/components/ui/dashboard/table/customer-detail-table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Car, Edit, Mail, MapPin, Phone } from 'lucide-react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import EditCustomerDetail from '@/components/ui/dashboard/customer/edit-customer-info'

const page = () => {
    return (
        <div className='flex-1 overflow-y-auto bg-gray-100 h-full p-6'>
            <div className=' flex justify-end mb-6'>
                <EditCustomerDetail />
            </div>

            <div className='grid gap-6 md:grid-cols-1'>
                <Card>
                    <CardHeader>
                        <CardTitle className='text-2xl'>
                            Personal Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-4'>
                            <div>
                                <h2 className='text-xl font-semibold'>Alice Johnson</h2>
                                <p className='text-sm text-muted-foreground'>Customer since: Jan 15, 2022</p>
                            </div>
                            <div className='flex items-center'>
                                <Mail className='h-4 w-4 mr-2 text-muted-foreground' />
                                <span>alice@example.com</span>
                            </div>
                            <div className='flex items-center'>
                                <Phone className='h-4 w-4 mr-2 text-muted-foreground' />
                                <span>(555) 123-4567</span>
                            </div>
                            <div className='flex items-center'>
                                <MapPin className='h-4 w-4 mr-2 text-muted-foreground' />
                                <span>123 Main St, Anytown, USA 12345</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className='text-2xl'>
                            Vehicles
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-4'>
                            <div className='flex items-center'>
                                <Car className='h-4 w-4 mr-2 text-muted-foreground' />
                                <span>Toyota Camry (2020)</span>
                            </div>
                            <div className='flex items-center'>
                                <Car className='h-4 w-4 mr-2 text-muted-foreground' />
                                <span>Honda Civic (2018)</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className='mt-6'>
                <Tabs defaultValue='service-history'>
                    <TabsList className='bg-slate-200'>
                        <TabsTrigger value='service-history' className=' text-md'>
                            Service History
                        </TabsTrigger>
                        <TabsTrigger value='upcoming-appointments' className=' text-md'>
                            Upcoming Appointments
                        </TabsTrigger>
                    </TabsList>
                    <CustomerDetailTable />
                </Tabs>
            </div>
        </div>
    )
}

export default page