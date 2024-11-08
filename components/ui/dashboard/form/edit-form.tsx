'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../dialog'
import { Label } from '../../label'
import { Input } from '../../input'
import { Button } from '../../button'
import { Edit, Plus } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../select'

interface IFieldConfig {
    id: string;
    label: string;
    placeholder: string;
    type: 'text' | 'select';
    options?: { value: string; label: string }[];
}

interface EditFormProps<T> {
    data: T;
    fields: IFieldConfig[];
    triggerText?: string;
    dialogTitle?: string;
    dialogDescription?: string;
}

const EditForm = <T,>({
    data,
    fields,
    triggerText = 'Edit',
    dialogTitle = 'Edit Info',
    dialogDescription = 'Edit the information. Click save when you\'re done.'

}: EditFormProps<T>) => {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState(data)
    const handleCancel = () => setOpen(false)
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className='font-semibold'>
                        <Edit className='mr-2 h-4 w-4' />
                        {triggerText}
                    </Button>
                </DialogTrigger>
                {open && <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{dialogTitle}</DialogTitle>
                        <DialogDescription>
                            {dialogDescription}
                        </DialogDescription>
                    </DialogHeader>
                    <form>
                        <div className='grid gap-4 py-4'>
                            {fields.map(field => (
                                <div key={field.id} className='grid gap-4'>
                                    <Label htmlFor={field.id} className='text-left'>
                                        {field.label}
                                    </Label>
                                    {field.type === 'text' ? (
                                        <Input
                                            id={field.id}
                                            placeholder={field.placeholder}
                                            // value={(formData as any)[field.id]}
                                            // onChange={handleChange}
                                            className='col-span-3'
                                        />
                                    ) : (
                                        <Select value={(formData as any)[field.id]} >
                                            <SelectTrigger>
                                                <SelectValue placeholder={field.placeholder} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>{field.label}</SelectLabel>
                                                    {field.options?.map(option => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
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
                            Add Customer
                        </Button>
                    </DialogFooter>
                </DialogContent >}
            </Dialog>
        </div >

    )
}

export default EditForm