'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../dialog'
import { Label } from '../../label'
import { Input } from '../../input'
import { Button } from '../../button'
import { Plus } from 'lucide-react'

const AddServiceForm = () => {
    const [open, setOpen] = useState(false)
    const handleCancel = () => setOpen(false)
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className='font-semibold'>
                        <Plus className='mr-2 h-4 w-4' />
                        New Service
                    </Button>
                </DialogTrigger>
                {open && <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Service</DialogTitle>
                        <DialogDescription>
                            Create a new service. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form>
                        <div className='grid gap-4 py-4'>
                            <div className='grid gap-4'>
                                <Label htmlFor='name' className='text-left'>
                                    Name
                                </Label>
                                <Input id='name' placeholder='Enter name' className='col-span-3' />
                            </div>
                            <div className='grid gap-4'>
                                <Label htmlFor='price' className='text-left'>
                                    Price
                                </Label>
                                <Input id='price' className='col-span-3' placeholder='Enter price' />
                            </div>
                        </div>
                    </form>
                    <DialogFooter>
                        <Button variant='outline' onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type='submit' >
                            Add Service
                        </Button>
                    </DialogFooter>
                </DialogContent >}
            </Dialog>
        </div >

    )
}

export default AddServiceForm