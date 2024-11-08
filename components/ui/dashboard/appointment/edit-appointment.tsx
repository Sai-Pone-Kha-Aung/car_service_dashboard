'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../dialog'
import { Label } from '../../label'
import { Input } from '../../input'
import { Button } from '../../button'
import { Edit } from 'lucide-react'
import { Select, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectContent, SelectValue } from '../../select'

const EditAppointment = ({ appointmentData }: { appointmentData: AppointmentData }) => {
    const [open, setOpen] = useState(false)

    const handleCancel = () => {
        setOpen(false)
        console.log('Cancel')
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className='flex justify-between items-center'>
                    <Edit className='w-4 h-4 mr-2' /> Edit
                </DialogTrigger>
                {open && <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Custome Info</DialogTitle>
                        <DialogDescription>
                            Edit a customer appointment. Click save when you're done.
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
                                <Label htmlFor='vehicle' className='text-left'>
                                    Vehicle
                                </Label>
                                <Input id='vehicle' className='col-span-3' placeholder='Enter email' defaultValue={appointmentData.vehicle} />
                            </div>
                            <div className='grid gap-4'>
                                <Label htmlFor='service' className='text-left'>
                                    Service
                                </Label>
                                <Input id='service' className='col-span-3' placeholder='Enter phone number' defaultValue={appointmentData.service} />
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
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder={`${appointmentData.status}`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Select a status</SelectLabel>
                                            <SelectItem value='scheduled'>
                                                Scheduled
                                            </SelectItem>
                                            <SelectItem value='in-progress'>
                                                In Progress
                                            </SelectItem>
                                            <SelectItem value='completed'>
                                                Completed
                                            </SelectItem>
                                            <SelectItem value='cancelled'>
                                                Cancelled
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
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