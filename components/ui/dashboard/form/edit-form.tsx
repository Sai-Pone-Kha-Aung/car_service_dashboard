'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '@/components/ui/select'
import { Edit, Upload } from 'lucide-react'
import Image from 'next/image'
import ImageUpload from '@/components/share_components/image_upload'
import { Textarea } from '../../textarea'

interface FormField {
    id: string
    label: string
    placeholder?: string
    defaultValue: string | number
    type: 'input' | 'select' | 'textarea' | 'file'
    options?: { id: string | number, name: string }[]
}

interface EditFormProps {
    title: string
    description: string
    fields: FormField[]
    onSave: (data: { [key: string]: string | number | File }) => void
    onDelete?: () => void
    onChangeImage?: (image: File) => void
    previewImage?: string
    variant?: 'ghost' | 'outline'
    className?: string
}

const EditForm = ({ title, description, fields, onSave, variant, className, onDelete, onChangeImage, previewImage }: EditFormProps) => {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState<{ [key: string]: string | number | File }>({})

    const handleChange = (id: string, value: string | number | File) => {
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldId: string) => {
        const file = e.target.files?.[0];
        if (file) {
            handleChange(fieldId, file);
            onChangeImage?.(file);
        }
    }

    const handleSave = () => {
        onSave(formData)
        setOpen(false)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const handleDelete = () => {
        onDelete?.()
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
                                    ) : field.type === 'select' ? (
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
                                    ) : field.type === 'file' ? (
                                        <div className="mb-4">
                                            <div className="flex flex-col justify-start items-start gap-4">
                                                {previewImage && (
                                                    <Image
                                                        src={previewImage}
                                                        alt="Featured"
                                                        width={160}
                                                        height={160}
                                                        className="object-cover rounded"
                                                    />
                                                )}
                                                <Input
                                                    id={field.id}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageUpload(e, field.id)}
                                                    className="col-span-3"
                                                />
                                            </div>
                                        </div>

                                    ) : field.type === 'textarea' ? (
                                        <Textarea
                                            id={field.id}
                                            placeholder={field.placeholder}
                                            className='col-span-3 h-24'
                                            defaultValue={String(field.defaultValue)}
                                            onChange={e => handleChange(field.id, e.target.value)}
                                        />
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </form>
                    <DialogFooter>
                        <div className="w-full flex justify-between">
                            <Button
                                type='button'
                                variant="destructive"
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                            <div className="flex gap-2">
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
                            </div>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditForm