'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Users, Home, Truck, Package, Settings } from 'lucide-react'

const Sidebar = () => {
    const router = useRouter()
    return (
        <aside className="flex flex-col bg-gray-900 h-full">
            <div className='flex items-center justify-between p-4'>
                <span className="text-2xl font-semibold text-white">CarService Pro</span>
            </div>
            <nav className='mt-8 px-4'>
                <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg font-semibold gap-1"
                    onClick={() => router.push('/dashboard')}>
                    <Home className="mr-3 h-5 w-5"
                    />
                    Dashboard
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg font-semibold gap-1" onClick={() => router.push('/appointments')}>
                    <Calendar className="mr-3 h-5 w-5"

                    />
                    Appointments
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg font-semibold gap-1" onClick={() => router.push('/customers')}>
                    <Users className="mr-3 h-5 w-5"

                    />
                    Customers
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg font-semibold gap-1" onClick={() => router.push('/vehicles')}>
                    <Truck className="mr-3 h-5 w-5"

                    />
                    Vehicles
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg font-semibold gap-1" onClick={() => router.push('/services')}>
                    <Settings className="mr-3 h-5 w-5"

                    />
                    Services
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg font-semibold gap-1" onClick={() => router.push('/inventory')}>
                    <Package className="mr-3 h-5 w-5"

                    />
                    Inventory
                </a>
            </nav>
        </aside>
    )
}

export default Sidebar