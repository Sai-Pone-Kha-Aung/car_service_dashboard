'use client'
import React, { ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Footer from '@/components/ui/client/footer'
import Navbar from '@/components/ui/client/navbar'

const layout = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname()
    const isAdminPath = pathname.startsWith('/admin')
    return (
        <div>
            {!isAdminPath && <Navbar />}
            {children}
            {!isAdminPath && <Footer />}
        </div>
    )
}

export default layout