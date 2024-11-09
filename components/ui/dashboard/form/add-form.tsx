'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../dialog'
import { Label } from '../../label'
import { Input } from '../../input'
import { Button } from '../../button'
import { Plus } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../select'

interface Props {
    placeholder?: string;
    label?: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    status?: string;
}

interface FormData {
    data: Props[];
    title: string;
    btn_label: string;
    des: string;
}

const AddForm = ({ data, title, btn_label, des }: FormData) => {
    const [open, setOpen] = useState(false)
    const handleCancel = () => setOpen(false)
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className='font-semibold'>
                        <Plus className='mr-2 h-4 w-4' />
                        {btn_label}
                    </Button>
                </DialogTrigger>
                {open && <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {des}
                        </DialogDescription>
                    </DialogHeader>
                    <form>
                        <div className='grid gap-4 py-4'>
                            {data.map((item, index) => (
                                <div key={index} className='grid gap-4'>

                                    {item.status ? (
                                        <>
                                            <Label htmlFor={item.label} className='text-left'>
                                                {item.name}
                                            </Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={`${item.status}`} />
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
                                        </>
                                    ) : (
                                        <>
                                            <Label htmlFor={`input-${index}`} className='text-left'>
                                                {item.label}
                                            </Label>
                                            <Input id={`input-${index}`} className='col-span-3' placeholder={item.placeholder} />
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </form>
                    <DialogFooter>
                        <Button variant='outline' onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type='submit' >
                            Submit
                        </Button>
                    </DialogFooter>
                </DialogContent >}
            </Dialog>
        </div >

    )
}

export default AddForm