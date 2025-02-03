'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Users, Home, Truck, Package, Settings, LogOut, PackageCheck, Paperclip, UserCircle2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

const Sidebar = () => {
    const router = useRouter()
    const { logout } = useAuth()

    const handleLogout = () => {
        logout()
        router.push('/sign-in')
    }

    return (
        <aside className="flex flex-col bg-gray-800 h-full">
            <div className='flex items-center justify-center p-4'>
                <span className="text-2xl font-semibold text-white cursor-pointer"
                    onClick={() => router.push('/admin')}
                >CarService Pro</span>
            </div>
            <nav className='flex flex-col mt-8 px-4 gap-4'>
                <Link href="/admin" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-600 rounded-lg font-semibold gap-1">
                    <Home className="mr-3 h-5 w-5" />
                    Home
                </Link>
                <Link href="/admin/appointments" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-600 rounded-lg font-semibold gap-1">
                    <Calendar className="mr-3 h-5 w-5" />
                    Appointments
                </Link>
                <Link href="/admin/customers" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-600 rounded-lg font-semibold gap-1">
                    <Users className="mr-3 h-5 w-5" />
                    Customers
                </Link>
                {/* <Link href="/admin/cars" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-600 rounded-lg font-semibold gap-1">
                    <Truck className="mr-3 h-5 w-5" />
                    Cars
                </Link> */}
                <Link href="/admin/services" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-600 rounded-lg font-semibold gap-1">
                    <Settings className="mr-3 h-5 w-5" />
                    Services
                </Link>
                <Link href="/admin/inventory" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-600 rounded-lg font-semibold gap-1">
                    <Package className="mr-3 h-5 w-5" />
                    Inventory
                </Link>
                <Link href="/admin/orders" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-600 rounded-lg font-semibold gap-1">
                    <PackageCheck className="mr-3 h-5 w-5" />
                    Orders
                </Link>
                <Link href="/admin/blog" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-600 rounded-lg font-semibold gap-1">
                    <Paperclip className="mr-3 h-5 w-5" />
                    Blog
                </Link>
                <Link href="/admin/staffs" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-600 rounded-lg font-semibold gap-1">
                    <UserCircle2 className="mr-3 h-5 w-5" />
                    Staffs
                </Link>
                <Link href="/" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-600 rounded-lg font-semibold gap-1">
                    <Users className="mr-3 h-5 w-5" />
                    User Page
                </Link>
            </nav>
            <div className="flex items-center px-4 py-2 mb-4 mx-4 text-gray-300 hover:bg-gray-600 rounded-lg font-semibold gap-1 mt-auto" onClick={handleLogout}>
                <LogOut className="mr-3 h-5 w-5" />
                Log Out
            </div>
        </aside>
    )
}

export default Sidebar