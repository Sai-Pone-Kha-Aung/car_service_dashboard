'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Users, Home, Truck, Package, Settings, LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const Sidebar = () => {
    const router = useRouter()
    const { logout } = useAuth()

    const handleLogout = () => {
        logout()
        router.push('/signin')
    }

    return (
        <aside className="flex flex-col bg-gray-800 h-full">
            <div className='flex items-center justify-center p-4'>
                <span className="text-2xl font-semibold text-white cursor-pointer"
                    onClick={() => router.push('/admin')}
                >CarService Pro</span>
            </div>
            <nav className='flex flex-col mt-8 px-4 gap-4'>
                <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-600 rounded-lg font-semibold gap-1"
                    onClick={() => router.push('/admin')}>
                    <Home className="mr-3 h-5 w-5" />
                    Home
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-600 rounded-lg font-semibold gap-1" onClick={() => router.push('/admin/appointments')}>
                    <Calendar className="mr-3 h-5 w-5" />
                    Appointments
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-600 rounded-lg font-semibold gap-1" onClick={() => router.push('/admin/customers')}>
                    <Users className="mr-3 h-5 w-5" />
                    Customers
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-600 rounded-lg font-semibold gap-1" onClick={() => router.push('/admin/cars')}>
                    <Truck className="mr-3 h-5 w-5" />
                    Cars
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-600 rounded-lg font-semibold gap-1" onClick={() => router.push('/admin/services')}>
                    <Settings className="mr-3 h-5 w-5" />
                    Services
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-600 rounded-lg font-semibold gap-1" onClick={() => router.push('/admin/inventory')}>
                    <Package className="mr-3 h-5 w-5" />
                    Inventory
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-600 rounded-lg font-semibold gap-1" onClick={() => router.push('/admin/staffs')}>
                    <Users className="mr-3 h-5 w-5" />
                    Staffs
                </a>
            </nav>
            <div className="flex items-center px-4 py-2 mb-4 mx-4 text-gray-300 hover:bg-gray-600 rounded-lg font-semibold gap-1 mt-auto" onClick={handleLogout}>
                <LogOut className="mr-3 h-5 w-5" />
                Log Out
            </div>
        </aside>
    )
}

export default Sidebar