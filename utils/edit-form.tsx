import EditForm from '@/components/ui/dashboard/form/edit-form'
import { servicesData, statusOptions as rawStatusOptions, staffData } from '@/constants/Data'

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

export const EditInventory = ({ product }: { product: Stock }) => {
    const fields = [
        { id: 'name', label: 'Name', placeholder: 'Enter name', defaultValue: product.name || '', type: 'input' as 'input' },
        { id: 'quantity', label: 'Quantity', placeholder: 'Enter quantity', defaultValue: product.quantity || 0, type: 'input' as 'input' },
        { id: 'reorder', label: 'Reorder', placeholder: 'Enter reorder level', defaultValue: product.reorder || 0, type: 'input' as 'input' },
        { id: 'price', label: 'Price', placeholder: 'Enter price', defaultValue: product.price || 0, type: 'input' as 'input' },
        { id: 'description', label: 'Description', placeholder: 'Enter description', defaultValue: product.desc || '', type: 'textarea' as 'textarea' },
        { id: 'serviceID', label: 'Service ID', placeholder: 'Enter service ID', defaultValue: product.serviceId || '', type: 'input' as 'input' },
        { id: 'image', label: 'Image', defaultValue: product.image || '', type: 'file' as 'file' },
    ]

    const handleSave = (data: { [key: string]: string | number | File }) => {
        console.log('Saved data:', data)
    }

    return (
        <EditForm
            title="Edit Inventory Info"
            description="Edit a inventory. Click save when you're done."
            fields={fields}
            onSave={handleSave}
            variant='ghost'
        />
    )
}

export const EditService = ({ serviceData }: { serviceData: ServiceData }) => {
    const fields = [
        { id: 'name', label: 'Name', placeholder: 'Enter name', defaultValue: serviceData.name || '', type: 'input' as 'input' },
        { id: 'price', label: 'Price', placeholder: 'Enter price', defaultValue: serviceData.price || 0, type: 'input' as 'input' },
    ]

    const handleSave = (data: { [key: string]: string | number | File }) => {
        console.log('Saved data:', data)
    }

    return (
        <EditForm
            title="Edit Service Info"
            description="Edit a service. Click save when you're done."
            fields={fields}
            onSave={handleSave}
            variant='ghost'
        />
    )
}

export const EditAppointment = ({ appointmentData }: { appointmentData: AppointmentData }) => {
    const fields = [
        { id: 'name', label: 'Name', placeholder: 'Enter name', defaultValue: appointmentData.name || '', type: 'input' as 'input' },
        { id: 'car', label: 'Car', placeholder: 'Enter car', defaultValue: appointmentData.car || '', type: 'input' as 'input' },
        { id: 'service', label: 'Service', placeholder: 'Enter service', defaultValue: appointmentData.service[0].id || '', type: 'select' as 'select', options: servicesData },
        { id: 'date', label: 'Date', placeholder: 'Enter date', defaultValue: appointmentData.date || '', type: 'input' as 'input' },
        { id: 'status', label: 'Status', placeholder: 'Enter status', defaultValue: appointmentData.status || '', type: 'select' as 'select', options: statusOptions },
        { id: 'staff', label: 'Staff', placeholder: 'Enter staff', defaultValue: appointmentData.mechanics[0].id || '', type: 'select' as 'select', options: staffData.filter(staff => staff.role === 'Technician').map(staff => ({ id: staff.id, name: staff.name })) },
    ]

    const handleSave = (data: { [key: string]: string | number | File }) => {
        console.log('Saved data:', data)
    }

    return (
        <EditForm
            title="Edit Appointment Info"
            description="Edit a appointment. Click save when you're done."
            fields={fields}
            onSave={handleSave}
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
    const handleSave = (data: { [key: string]: string | number | File }) => {
        console.log('Saved data:', data)
    }
    return (
        <EditForm
            title="Edit Customer Info"
            description="Edit a customer. Click save when you're done."
            fields={fields}
            onSave={handleSave}
            variant={'outline'}
            className='flex items-center p-4 font-semibold'
        />
    )
}

export const EditStaff = ({ staffData }: { staffData: StaffData }) => {
    const fields = [
        { id: 'name', label: 'Name', placeholder: 'Enter name', defaultValue: staffData.name || '', type: 'input' as 'input' },
        { id: 'role', label: 'Role', placeholder: 'Enter role', defaultValue: staffData.role || '', type: 'input' as 'input' },
        { id: 'email', label: 'Email', placeholder: 'Enter email', defaultValue: staffData.email || '', type: 'input' as 'input' },
        { id: 'avatar', label: 'Image', defaultValue: staffData.avatar || '', type: 'file' as 'file' },
    ]

    const handleSave = (data: { [key: string]: string | number | File }) => {
        console.log('Saved data:', data)
    }

    return (
        <EditForm
            title="Edit Staff Info"
            description="Edit a staff. Click save when you're done."
            fields={fields}
            onSave={handleSave}
            variant='ghost'
        />
    )
}

export const EditOrder = ({ orderData }: { orderData: OrderData }) => {
    const fields = [
        { id: 'product', label: 'Product', placeholder: 'Enter product', defaultValue: orderData.product || '', type: 'input' as 'input' },
        { id: 'quantity', label: 'Quantity', placeholder: 'Enter quantity', defaultValue: orderData.quantity || 0, type: 'input' as 'input' },
        { id: 'price', label: 'Price', placeholder: 'Enter price', defaultValue: orderData.price || 0, type: 'input' as 'input' },
        { id: 'status', label: 'Status', placeholder: 'Enter status', defaultValue: orderData.status || '', type: 'select' as 'select', options: statusOptions },
    ]

    const handleSave = (data: { [key: string]: string | number | File }) => {
        console.log('Saved data:', data)
    }

    return (
        <EditForm
            title="Edit Order Info"
            description="Edit a order. Click save when you're done."
            fields={fields}
            onSave={handleSave}
            variant='ghost'
        />
    )
}