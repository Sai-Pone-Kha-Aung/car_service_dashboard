'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../dialog'
import { Label } from '../../label'
import { Input } from '../../input'
import { Button } from '../../button'
import { Plus } from 'lucide-react'

const NewCustomer = () => {
    const [open, setOpen] = useState(false)
    const handleCancel = () => setOpen(false)
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className='font-semibold'>
                        <Plus className='mr-2 h-4 w-4' />
                        New Customer
                    </Button>
                </DialogTrigger>
                {open && <DialogContent>
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
                        <Button variant='outline' onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type='submit' >
                            Add Customer
                        </Button>
                    </DialogFooter>
                </DialogContent >}
            </Dialog>
        </div >

    )
}

export default NewCustomer