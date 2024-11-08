'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../dialog'
import { Label } from '../../label'
import { Input } from '../../input'
import { Button } from '../../button'
import { customerData } from '@/constants/Data'
import { Edit } from 'lucide-react'
const EditCustomerDetail = () => {
    const [open, setOpen] = useState(false)
    const data = customerData[0]

    const handleCancel = () => {
        setOpen(false)
        console.log('Cancel')
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant='outline'>
                        <Edit className='h-4 w-4 mr-2' />
                        Edit
                    </Button>
                </DialogTrigger>

                {open && <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Custome Info</DialogTitle>
                        <DialogDescription>
                            Edit a customer data. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form>
                        <div className='grid gap-4 py-4'>
                            <div className='grid gap-4'>
                                <Label htmlFor='name' className='text-left'>
                                    Name
                                </Label>
                                <Input id='name' placeholder='Enter name' defaultValue={data.name} className='col-span-3' />
                            </div>
                            <div className='grid gap-4'>
                                <Label htmlFor='email' className='text-left'>
                                    Email
                                </Label>
                                <Input id='email' className='col-span-3' placeholder='Enter email' defaultValue={data.email} />
                            </div>
                            <div className='grid gap-4'>
                                <Label htmlFor='phone' className='text-left'>
                                    Phone
                                </Label>
                                <Input id='email' className='col-span-3' placeholder='Enter phone number' defaultValue={data.phone} />
                            </div>
                            <div className='grid gap-4'>
                                <Label htmlFor='address' className='text-left'>
                                    Address
                                </Label>
                                <Input id='address' className='col-span-3' placeholder='Enter address' defaultValue={data.address} />
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

export default EditCustomerDetail