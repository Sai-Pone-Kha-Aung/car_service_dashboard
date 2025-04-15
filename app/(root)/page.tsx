'use client'
import HeroSection from '@/components/ui/client/hero'
import ProductSection from '@/components/ui/client/product'
import ServiceSection from '@/components/ui/client/services'
import StaffSection from '@/components/ui/client/staff'
import BlogSection from '@/components/ui/client/blog'
import React from 'react'
import MarketingSection from '@/components/ui/client/marketing'

const HomePage = () => {
    const [isMounted, setIsMounted] = React.useState(false)
    React.useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null
    }
    return (
        <>
            <HeroSection />
            <ServiceSection />
            <ProductSection />
            <StaffSection />
            <BlogSection />
            <MarketingSection />
        </>
    )
}

export default HomePage