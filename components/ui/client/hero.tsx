import React from 'react'
import { Button } from '../button'

const HeroSection = () => {
    return (
        <section className='bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='max-w-3xl mx-auto text-center'>
                    <h1 className='text-4xl font-extrabold sm:text-5xl md:text-6xl'>
                        Your Trusted Car Service Partner
                    </h1>
                    <p className='mt-6 text-xl'>
                        Experience top-notch car care with our expert technicians and state-of-the-art facilities.
                    </p>
                    <div className='flex justify-center mt-10'>
                        <Button className='mr-4' size="lg">
                            Book Now
                        </Button>
                        <Button size="lg" variant="outline" className='text-black'>
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection