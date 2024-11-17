'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '../../select'
import { servicesData } from '@/constants/Data'

const statusOptions = [
    {
        id: 1,
        value: 'completed',
        label: 'Completed',
    },
    {
        id: 2,
        value: 'in-progress',
        label: 'In Progress',
    },
    {
        id: 3,
        value: 'cancelled',
        label: 'Cancelled',
    },
    {
        id: 4,
        value: 'scheduled',
        label: 'Scheduled',
    },
    {
        id: 5,
        value: 'walk-in',
        label: 'Walk-In',
    }
]

const EditAppointment = ({ appointmentData }: { appointmentData: AppointmentData }) => {
    const [open, setOpen] = useState(false)

    const handleCancel = () => {
        setOpen(false)
        console.log('Cancel')
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant='ghost' className='flex items-center p-0 h-auto'>
                        <Edit className='h-4 w-4 mr-2' />
                        Edit
                    </Button>
                </DialogTrigger>
                {open && <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit appointment </DialogTitle>
                        <DialogDescription>
                            Edit a customer appointment. Click save when you&apos; done.
                        </DialogDescription>
                    </DialogHeader>
                    <form>
                        <div className='grid gap-4 py-4'>
                            <div className='grid gap-4'>
                                <Label htmlFor='name' className='text-left'>
                                    Name
                                </Label>
                                <Input id='name' placeholder='Enter name' defaultValue={appointmentData.name} className='col-span-3' />
                            </div>
                            <div className='grid gap-4'>
                                <Label htmlFor='car' className='text-left'>
                                    Car
                                </Label>
                                <Input id='car' className='col-span-3' placeholder='Enter email' defaultValue={appointmentData.car} />
                            </div>
                            <div className='grid gap-4'>
                                <Label htmlFor='service' className='text-left'>
                                    Service
                                </Label>
                                <Select defaultValue={appointmentData.service}>
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
                                <Input id='date' className='col-span-3' placeholder='Enter address' defaultValue={appointmentData.date} />
                            </div>
                            <div className='grid gap-4'>
                                <Label htmlFor='status' className='text-left'>
                                    Status
                                </Label>
                                <Select defaultValue={appointmentData.status}>
                                    <SelectTrigger >
                                        <SelectValue placeholder='Select status' />
                                        <SelectContent>
                                            {statusOptions.map((status) => (
                                                <SelectItem key={status.id} value={status.label}>{status.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </SelectTrigger>
                                </Select>
                            </div>
                        </div>
                    </form>
                    <DialogFooter>
                        <Button
                            type='submit'
                            variant="outline"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button type='submit' >
                            Save
                        </Button>

                    </DialogFooter>
                </DialogContent >}
            </Dialog>
        </div >
    )
}

export default EditAppointment