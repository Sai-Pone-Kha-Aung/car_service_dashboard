'use client'
import React from 'react'
import { Button } from '../button'
import { useRouter } from 'next/navigation'

const MarketingSection = () => {
    const router = useRouter()
    return (
        <section className="py-16 bg-primary text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold mb-4">Ready to Experience Superior Car Care?</h2>
                    <p className="text-xl mb-8">Join thousands of satisfied customers who trust us with their vehicles.</p>
                    <Button size="lg" variant="secondary"
                        onClick={() => {
                            router.push('/appointment')
                        }}
                    >Schedule Your Service Today</Button>
                </div>
            </div>
        </section>
    )
}

export default MarketingSection