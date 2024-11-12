'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface FormField {
    id: string;
    label: string;
    placeholder: string;
    type?: string;
}

interface AddInventoryFormProps {
    fields: FormField[];
    onSubmit: (formData: { [key: string]: any }) => void;
}

const AddForm: React.FC<AddInventoryFormProps> = ({ fields, onSubmit }) => {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState<{ [key: string]: any }>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
        setOpen(false)
    }

    const handleCancel = () => setOpen(false)

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className='font-semibold'>
                        <Plus className='mr-2 h-4 w-4' />
                        New Product
                    </Button>
                </DialogTrigger>
                {open && <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add A New Product</DialogTitle>
                        <DialogDescription>
                            Create a new product. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className='grid gap-4 py-4'>
                            {fields.map(field => (
                                <div key={field.id} className='grid gap-4'>
                                    <Label htmlFor={field.id} className='text-left'>
                                        {field.label}
                                    </Label>
                                    <Input
                                        id={field.id}
                                        placeholder={field.placeholder}
                                        type={field.type || 'text'}
                                        className='col-span-3'
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                        </div>
                        <DialogFooter>
                            <Button variant='outline' onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button type='submit'>
                                Add Product
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>}
            </Dialog>
        </div>
    )
}

export default AddForm