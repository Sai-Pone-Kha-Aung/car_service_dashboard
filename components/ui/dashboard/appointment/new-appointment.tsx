'use client'
import React, { useState } from 'react'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { CalendarPlus } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { servicesData } from '@/constants/Data'
import SearchModal from '../search/searchModal'
import { useRouter } from 'next/navigation'

const NewAppointmentDialog = ({ onClose }: { onClose: () => void }) => {
    const [date, setDate] = useState<Date>();
    const [customerFound, setCustomerFound] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const router = useRouter();

    const handleSelectCustomer = (customer: CustomerData) => {
        setCustomerFound(true)
        setSelectedCustomer(customer.name)
    }

    const handleDialogClose = () => {
        setCustomerFound(false)
        setSelectedCustomer('')
        onClose()
    }

    const handleNewCustomer = () => {
        router.push('/admin/customers')
        onClose()
    }

    return (
        <div>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Appointment</DialogTitle>
                    <DialogDescription>
                        Create a new service appointment. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                {/* Before appointment search the customer first */}

                {!customerFound && <div className='grid gap-4 pt-4'>
                    <div className='relative'>
                        <SearchModal onSelectCustomer={handleSelectCustomer} />
                    </div>
                </div>}
                {/* if customer is found, allow to add appointment */}
                {customerFound && selectedCustomer ? (<form>
                    <div className='grid gap-4 py-4'>
                        <div className='grid gap-4'>
                            <Label htmlFor='customer' className='text-left'>
                                Customer
                            </Label>
                            <Input id='customer' className='col-span-3' placeholder='Enter customer name' defaultValue={selectedCustomer} />
                        </div>
                        <div className='grid gap-4'>
                            <Label htmlFor='car' className='text-left'>
                                Car
                            </Label>
                            <Input id='car' className='col-span-3' placeholder='Enter car' />
                        </div>
                        <div className='grid gap-4'>
                            <Label htmlFor='service' className='text-left'>
                                Service Type
                            </Label>
                            <Select>
                                <SelectTrigger className='col-span-3'>
                                    <SelectValue placeholder='Select service a type' />
                                    <SelectContent>
                                        {servicesData.map((service) => (
                                            <SelectItem key={service.id} value={service.name}>{service.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </SelectTrigger>
                            </Select>
                        </div>
                        <div className='grid gap-4'>
                            <Label htmlFor='date' className='text-left'>
                                Date
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant='outline'
                                        className={`col-span-3 justify-start text-left font-normal ${!date && 'text-muted-foreground'}`}
                                    >
                                        <CalendarPlus className='mr-2 h-4 w-4' />
                                        {date ? date.toDateString() : 'Pick a date'}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className='w-auto p-0'
                                >
                                    <Calendar
                                        mode='single'
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </form>) : (
                    <div>
                        <p>Search the customer first</p>
                    </div>
                )}
                <DialogFooter>
                    {!customerFound ? (<Button onClick={handleNewCustomer}>Add new customer</Button>) : (
                        <Button onClick={handleDialogClose}>Add new appointment</Button>
                    )}
                    <Button onClick={handleDialogClose}>Cancel</Button>
                </DialogFooter>
            </DialogContent >
        </div >

    )
}

export default NewAppointmentDialog 