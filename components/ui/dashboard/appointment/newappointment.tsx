'use client'
import React, { useState } from 'react'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../dialog'
import { Label } from '../../label'
import { Input } from '../../input'
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '../../select'
import { Popover, PopoverContent, PopoverTrigger } from '../../popover'
import { Button } from '../../button'
import { CalendarPlus } from 'lucide-react'
import { Calendar } from '../../calendar'

const NewAppointmentDialog = () => {
    const [date, setDate] = useState<Date>()
    return (
        <div>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Appointment</DialogTitle>
                    <DialogDescription>
                        Create a new service appointment. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form>
                    <div className='grid gap-4 py-4'>
                        <div className='grid gap-4'>
                            <Label htmlFor='customer' className='text-left'>
                                Customer
                            </Label>
                            <Input id='customer' className='col-span-3' placeholder='Enter customer name' />
                        </div>
                        <div className='grid gap-4'>
                            <Label htmlFor='Vehicle' className='text-left'>
                                Vehicle
                            </Label>
                            <Input id='vehicle' className='col-span-3' placeholder='Enter vehicle' />
                        </div>
                        <div className='grid gap-4'>
                            <Label htmlFor='service' className='text-left'>
                                Service Type
                            </Label>
                            <Select>
                                <SelectTrigger className='col-span-3'>
                                    <SelectValue placeholder='Select service a type' />
                                    <SelectContent>
                                        <SelectItem value='oil-change'>Oil Change</SelectItem>
                                        <SelectItem value="tire-rotation">Tire Rotation</SelectItem>
                                        <SelectItem value="brake-service">Brake Service</SelectItem>
                                        <SelectItem value="general-inspection">General Inspection</SelectItem>
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
                </form>
                <DialogFooter>
                    <Button type='submit' >
                        Save appointment
                    </Button>
                </DialogFooter>
            </DialogContent >
        </div >

    )
}

export default NewAppointmentDialog 