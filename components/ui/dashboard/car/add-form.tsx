'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const AddVehicalForm = () => {
    const [open, setOpen] = useState(false)
    const handleCancel = () => setOpen(false)
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className='font-semibold'>
                        <Plus className='mr-2 h-4 w-4' />
                        New Car
                    </Button>
                </DialogTrigger>
                {open && <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Vehicel</DialogTitle>
                        <DialogDescription>
                            Create a new car. Click save when you&apos;re done.
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
                                <Label htmlFor='make' className='text-left'>
                                    Make
                                </Label>
                                <Input id='make' placeholder='Enter make' className='col-span-3' />
                            </div>
                            <div className='grid gap-4'>
                                <Label htmlFor='model' className='text-left'>
                                    Model
                                </Label>
                                <Input id='model' placeholder='Enter model' className='col-span-3' />
                            </div>
                            <div className='grid gap-4'>
                                <Label htmlFor='problems' className='text-left'>
                                    Problems
                                </Label>
                                <Input id='problems' className='col-span-3' placeholder='Enter problems' />
                            </div>
                            <div className='grid gap-4'>
                                <Label htmlFor='year' className='text-left'>
                                    Year
                                </Label>
                                <Input id='year' className='col-span-3' placeholder='Enter year' />
                            </div>
                        </div>
                    </form>
                    <DialogFooter>
                        <Button variant='outline' onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type='submit' >
                            Add Vehicel
                        </Button>
                    </DialogFooter>
                </DialogContent >}
            </Dialog>
        </div >

    )
}

export default AddVehicalForm