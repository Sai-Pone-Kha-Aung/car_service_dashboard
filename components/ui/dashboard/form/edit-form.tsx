'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '@/components/ui/select'
import { Edit } from 'lucide-react'

interface FormField {
    id: string
    label: string
    placeholder?: string
    defaultValue: string | number
    type: 'input' | 'select'
    options?: { id: string | number, name: string }[]
}

interface EditFormProps {
    title: string
    description: string
    fields: FormField[]
    onSave: (data: { [key: string]: string | number }) => void
    variant?: 'ghost' | 'outline'
    className?: string
}

const EditForm = ({ title, description, fields, onSave, variant, className }: EditFormProps) => {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState<{ [key: string]: string | number }>({})

    const handleChange = (id: string, value: string | number) => {
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const handleSave = () => {
        onSave(formData)
        setOpen(false)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const btnClassName = className || 'flex items-center p-0 h-auto'
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant={variant} className={btnClassName}>
                        <Edit className='h-4 w-4 mr-2' />
                        Edit
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    <form>
                        <div className='grid gap-4 py-4'>
                            {fields.map(field => (
                                <div key={field.id} className='grid gap-4'>
                                    <Label htmlFor={field.id} className='text-left'>
                                        {field.label}
                                    </Label>
                                    {field.type === 'input' ? (

                                        <Input
                                            id={field.id}
                                            placeholder={field.placeholder}
                                            className='col-span-3'
                                            defaultValue={String(field.defaultValue)}
                                            onChange={e => handleChange(field.id, e.target.value)}
                                        />
                                    ) : (
                                        <Select
                                            defaultValue={String(field.defaultValue)}
                                            onValueChange={value => handleChange(field.id, value)}
                                        >
                                            <SelectTrigger className='col-span-3'>
                                                <SelectValue placeholder={field.placeholder} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {field.options?.map(option => (
                                                    <SelectItem key={option.id} value={option.name}>
                                                        {option.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                </div>
                            ))}
                        </div>
                    </form>
                    <DialogFooter>
                        <Button
                            type='button'
                            variant="outline"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button type='button' onClick={handleSave}>
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditForm