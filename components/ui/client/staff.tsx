import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card'
import { Button } from '../button'
import { Avatar, AvatarFallback, AvatarImage } from '../avatar'

const StaffSection = () => {
    return (
        <section className='py-16 bg-gray-50'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <h2 className='text-3xl font-extrabold text-center mb-8'>
                    Meet Our Team
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {['Staff 1', 'Staff 2', 'Staff 3'].map((name, index) => (
                        <Card key={name}>
                            <CardHeader>
                                <Avatar className="w-24 h-24 mx-auto">
                                    <AvatarImage src={`https://i.pravatar.cc/150?img=${index + 1}`} />
                                    <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <CardTitle className="text-center mt-4">{name}</CardTitle>
                                <CardDescription className="text-center">Master Technician</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center">10+ years of experience in automotive repair and maintenance.</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default StaffSection