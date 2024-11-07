import { Button } from '@/components/ui/button'
import NewCustomer from '@/components/ui/dashboard/customer/newcustomer';
import AppointmentsTable from '@/components/ui/dashboard/table/appointments';
import CustomersTable from '@/components/ui/dashboard/table/customers';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react'
import React from 'react'

const page = () => {
    return (
        <div className='flex-1 overflow-y-auto bg-gray-100 h-full p-6'>
            <div className='flex justify-between items-center mb-8'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className='font-semibold'>
                            <Plus className='mr-2 h-4 w-4' />
                            New Customer
                        </Button>
                    </DialogTrigger>
                    <NewCustomer />
                </Dialog>
            </div>

            <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center space-x-2'>
                    <Select defaultValue='A-Z' >
                        <SelectTrigger className='w-[180px] bg-white'>
                            <SelectValue placeholder="Filter by A-Z" />
                            <SelectContent>
                                <SelectItem value='A-Z'>
                                    A-Z
                                </SelectItem>
                                <SelectItem value='Z-A'>
                                    Z-A
                                </SelectItem>
                            </SelectContent>
                        </SelectTrigger>
                    </Select>
                </div>
                <div className='relative'>
                    <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input placeholder='Search customer' className='pl-8 w-[300px] bg-white' />
                </div>
            </div>
            <CustomersTable />

            <div className='flex justify-between items-center space-x-2 py-4'>
                <div className='flex-1 text-sm text-muted-foreground'>
                    Showing 10 of 50 appointments
                </div>
                <div className='flex items-center space-x-2'>
                    <Button variant="outline" size="sm">
                        <ChevronLeft className='h-4 w-4' />
                        Previous
                    </Button>
                    <Button variant="outline" size="sm">
                        Next
                        <ChevronRight className='h-4 w-4' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default page