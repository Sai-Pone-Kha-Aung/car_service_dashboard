'use client'
import AddForm from '@/components/ui/dashboard/form/add-form'

export const AddCustomerCar = () => {
    const field = [
        { id: 'name', label: 'Name', placeholder: 'Enter name' },
        { id: 'make', label: 'Make', placeholder: 'Enter make' },
        { id: 'model', label: 'Model', placeholder: 'Enter model' },
        { id: 'year', label: 'Year', placeholder: 'Enter year', type: 'number' }
    ]
    const handleAddCar = (data: { [key: string]: string }) => {
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
    const field = [
        { id: 'name', label: 'Name', placeholder: 'Enter name' },
        { id: 'quantity', label: 'Quantity', placeholder: 'Enter quantity', type: 'number' },
        { id: 'reorder', label: 'Reorder', placeholder: 'Enter reorder level', type: 'number' },
        { id: 'price', label: 'Price', placeholder: 'Enter price', type: 'number' },
    ]

    const handleAddInventory = (data: { [key: string]: string }) => {
        console.log('Inventory data:', data)
        // Handle the inventory data submission
    }
    return (
        <AddForm
            title="Add New Inventory"
            description="Create a new inventory. Click save when you're done."
            fields={field}
            onSubmit={handleAddInventory}
            triggerLabel="New Inventory"
        />
    )
}

export const AddService = () => {
    const field = [
        { id: 'name', label: 'Name', placeholder: 'Enter name' },
        { id: 'price', label: 'Price', placeholder: 'Enter price', type: 'number' },
    ]

    const handleAddService = (data: { [key: string]: string }) => {
        console.log('Service data:', data)
        // Handle the service data submission
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
    const field = [
        { id: 'customer', label: 'Customer', placeholder: 'Enter customer name' },
        { id: 'car', label: 'Car', placeholder: 'Enter car' },
        { id: 'service', label: 'Service Type', placeholder: 'Enter service type' },
        { id: 'date', label: 'Date', placeholder: 'Enter date', type: 'date' }
    ]

    const handleAddAppointment = (data: { [key: string]: string }) => {
        console.log('Appointment data:', data)
        // Handle the appointment data submission
    }

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
    ]

    const handleAddCustomer = (data: { [key: string]: string }) => {
        console.log('Customer data:', data)
        // Handle the customer data submission
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
    const field = [
        { id: 'name', label: 'Name', placeholder: 'Enter name' },
        { id: 'role', label: 'Role', placeholder: 'Enter role' },
        { id: 'email', label: 'Email', placeholder: 'Enter email' },
    ]

    const handleAddEmployee = (data: { [key: string]: string }) => {
        console.log('Employee data:', data)
        // Handle the employee data submission
    }

    return (
        <AddForm
            title="Add New Staff"
            description="Create a new employee. Click save when you're done."
            fields={field}
            onSubmit={handleAddEmployee}
            triggerLabel='New Staff'
        />
    )
}