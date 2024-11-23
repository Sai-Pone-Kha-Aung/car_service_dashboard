'use client'
import React, { useState } from 'react'
import { Car, Menu, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../button'
import { Badge } from '../badge'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <header>
            <nav className='bg-white shadow-sm'>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center justify-between h-16'>
                        <Link href='/' className='flex-shrink-0'>
                            <Car className='h-8 w-8' />
                        </Link>
                        <div className='hidden md:block'>
                            <div className='ml-10 flex items-baseline space-x-4'>

                                <Link href='/' className='text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium'>Home</Link>
                                <Link href='/products' className='text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium'>Products</Link>
                                <Link href='/services' className='text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium'>Services</Link>
                                <Link href='/blog' className='text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium'>Blog</Link>
                                <Link href='/staff' className='text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium'>Our Staff</Link>

                            </div>
                        </div>
                        <div className='hidden md:block'>
                            <div className='ml-4 flex items-center md:ml-6'>
                                <Button variant="ghost" size="icon" className='relative'>
                                    <ShoppingCart className='h-5 w-5' />
                                    <Badge className='absolute -top-2 -right-2' variant="destructive">3</Badge>
                                </Button>
                                <Button variant="ghost" className='ml-3'>
                                    Sign in
                                </Button>
                                <Button className='ml-3'>
                                    Sign up
                                </Button>
                            </div>
                        </div>
                        <div className='-mr-2 flex md:hidden'>
                            <Button variant="ghost" size="icon" onClick={() => {
                                setIsMenuOpen(!isMenuOpen)
                            }}>
                                <Menu className='h-6 w-6' />
                            </Button>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className='md:hidden'>
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link href="/" className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Home</Link>
                            <Link href='/products' className='text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium'>Products</Link>
                            <Link href='/services' className='text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium'>Services</Link>
                            <Link href='/blog' className='text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium'>Blog</Link>
                            <Link href='/staff' className='text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium'>Our Staff</Link>
                        </div>
                        <div className='pt-4 pb-3 border-t border-gray-200'>
                            <div className='flex items-center px-5'>
                                <Button variant="ghost" size="icon" className='relative'>
                                    <ShoppingCart className='h-5 w-5' />
                                    <Badge className='absolute -top-2 -right-2' variant="destructive">3</Badge>
                                </Button>
                                <Button variant="ghost" className='ml-auto'>
                                    Sign in
                                </Button>
                                <Button className='ml-3'>
                                    Sign up
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar