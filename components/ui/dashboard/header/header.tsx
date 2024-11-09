'use client'
import React from 'react'
import { Input } from '../../input'
import { usePathname } from 'next/navigation'

const Header = () => {
    const pathname = usePathname();
    const routeTitles: { [key: string]: string } = {
        '/': 'CarService Pro Dashboard',
        '/appointments': 'Appointments',
        '/customers': 'Customers',
        '/vehicles': 'Vehicles',
        '/services': 'Services',
        '/inventory': 'Inventory',
    }

    let currentRoute = routeTitles[pathname] || 'Dashboard';
    if (/^\/customers\/\d+$/.test(pathname)) {
        currentRoute = 'Customer Details';
    }
    return (
        <div className='flex flex-1 flex-col overflow-hidden'>
            <header className='flex items-center justify-between border-b px-6 py-4'>
                <div className='flex items-center'>
                    <h1 className='text-2xl font-semibold'>{currentRoute}</h1>
                </div>
                {/* <div className='flex items-center'>
                    <Input
                        placeholder='Search'
                        type='search'
                        className='w-64'
                    />
                </div> */}
            </header>
        </div>
    )
}

export default Header