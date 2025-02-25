import EditForm from '@/components/ui/dashboard/form/edit-form'
import { servicesData, statusOptions as rawStatusOptions, staffData } from '@/constants/Data'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    category: string;
    reorder: number;
    serviceid: number;
    image: string;
    description: string;
}

interface CustomerData {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    cars: Car[];
    orders: OrderData[];
    avatar?: string;
    password: string;
    appointments: AppointmentData[];
    cart: CartItem[];
    payments: PaymentData[];
    createdat: string;
    updatedat: string;
}

interface AppointmentData {
    appointment_id: number;
    service_id: number;
    mechanic_id: number;
    appointment_name: string;
    appointment_car: string;
    appointment_date: string;
    appointment_status: string;
    appointment_time: string;
    service_name: string;
    service_price: string;
    mechanic_name: string;
    mechanic_role: string;
    mechanic_email: string;
    user_name: string;
}

const statusOptions = rawStatusOptions.map(option => ({
    id: option.id,
    name: option.label
}));

export const EditCar = ({ carData }: { carData: CarData }) => {
    const fields = [
        { id: 'name', label: 'Name', placeholder: 'Enter name', defaultValue: carData.name || '', type: 'input' as 'input' },
        { id: 'make', label: 'Make', placeholder: 'Enter make', defaultValue: carData.make || '', type: 'input' as 'input' },
        { id: 'model', label: 'Model', placeholder: 'Enter model', defaultValue: carData.model || '', type: 'input' as 'input' },
        { id: 'problems', label: 'Problems', placeholder: 'Enter problems', defaultValue: carData.problems || '', type: 'input' as 'input' },
        { id: 'year', label: 'Year', placeholder: 'Enter year', defaultValue: carData.year || 0, type: 'input' as 'input' },
    ]

    const handleSave = (data: { [key: string]: string | number | File }) => {
        console.log('Saved data:', data)
    }

    return (
        <EditForm
            title="Edit Car Info"
            description="Edit a car. Click save when you're done."
            fields={fields}
            onSave={handleSave}
            variant='ghost'
        />
    )
}

export const EditInventory = ({ product }: { product: Product }) => {
    const router = useRouter()
    const [uploadImage, setUploadImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string>(product.image || '');

    const fields = [
        { id: 'name', label: 'Name', placeholder: 'Enter name', defaultValue: product.name || '', type: 'input' as 'input' },
        { id: 'quantity', label: 'Quantity', placeholder: 'Enter quantity', defaultValue: product.quantity || 0, type: 'input' as 'input' },
        { id: 'reorder', label: 'Reorder', placeholder: 'Enter reorder level', defaultValue: product.reorder || 0, type: 'input' as 'input' },
        { id: 'price', label: 'Price', placeholder: 'Enter price', defaultValue: product.price || 0, type: 'input' as 'input' },
        { id: 'category', label: 'Category', placeholder: 'Enter category', defaultValue: product.category || '', type: 'input' as 'input' },
        { id: 'description', label: 'Description', placeholder: 'Enter description', defaultValue: product.description || '', type: 'textarea' as 'textarea' },
        { id: 'serviceid', label: 'Service ID', placeholder: 'Enter service ID', defaultValue: product.serviceid || '', type: 'input' as 'input' },
        { id: 'image', label: 'Image', defaultValue: typeof product.image === 'string' ? product.image : '', type: 'file' as 'file' },
    ]
    useEffect(() => {
        if (product.image && typeof product.image === 'string') {
            setPreviewImage(product.image); // Use the string as-is
        }
    }, [product.image]);


    const handleSave = async (data: { [key: string]: string | number | File }) => {
        const formData = new FormData();
        formData.append('id', String(product.id));
        if (data.name) formData.append('name', data.name as string);
        if (data.quantity) formData.append('quantity', String(data.quantity));
        if (data.reorder) formData.append('reorder', String(data.reorder));
        if (data.price) formData.append('price', String(data.price));
        if (data.category) formData.append('category', data.category as string);
        if (data.serviceid) formData.append('serviceid', data.serviceid as string);
        if (data.description) formData.append('description', data.description as string);
        if (uploadImage) formData.append('image', uploadImage);
        console.log("formdata", [...formData.entries()]);
        try {
            const response = await fetch('/api/product', {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            const result = await response.json();
            router.refresh();
            console.log('Product updated:', result);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleImageChange = (image: File) => {
        setUploadImage(image);
        setPreviewImage(URL.createObjectURL(image));
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch('/api/product', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            const result = await response.json();
            router.refresh();
            console.log('Product updated:', result);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };


    return (
        <EditForm
            title="Edit Inventory Info"
            description="Edit a inventory. Click save when you're done."
            fields={fields}
            onSave={handleSave}
            variant='ghost'
            onChangeImage={handleImageChange}
            onDelete={() => handleDelete(product.id)}
            previewImage={previewImage}
        />
    )
}

export const EditService = ({ serviceData }: { serviceData: Service }) => {
    const router = useRouter();

    const fields = [
        { id: 'name', label: 'Name', placeholder: 'Enter name', defaultValue: serviceData.name || '', type: 'input' as 'input' },
        { id: 'price', label: 'Price', placeholder: 'Enter price', defaultValue: serviceData.price || 0, type: 'input' as 'input' },
        { id: 'title', label: 'Title', placeholder: 'Enter title', defaultValue: serviceData.title || '', type: 'input' as 'input' },
        { id: 'description', label: 'Description', placeholder: 'Enter description', defaultValue: serviceData.description || '', type: 'textarea' as 'textarea' },
        { id: 'category', label: 'Category', placeholder: 'Enter category', defaultValue: serviceData.category || '', type: 'input' as 'input' },
    ]

    const handleSave = async (data: { [key: string]: string | number | File }) => {
        try {
            if (!serviceData.id) {
                throw new Error('Service ID is required');
            }

            const response = await fetch('/api/service', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    id: serviceData.id
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update service');
            }

            const result = await response.json();
            console.log('Service updated:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    }


    const handleDelete = async (id: number) => {
        try {
            const response = await fetch('/api/service', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete service');
            }

            console.log('Service deleted successfully');
            router.refresh();
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    }


    return (
        <EditForm
            title="Edit Service Info"
            description="Edit a service. Click save when you're done."
            fields={fields}
            onSave={handleSave}
            onDelete={() => handleDelete(serviceData.id)}
            variant='ghost'
        />
    )
}

export const EditAppointment = ({ appointmentData }: { appointmentData: AppointmentData }) => {
    const [servicesData, setServicesData] = useState<Service[]>([]);
    const [staffData, setStaffData] = useState<StaffData[]>([]);
    const [statusOptions, setStatusOptions] = useState<{ id: number, name: string }[]>([]);

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

    const rawStatusOptions = [
        { id: 1, name: 'Pending' },
        { id: 2, name: 'In Progress' },
        { id: 3, name: 'Completed' },
        { id: 4, name: 'Cancelled' },
        { id: 5, name: 'Upcoming' },

    ]

    useEffect(() => {
        fetchServices();
        fetchStaff();
    }, []);

    const fields = [
        { id: 'name', label: 'Name', placeholder: 'Enter name', defaultValue: appointmentData.user_name || '', type: 'input' as 'input' },
        { id: 'car', label: 'Car', placeholder: 'Enter car', defaultValue: appointmentData.appointment_car || '', type: 'input' as 'input' },
        { id: 'service', label: 'Service', placeholder: 'Enter service', defaultValue: appointmentData.service_name || '', type: 'select' as 'select', options: servicesData },
        { id: 'date', label: 'Date', placeholder: 'Enter date', defaultValue: appointmentData.appointment_date || '', type: 'input' as 'input' },
        { id: 'status', label: 'Status', placeholder: 'Enter status', defaultValue: appointmentData.appointment_status || '', type: 'select' as 'select', options: rawStatusOptions },
        { id: 'staff', label: 'Staff', placeholder: 'Enter staff', defaultValue: (appointmentData.mechanic_name) || '', type: 'select' as 'select', options: staffData.filter(staff => staff.role === 'Mechanic').map(staff => ({ id: staff.id, name: staff.name })) },
    ]

    const handleSave = async (data: { [key: string]: string | number | File }) => {
        try {
            const response = await fetch('/api/appointment', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: appointmentData.appointment_id,
                    name: data.name,
                    car: data.car,
                    service: data.service,
                    date: data.date,
                    status: data.status
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update appointment');
            }

            const result = await response.json();
            console.log('Appointment updated:', result);
        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    }

    const handleDelete = async (appointment_id: number, service_id: number, mechanic_id: number) => {
        try {
            const response = await fetch('/api/appointmentServices', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ appointment_id, service_id, mechanic_id }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete service');
            }

            console.log('Service deleted successfully');
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    }


    return (
        <EditForm
            title="Edit Appointment Info"
            description="Edit a appointment. Click save when you're done."
            fields={fields}
            onSave={handleSave}
            onDelete={() => handleDelete(appointmentData.appointment_id, appointmentData.service_id, appointmentData.mechanic_id)}
            variant='ghost'
        />
    )
}

export const EditCustomer = ({ customerData }: { customerData: CustomerData }) => {
    const fields = [
        { id: 'name', label: 'Name', placeholder: 'Enter name', defaultValue: customerData.name || '', type: 'input' as 'input' },
        { id: 'email', label: 'Email', placeholder: 'Enter email', defaultValue: customerData.email || '', type: 'input' as 'input' },
        { id: 'phone', label: 'Phone', placeholder: 'Enter phone', defaultValue: customerData.phone || '', type: 'input' as 'input' },
        { id: 'address', label: 'Address', placeholder: 'Enter address', defaultValue: customerData.address || '', type: 'input' as 'input' },
    ]
    const handleSave = async (data: { [key: string]: string | number | File }) => {
        try {
            if (!customerData.id) {
                throw new Error('Customer ID is required');
            }

            const response = await fetch('/api/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    id: customerData.id
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update customer');
            }

            const result = await response.json();
            console.log('Customer updated:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const handleDelete = async (id: number) => {
        try {
            if (!customerData.id) {
                throw new Error('Customer ID is required');
            }

            const response = await fetch('/api/user', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete service');
            }

            console.log('Service deleted successfully');
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    }



    return (
        <EditForm
            title="Edit Customer Info"
            description="Edit a customer. Click save when you're done."
            fields={fields}
            onSave={handleSave}
            variant={'outline'}
            onDelete={() => handleDelete(customerData.id)}
            className='flex items-center p-4 font-semibold'
        />
    )
}

export const EditStaff = ({ staffData }: { staffData: StaffData }) => {
    const router = useRouter();
    const [uploadImage, setUploadImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string>(staffData.avatar || '');
    const fields = [
        { id: 'name', label: 'Name', placeholder: 'Enter name', defaultValue: staffData.name || '', type: 'input' as 'input' },
        { id: 'role', label: 'Role', placeholder: 'Enter role', defaultValue: staffData.role || '', type: 'input' as 'input' },
        { id: 'email', label: 'Email', placeholder: 'Enter email', defaultValue: staffData.email || '', type: 'input' as 'input' },
        { id: 'avatar', label: 'Image', defaultValue: staffData.avatar || '', type: 'file' as 'file' },
        // { id: 'image', label: 'Image', defaultValue: typeof product.image === 'string' ? product.image : '', type: 'file' as 'file' },
    ]

    useEffect(() => {
        if (staffData.avatar && typeof staffData.avatar === 'string') {
            setPreviewImage(staffData.avatar); // Use the avatar image as-is
        }
    }, [staffData.avatar]);


    const handleSave = async (data: { [key: string]: string | number | File }) => {
        const formData = new FormData();
        formData.append('id', String(staffData.id));
        if (data.name) formData.append('name', data.name as string);
        if (data.email) formData.append('email', String(data.email));
        if (data.role) formData.append('role', String(data.role));
        if (uploadImage) formData.append('avatar', uploadImage);
        console.log("formdata", [...formData.entries()]);
        try {
            const response = await fetch('/api/staff', {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to update staff');
            }

            const result = await response.json();
            router.refresh();
            console.log('Staff updated:', result);
        } catch (error) {
            console.error('Error updating staff:', error);
        }
    };

    const handleImageChange = (image: File) => {
        setUploadImage(image);
        setPreviewImage(URL.createObjectURL(image));
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch('/api/staff', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete staff');
            }

            console.log('Service deleted successfully');
            router.refresh();
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    }

    return (
        <EditForm
            title="Edit Staff Info"
            description="Edit a staff. Click save when you're done."
            fields={fields}
            onSave={handleSave}
            onDelete={() => handleDelete(staffData.id)}
            previewImage={previewImage}
            onChangeImage={handleImageChange}
            variant='ghost'
        />
    )
}

export const EditOrder = ({ orderData }: { orderData: OrderData }) => {
    const fields = [
        { id: 'product', label: 'Product', placeholder: 'Enter product', defaultValue: orderData.product || '', type: 'input' as 'input' },
        { id: 'quantity', label: 'Quantity', placeholder: 'Enter quantity', defaultValue: orderData.quantity || 0, type: 'input' as 'input' },
        { id: 'price', label: 'Price', placeholder: 'Enter price', defaultValue: orderData.price || 0, type: 'input' as 'input' },
        { id: 'total', label: 'Total', placeholder: 'Enter total', defaultValue: orderData.total || 0, type: 'input' as 'input' },
        { id: 'date', label: 'Date', placeholder: 'Enter date', defaultValue: orderData.date || '', type: 'input' as 'input' },
        { id: 'status', label: 'Status', placeholder: 'Enter status', defaultValue: orderData.status || '', type: 'select' as 'select', options: statusOptions },
    ]

    const handleSave = async (data: { [key: string]: string | number | File }) => {
        try {
            if (!orderData.id) {
                throw new Error('Order ID is required');
            }

            const response = await fetch('/api/order', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    id: orderData.id
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update service');
            }

            const result = await response.json();
            console.log('Service updated:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch('/api/order', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete order');
            }

            console.log('Order deleted successfully');
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    }
    return (
        <EditForm
            title="Edit Order Info"
            description="Edit a order. Click save when you're done."
            fields={fields}
            onSave={handleSave}
            onDelete={() => handleDelete(orderData.id)}
            variant='ghost'
        />
    )
}