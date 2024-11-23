import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../card'
import { Button } from '../button'

const ServiceSection = () => {
    return (
        <section className='py-16 bg-gray-50'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <h2 className='text-3xl font-extrabold text-center mb-8'>
                    Our Services
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {['Oil Change', 'Break Repair', 'Engine Diagnostics'].map((service) => (
                        <Card key={service}>
                            <CardHeader>
                                <CardTitle className='text-xl font-semibold'>{service}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Professional {service.toLowerCase()} servicee to keep ypur car running smoothly.</p>
                            </CardContent>
                            <CardFooter>
                                <Button>
                                    Book Now
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ServiceSection