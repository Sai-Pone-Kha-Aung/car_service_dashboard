'use client'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarPlus, Plus, Upload } from 'lucide-react'
import SearchModal from '@/components/ui/dashboard/search/searchModal'
import { product, servicesData, staffData } from '@/constants/Data'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import ImageUpload from '@/components/share_components/image_upload'

interface FormField {
    id: string;
    label: string;
    placeholder?: string;
    type?: string;
    options?: { id: string | number, name: string }[]
}

interface AddFormProps {
    title: string;
    description: string;
    fields: FormField[];
    onSubmit: (data: { [key: string]: string }) => void;
    triggerLabel: string;
    className?: string;
    onChangeImage?: (image: File) => void;
    previewImage?: string;
    variant?: 'ghost' | 'outline';
}

const AddForm = ({ title, description, fields, onSubmit, triggerLabel, variant, onChangeImage, previewImage }: AddFormProps) => {

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<{ [key: string]: string | File | number }>({});
    const [date, setDate] = useState<Date>();
    const [customerFound, setCustomerFound] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [servicesData, setServicesData] = useState<Service[]>([]);
    const [staffData, setStaffData] = useState<StaffData[]>([]);
    const [userData, setUserData] = useState<CustomerData[]>([]);
    const [productData, setProductData] = useState<Product[]>([]);
    const [uploadImage, setUploadImage] = useState<File | ''>('');
    const pathname = usePathname();
    const router = useRouter();

    const isAppointmentsPath = pathname === '/admin/appointments';

    const fetchServices = async () => {
        try {
            const res = await fetch('/api/service');
            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }
            const response = await res.json();
            setServicesData(response);
        } catch (error) {
            console.error("Failed to fetch services");
        }
    }

    const fetchStaff = async () => {
        try {
            const res = await fetch('/api/staff');
            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }
            const response = await res.json();
            setStaffData(response);
        } catch (error) {
            console.error("Failed to fetch services");
        }
    }

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/user');
            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }
            const response = await res.json();
            setUserData(response);
        } catch (error) {
            console.error("Failed to fetch users");
        }
    }


    const fetchProduct = async () => {
        try {
            const res = await fetch('/api/product');
            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }
            const response = await res.json();
            setProductData(response);
        } catch (error) {
            console.error("Failed to fetch services");
        }
    }


    useEffect(() => {
        fetchServices();
        fetchStaff();
        fetchUser();
        fetchProduct();
    }, [])

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
        setFormData({
            ...formData,
            customer: customer.name
        })
    }

    const handleSelectMechanic = (mechanicName: string) => {
        setFormData({
            ...formData,
            mechanic: mechanicName
        })
    }


    const handleSelectService = (serviceName: string) => {
        setFormData({
            ...formData,
            service: serviceName
        })
    }

    const handleNewCustomer = () => {
        router.push('/admin/customers')
        setOpen(false)
    }

    const handleSelectedUser = (userName: string) => {
        setFormData({
            ...formData,
            customer: userName
        })
    }

    const handleSelectProduct = (productName: string) => {
        setFormData({
            ...formData,
            product: productName
        })
    }



    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldId: string) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                [fieldId]: file
            }));
            onChangeImage?.(file);
        }
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
                                        <Label htmlFor={field.id} className='text-left' >
                                            {field.label}
                                        </Label>
                                        {field.id === 'mechanic' ? (
                                            <Select onValueChange={handleSelectMechanic}
                                            >
                                                <SelectTrigger className='col-span-3'>
                                                    <SelectValue placeholder='Select mechanic' />
                                                    <SelectContent>
                                                        {staffData.map((staff) => (
                                                            <div key={staff.id}>
                                                                {
                                                                    staff.role === 'Mechanic' && (
                                                                        <SelectItem key={staff.id} value={staff.name}>{staff.name}</SelectItem>
                                                                    )
                                                                }
                                                            </div>
                                                        ))}
                                                    </SelectContent>
                                                </SelectTrigger>
                                            </Select>
                                        ) : field.id === 'service' ? (
                                            <Select onValueChange={handleSelectService}>
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

                                        {field.type === 'file' ? (
                                            <div className="mb-4">
                                                <div className="flex flex-col justify-start items-start gap-4">
                                                    {previewImage && (
                                                        <Image
                                                            src={previewImage}
                                                            alt="placeholder"
                                                            width={160}
                                                            height={160}
                                                            className="object-cover rounded"
                                                        />
                                                    )}
                                                    <Input
                                                        id="image"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleImageUpload(e, field.id)}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            field.id === 'customer' && field.label === 'Customer' ? (
                                                <Select onValueChange={handleSelectedUser}
                                                >
                                                    <SelectTrigger className='col-span-3'>
                                                        <SelectValue placeholder='Select customer' />
                                                        <SelectContent>
                                                            {userData.map((user) => (
                                                                <div key={user.id}>
                                                                    {
                                                                        <SelectItem key={user.id} value={user.name}>{user.name}</SelectItem>
                                                                    }
                                                                </div>
                                                            ))}
                                                        </SelectContent>
                                                    </SelectTrigger>
                                                </Select>
                                            ) :
                                                (
                                                    field.id === 'product' ? (
                                                        <Select onValueChange={handleSelectProduct}
                                                        >
                                                            <SelectTrigger className='col-span-3'>
                                                                <SelectValue placeholder='Select customer' />
                                                                <SelectContent>
                                                                    {productData.map((product) => ( // updated variable name
                                                                        <div key={product.id}>
                                                                            {
                                                                                <SelectItem key={product.id} value={product.name}>{product.name}</SelectItem> // updated variable name
                                                                            }
                                                                        </div>
                                                                    ))}
                                                                </SelectContent>
                                                            </SelectTrigger>
                                                        </Select>
                                                    )
                                                        : (
                                                            <Input
                                                                id={field.id}
                                                                placeholder={field.placeholder}
                                                                className='col-span-3'
                                                                type={field.type || 'text'}
                                                                onChange={handleChange}
                                                            />
                                                        )
                                                )
                                        )}
                                    </div>
                                ))}
                            </div>
                        </form>
                    )}
                    <DialogFooter>
                        <Button variant='outline' onClick={handleCancel}>
                            Cancel
                        </Button>
                        {!customerFound && isAppointmentsPath ? (
                            <Button type='submit' onClick={handleNewCustomer}>
                                Add Customer
                            </Button>) : (
                            <Button type='submit' onClick={handleSubmit}>
                                Save
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>}
            </Dialog>
        </div>
    )
}

export default AddForm