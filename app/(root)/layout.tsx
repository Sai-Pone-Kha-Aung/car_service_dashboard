import Sidebar from '@/components/ui/dashboard/sidebar/sidebar'
import Header from '@/components/ui/dashboard/header/header'
import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-row w-screen h-screen overflow-hidden">
            <div className='flex-1'>
                <Sidebar />
            </div>
            <div className='flex-[5] pl-4 overflow-hidden'>
                <Header />
                {children}
            </div>
        </div>
    )
}

export default layout