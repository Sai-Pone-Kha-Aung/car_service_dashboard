import Sidebar from '@/components/ui/dashboard/sidebar/sidebar'
import Header from '@/components/ui/dashboard/header/header'
import React, { ReactNode } from 'react'
import ProtectedRoute from '@/lib/ProtectedRoute'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <ProtectedRoute>
            <div className="flex flex-row w-screen h-screen overflow-hidden">
                <div className='flex-1'>
                    <Sidebar />
                </div>
                <div className='flex-[5] overflow-y-scroll'>
                    <Header />
                    {children}
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default layout