'use client'
import React, { ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Footer from '@/components/ui/client/footer'
import Navbar from '@/components/ui/client/navbar'

const layout = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname()
    const isAdminPath = pathname.startsWith('/admin')
    const isSignInPath = pathname.startsWith('/sign-in')
    const isSignUpPath = pathname.startsWith('/sign-up')

    return (
        <>
            {!isAdminPath && !isSignInPath && !isSignUpPath && <Navbar />}
            {children}
            {!isAdminPath && !isSignInPath && !isSignUpPath && <Footer />}
        </>
    )
}

export default layout