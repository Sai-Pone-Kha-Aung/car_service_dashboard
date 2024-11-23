import EditForm from '@/components/ui/dashboard/form/edit-form'
import { servicesData, statusOptions as rawStatusOptions } from '@/constants/Data'

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

    const handleSave = (data: { [key: string]: string | number }) => {
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

export const EditInventory = ({ stockData }: { stockData: Stock }) => {
    const fields = [
        { id: 'name', label: 'Name', placeholder: 'Enter name', defaultValue: stockData.name || '', type: 'input' as 'input' },
        { id: 'quantity', label: 'Quantity', placeholder: 'Enter quantity', defaultValue: stockData.quantity || 0, type: 'input' as 'input' },
        { id: 'reorder', label: 'Reorder', placeholder: 'Enter reorder level', defaultValue: stockData.reorder || 0, type: 'input' as 'input' },
        { id: 'price', label: 'Price', placeholder: 'Enter price', defaultValue: stockData.price || 0, type: 'input' as 'input' },
    ]

    const handleSave = (data: { [key: string]: string | number }) => {
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

    const handleSave = (data: { [key: string]: string | number }) => {
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
        { id: 'service', label: 'Service', placeholder: 'Enter service', defaultValue: appointmentData.service || '', type: 'select' as 'select', options: servicesData },
        { id: 'date', label: 'Date', placeholder: 'Enter date', defaultValue: appointmentData.date || '', type: 'input' as 'input' },
        { id: 'status', label: 'Status', placeholder: 'Enter status', defaultValue: appointmentData.status || '', type: 'select' as 'select', options: statusOptions },
    ]

    const handleSave = (data: { [key: string]: string | number }) => {
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
    const handleSave = (data: { [key: string]: string | number }) => {
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
    ]

    const handleSave = (data: { [key: string]: string | number }) => {
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
