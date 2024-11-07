'use client'
import React, { useState } from 'react'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../dialog'
import { Label } from '../../label'
import { Input } from '../../input'
import { Button } from '../../button'


const NewCustomer = () => {
    const [date, setDate] = useState<Date>()
    return (
        <div>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Customer</DialogTitle>
                    <DialogDescription>
                        Create a new customer. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form>
                    <div className='grid gap-4 py-4'>
                        <div className='grid gap-4'>
                            <Label htmlFor='customer' className='text-left'>
                                Name
                            </Label>
                            <Input id='customer' placeholder='Enter name' className='col-span-3' />
                        </div>
                        <div className='grid gap-4'>
                            <Label htmlFor='email' className='text-left'>
                                Email
                            </Label>
                            <Input id='email' className='col-span-3' placeholder='Enter email' />
                        </div>
                        <div className='grid gap-4'>
                            <Label htmlFor='phone' className='text-left'>
                                Phone
                            </Label>
                            <Input id='email' className='col-span-3' placeholder='Enter phone number' />
                        </div>
                        <div className='grid gap-4'>
                            <Label htmlFor='address' className='text-left'>
                                Address
                            </Label>
                            <Input id='address' className='col-span-3' placeholder='Enter address' />
                        </div>

                    </div>
                </form>
                <DialogFooter>
                    <Button type='submit' >
                        Add Customer
                    </Button>
                </DialogFooter>
            </DialogContent >
        </div >

    )
}

export default NewCustomer