'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

const Header = () => {
    const pathname = usePathname();
    const routeTitles: { [key: string]: string } = {
        '/admin': 'CarService Pro Dashboard',
        '/admin/appointments': 'Appointments',
        '/admin/customers': 'Customers',
        '/admin/cars': 'Cars',
        '/admin/services': 'Services',
        '/admin/inventory': 'Inventory',
        '/admin/staffs': 'Staffs',
    }

    let currentRoute = routeTitles[pathname] || 'Dashboard';
    if (/^\/admin\/customers\/\d+$/.test(pathname)) {
        currentRoute = 'Customer Details';
    }

    return (
        <div className='flex flex-1 flex-col overflow-hidden sticky top-0 z-50 bg-background/80'>
            <header className='flex items-center justify-between border-b px-6 py-4'>
                <div className='flex items-center'>
                    <h1 className='text-2xl font-semibold'>{currentRoute}</h1>
                </div>
            </header>
        </div>
    )
}

export default Header