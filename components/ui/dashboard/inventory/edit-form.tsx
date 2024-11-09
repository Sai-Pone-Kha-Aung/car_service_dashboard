'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../dialog'
import { Label } from '../../label'
import { Input } from '../../input'
import { Button } from '../../button'
import { Edit } from 'lucide-react'
const EditInventoryForm = ({ stockData }: { stockData: Stock }) => {
    const [open, setOpen] = useState(false)

    const handleCancel = () => {
        setOpen(false)
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

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Inventory Info</DialogTitle>
                        <DialogDescription>
                            Edit a inventory. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form>
                        <div className='grid gap-4 py-4'>
                            <div className='grid gap-4'>
                                <Label htmlFor='name' className='text-left'>
                                    Name
                                </Label>
                                <Input id='name' placeholder='Enter name' className='col-span-3' defaultValue={stockData.name} />
                            </div>
                            <div className='grid gap-4'>
                                <Label htmlFor='quantity' className='text-left'>
                                    Quantity
                                </Label>
                                <Input id='quantity' placeholder='Enter quantity' className='col-span-3' defaultValue={stockData.quantity} />
                            </div>
                            <div className='grid gap-4'>
                                <Label htmlFor='price' className='text-left'>
                                    Price
                                </Label>
                                <Input id='price' className='col-span-3' placeholder='Enter price' defaultValue={stockData.price} />
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
                </DialogContent >
            </Dialog>
        </div >
    )
}

export default EditInventoryForm