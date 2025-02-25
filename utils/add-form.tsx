'use client'
import AddForm from '@/components/ui/dashboard/form/add-form'
import { product } from '@/constants/Data';
import { useRouter } from 'next/navigation'
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
export const AddCustomerCar = () => {
    const field = [
        { id: 'name', label: 'Name', placeholder: 'Enter name' },
        { id: 'make', label: 'Make', placeholder: 'Enter make' },
        { id: 'model', label: 'Model', placeholder: 'Enter model' },
        { id: 'problem', label: 'Problem', placeholder: 'Enter problem' },
        { id: 'year', label: 'Year', placeholder: 'Enter year', type: 'number' }
    ]
    const handleAddCar = (data: { [key: string]: string | File }) => {
        console.log('Car data:', data)
        // Handle the car data submission
    }

    return (
        <AddForm
            title="Add New Car"
            description="Create a new car. Click save when you're done."
            fields={field}
            onSubmit={handleAddCar}
            triggerLabel="New Car"
        />
    )
}

export const AddInventory = () => {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [uploadImage, setUploadImage] = useState<File | null>(null)
    const [previewImage, setPreviewImage] = useState<string>('')

    const field = [
        { id: 'name', label: 'Name', placeholder: 'Enter name' },
        { id: 'quantity', label: 'Quantity', placeholder: 'Enter quantity', type: 'number' },
        { id: 'reorder', label: 'Reorder', placeholder: 'Enter reorder level', type: 'number' },
        { id: 'price', label: 'Price', placeholder: 'Enter price', type: 'number' },
        { id: 'category', label: 'Category', placeholder: 'Enter category' },
        { id: 'description', label: 'Description', placeholder: 'Enter description' },
        { id: 'serviceid', label: 'Service ID', placeholder: 'Enter service ID' },
        { id: 'image', label: 'Image', type: 'file' }
    ]

    const handleAddInventory = async (data: { [key: string]: string | File }) => {
        try {
            setIsSubmitting(true)
            setError(null)

            // Create FormData object for multipart/form-data submission
            const formData = new FormData()
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value as string | Blob)
                }
            })

            // Make API request to create product
            const response = await fetch('/api/product', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to create inventory item')
            }

            const result = await response.json()
            console.log('Inventory created successfully:', result)

            // Refresh the page or update state as needed
            router.refresh()

            return result // Optional: return the result if needed by the form

        } catch (error) {
            console.error('Error creating inventory:', error)
            setError(error instanceof Error ? error.message : 'An error occurred')
            throw error // Re-throw to let the form handle the error if needed
        } finally {
            setIsSubmitting(false)
        }
    }


    const handleImageChange = (image: File) => {
        setUploadImage(image);
        setPreviewImage(URL.createObjectURL(image));
    };

    return (
        <AddForm
            title="Add New Inventory"
            description="Create a new inventory. Click save when you're done."
            fields={field}
            onSubmit={handleAddInventory}
            onChangeImage={handleImageChange}
            triggerLabel="New Product"
            previewImage={previewImage}
        />
    )
}

export const AddService = () => {
    const router = useRouter()

    const field = [
        { id: 'name', label: 'Name', placeholder: 'Enter name', type: 'text' },
        { id: 'price', label: 'Price', placeholder: 'Enter price', type: 'number' },
        { id: 'title', label: 'Title', placeholder: 'Enter title', type: 'text' },
        { id: 'description', label: 'Description', placeholder: 'Enter description' },
        { id: 'category', label: 'Category', placeholder: 'Enter category', type: 'text' },
    ]

    const handleAddService = async (data: { [key: string]: string | File }) => {
        try {
            const response = await fetch('/api/service', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to create service');
            }

            const result = await response.json();
            router.refresh();
            console.log('Service created:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <AddForm
            title="Add New Service"
            description="Create a new service. Click save when you're done."
            fields={field}
            onSubmit={handleAddService}
            triggerLabel='New Service'
        />
    )
}


export const AddAppointment = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [staff, setStaff] = useState<StaffData[]>([]);
    const router = useRouter();

    const field = [
        { id: 'customer', label: 'Name', placeholder: 'Enter customer name' },
        { id: 'car', label: 'Car', placeholder: 'Enter car' },
        { id: 'service', label: 'Service Type', placeholder: 'Enter service ID', type: 'number' },
        { id: 'date', label: 'Date', placeholder: 'Enter date', type: 'date' },
        { id: 'time', label: 'Time', placeholder: 'Enter time', type: 'time' },
        { id: 'mechanic', label: 'Technician', placeholder: 'Enter mechanic ID', type: 'number' }
    ];

    useEffect(() => {
        const fetchServices = async () => {
            const response = await fetch('/api/service');
            const data = await response.json();
            setServices(data);
        };

        const fetchStaff = async () => {
            const response = await fetch('/api/staff');
            const data = await response.json();
            setStaff(data);
        };

        fetchServices();
        fetchStaff();
    }, []);

    const handleAddAppointment = async (data: { [key: string]: string | File }) => {
        try {
            // Fetch services to map service name to ID (if not already available in formData)
            const userresponse = await fetch("/api/user");
            const users = await userresponse.json();
            const selectedUser = users.find((u: { name: string; id: string }) => u.name === data.customer);

            const serviceresponse = await fetch("/api/service");
            const services = await serviceresponse.json();
            const selectedService = services.find((s: { name: string; id: string }) => s.name === data.service);

            const staffresponse = await fetch("/api/staff");
            const staff = await staffresponse.json();
            const selectedStaff = staff.find((s: { name: string; id: string }) => s.name === data.mechanic);

            const appointmentData = {
                user_id: selectedUser?.id, // Adjust as needed
                name: selectedService.name,
                car: data.car as string || "",
                date: data.date as string || new Date().toDateString(),
                service: [{
                    id: selectedService?.id || "1", // Use actual service ID
                    name: data.service as string || "",
                }],
                status: "Upcoming",
                time: data.time as string || "09:00",
                mechanics: [{
                    id: selectedStaff?.id || 1,
                    name: data.mechanic as string || "",
                    role: "Mechanic",
                    email: "",
                    avatar: "",
                }],
            };

            const apiResponse = await fetch("/api/appointment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(appointmentData),
            });

            if (!apiResponse.ok) {
                throw new Error(`Error: ${apiResponse.status} ${apiResponse.statusText}`);
            }

            const result = await apiResponse.json();
            console.log("Appointment created successfully:", result);
        } catch (error) {
            console.error("Failed to create appointment:", error);
        }
    };

    return (
        <AddForm
            title="Add New Appointment"
            description="Create a new service appointment. Click save when you're done."
            fields={field}
            onSubmit={handleAddAppointment}
            triggerLabel='New Appointment'
        />
    )
}

export const AddCustomer = () => {
    const field = [
        { id: 'name', label: 'Name', placeholder: 'Enter name' },
        { id: 'email', label: 'Email', placeholder: 'Enter email' },
        { id: 'phone', label: 'Phone', placeholder: 'Enter phone' },
        { id: 'address', label: 'Address', placeholder: 'Enter address' },
        { id: 'password', label: 'Password', placeholder: 'Enter password', type: 'password' }
    ]

    const handleAddCustomer = async (data: { [key: string]: string | File }) => {
        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to create service');
            }

            const result = await response.json();
            console.log('Customer created:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <AddForm
            title="Add New Customer"
            description="Create a new customer. Click save when you're done."
            fields={field}
            onSubmit={handleAddCustomer}
            triggerLabel='New Customer'
        />
    )
}

export const AddStaff = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [uploadImage, setUploadImage] = useState<File | null>(null)
    const [previewImage, setPreviewImage] = useState<string>('')
    const router = useRouter();
    const field = [
        { id: 'name', label: 'Name', placeholder: 'Enter name' },
        { id: 'role', label: 'Role', placeholder: 'Enter role' },
        { id: 'email', label: 'Email', placeholder: 'Enter email' },
        { id: 'avatar', label: 'Image', type: 'file' }
    ]

    const handleAddEmployee = async (data: { [key: string]: string | File }) => {
        try {
            setIsSubmitting(true)
            setError(null)

            // Create FormData object for multipart/form-data submission
            const formData = new FormData()
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value as string | Blob)
                }
            })

            // Make API request to create product
            const response = await fetch('/api/staff', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to create inventory item')
            }

            const result = await response.json()
            console.log('Inventory created successfully:', result)

            // Refresh the page or update state as needed
            router.refresh()

            return result // Optional: return the result if needed by the form

        } catch (error) {
            console.error('Error creating inventory:', error)
            setError(error instanceof Error ? error.message : 'An error occurred')
            throw error // Re-throw to let the form handle the error if needed
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleImageChange = (image: File) => {
        setUploadImage(image);
        setPreviewImage(URL.createObjectURL(image));
    };

    return (
        <AddForm
            title="Add New Staff"
            description="Create a new employee. Click save when you're done."
            fields={field}
            onSubmit={handleAddEmployee}
            triggerLabel='New Staff'
            onChangeImage={handleImageChange}
            previewImage={previewImage}
        />
    )
}

export const AddOrder = () => {
    const field = [
        { id: 'customer', label: 'Customer', placeholder: 'Enter customer name' },
        { id: 'product', label: 'Product', placeholder: 'Enter product' },
        { id: 'quantity', label: 'Quantity', placeholder: 'Enter quantity', type: 'number' },
        { id: 'price', label: 'Price', placeholder: 'Enter price', type: 'number' },
        { id: 'total', label: 'Total', placeholder: 'Enter total', type: 'number' },
        { id: 'date', label: 'Date', placeholder: 'Enter date', type: 'date' },
        { id: 'status', label: 'Status', placeholder: 'Enter status' },
        { id: 'paymentStatus', label: 'Payment Status', placeholder: 'Enter payment status' }
    ]



    const handleAddOrder = async (data: { [key: string]: string | File }) => {

        const userresponse = await fetch("/api/user");
        const users = await userresponse.json();
        const selectedUser = users.find((u: { name: string; id: string }) => u.name === data.customer);

        const productresponse = await fetch("/api/product");
        const products = await productresponse.json();
        const selectedProduct = products.find((p: { name: string; id: string }) => p.name === data.product);

        try {
            const formattedData = {
                ...data,
                user_id: selectedUser?.id,
                product_id: selectedProduct?.id,
                date: data.date ? new Date(data.date as string).toISOString() : new Date().toISOString()
            };

            const response = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                throw new Error('Failed to create order');
            }

            const result = await response.json();
            console.log('Order created:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <AddForm
            title="Add New Order"
            description="Create a new order. Click save when you're done."
            fields={field}
            onSubmit={handleAddOrder}
            triggerLabel='New Order'
        />
    )
}