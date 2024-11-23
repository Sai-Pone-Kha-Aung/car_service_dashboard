import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-gray-800 text-white'>
            <div className='container mx-auto sm:px-6 lg:px-8 py-12'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-8 px-2 sm:px-0'>
                    <div>
                        <h3 className='text-lg font-semibold mb-4'>
                            About Us
                        </h3>
                        <p>
                            Your trusted partner in automotive care since 2022.
                        </p>
                    </div>
                    <div>
                        <h3 className='text-lg font-semibold mb-4'>
                            Quick Links
                        </h3>
                        <ul className='space-y-2'>

                            <li>
                                <Link href='/' className='hover:text-primary'>Home</Link>
                            </li>
                            <li>
                                <Link href='#' className='hover:text-primary'>Services</Link>
                            </li>
                            <li>
                                <Link href='#' className='hover:text-primary'>Products</Link>
                            </li>
                            <li>
                                <Link href='#' className='hover:text-primary'>Blog</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='text-lg font-semibold mb-4'>
                            Contact Us
                        </h3>
                        <p>123 Auto Street, Car City, ST 12345</p>
                        <p>Phone: (123) 456-7890</p>
                        <p>Email: info@carservicepro.com</p>
                    </div>
                    <div>
                        <h3 className='text-lg font-semibold mb-4'>
                            Follow Us
                        </h3>
                        <ul className='space-y-2'>

                            <li>
                                <Link href='/' className='hover:text-primary flex'>
                                    Facebook</Link>
                            </li>
                            <li>
                                <Link href='/' className='hover:text-primary flex'>
                                    Instagram</Link>
                            </li>
                            <li>
                                <Link href='/' className='hover:text-primary flex'>
                                    Line</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer