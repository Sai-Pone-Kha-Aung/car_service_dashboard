'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarPlus, Plus } from 'lucide-react'
import SearchModal from '@/components/ui/dashboard/search/searchModal'
import { servicesData } from '@/constants/Data'
import { usePathname, useRouter } from 'next/navigation'

interface FormField {
    id: string;
    label: string;
    placeholder: string;
    type?: string;
}

interface AddFormProps {
    title: string;
    description: string;
    fields: FormField[];
    onSubmit: (data: { [key: string]: string }) => void;
    triggerLabel: string;
    className?: string;
    variant?: 'ghost' | 'outline';
}

const AddForm = ({ title, description, fields, onSubmit, triggerLabel, variant }: AddFormProps) => {

    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState<{ [key: string]: string }>({})
    const [date, setDate] = useState<Date>();
    const [customerFound, setCustomerFound] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState('');

    const pathname = usePathname();
    const router = useRouter();

    const isAppointmentsPath = pathname === '/admin/appointments';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({ ...formData, date: date?.toDateString() || '' })
        setOpen(false)
    }

    const handleCancel = () => {
        setCustomerFound(false)
        setSelectedCustomer('')
        setOpen(false)
    }

    const handleSelectCustomer = (customer: { name: string }) => {
        setCustomerFound(true)
        setSelectedCustomer(customer.name)
    }

    const handleNewCustomer = () => {
        router.push('/admin/customers')
        setOpen(false)
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className='font-semibold' variant={variant}>
                        <Plus className='mr-2 h-4 w-4' />
                        {triggerLabel}
                    </Button>
                </DialogTrigger>
                {open && <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    {!customerFound && isAppointmentsPath && (
                        <div className='grid gap-4 pt-4'>
                            <div className='relative'>
                                <SearchModal onSelectCustomer={handleSelectCustomer} />
                            </div>
                        </div>
                    )}
                    {customerFound && selectedCustomer ? (
                        <form onSubmit={handleSubmit}>
                            <div className='grid gap-4 py-4'>
                                {fields.map(field => (
                                    <div key={field.id} className='grid gap-4'>
                                        <Label htmlFor={field.id} className='text-left'>
                                            {field.label}
                                        </Label>
                                        {field.id === 'service' ? (
                                            <Select>
                                                <SelectTrigger className='col-span-3'>
                                                    <SelectValue placeholder='Select service type' />
                                                    <SelectContent>
                                                        {servicesData.map((service) => (
                                                            <SelectItem key={service.id} value={service.name}>{service.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </SelectTrigger>
                                            </Select>
                                        ) : field.id === 'date' ? (
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant='outline'
                                                        className={`col-span-3 justify-start text-left font-normal ${!date && 'text-muted-foreground'}`}
                                                    >
                                                        <CalendarPlus className='mr-2 h-4 w-4' />
                                                        {date ? date.toDateString() : 'Pick a date'}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className='w-auto p-0'>
                                                    <Calendar
                                                        mode='single'
                                                        selected={date}
                                                        onSelect={setDate}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        ) : (

                                            <Input
                                                id={field.id}
                                                placeholder={field.placeholder}
                                                className='col-span-3'
                                                type={field.type || 'text'}
                                                onChange={handleChange}
                                                defaultValue={field.id === 'customer' ? selectedCustomer : ''}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </form>
                    ) : !isAppointmentsPath && (
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
                                            className='col-span-3'
                                            type={field.type || 'text'}
                                            onChange={handleChange}
                                        />
                                    </div>
                                ))}
                            </div>
                        </form>
                    )}
                    <DialogFooter>
                        <Button variant='outline' onClick={handleCancel}>
                            Cancel
                        </Button>
                        {!customerFound ? (
                            <Button type='submit' onClick={handleNewCustomer}>
                                Add Customer
                            </Button>) : (
                            <Button type='submit' onClick={handleSubmit}>
                                Add
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>}
            </Dialog>
        </div>
    )
}

export default AddForm