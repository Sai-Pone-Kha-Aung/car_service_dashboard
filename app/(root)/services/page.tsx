import React from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const Page = () => {
    return (
        <div className='min-h-screen bg-white mx-auto'>

            <div className='bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20'>
                <div className='mx-auto text-center'>
                    <h1 className='text-4xl font-bold mb-4'>
                        Our Services
                    </h1>
                    <p className="text-xl opacity-90">Professional automotive care for your vehicle</p>
                </div>
            </div>

            <div className='container mx-auto px-4 py-16'>
                <div className='max-w-2xl mx-auto mb-12'>
                    <div className='relative'>
                        <Input
                            type="search"
                            placeholder='Search service...'
                            className='w-full pl-10'
                        />
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                    </div>
                </div>

                <Tabs defaultValue='all' className='w-fulll mb-12'>
                    <TabsList className='grid w-full grid-cols-4'>
                        <TabsTrigger value="all">All Services</TabsTrigger>
                        <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                        <TabsTrigger value="repair">Repair</TabsTrigger>
                        <TabsTrigger value="diagnostic">Diagnostic</TabsTrigger>
                    </TabsList>
                    {['all', 'maintenance', 'repair', 'diagnostic'].map((category) => (
                        <TabsContent key={category} value={category}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {renderServiceCards()}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>

            </div>
        </div>
    )
}

export default Page

function renderServiceCards() {
    const services = [
        { title: "Oil Change", description: "Regular oil changes to keep your engine running smoothly.", category: "maintenance" },
        { title: "Brake Service", description: "Comprehensive brake inspections and repairs for your safety.", category: "Repair" },
        { title: "Engine Diagnostics", description: "Advanced diagnostics to identify and resolve engine issues.", category: "Diagnostic" },
        { title: "Tire Rotation", description: "Extend the life of your tires with regular rotations.", category: "maintenance" },
        { title: "Battery Replacement", description: "Expert battery testing and replacement services.", category: "Repair" },
        { title: "A/C Service", description: "Keep your car cool with our A/C maintenance and repair.", category: "Repair" },
        { title: "Transmission Service", description: "Maintain your transmission for smooth gear shifts.", category: "maintenance" },
        { title: "Wheel Alignment", description: "Ensure proper wheel alignment for better handling and tire longevity.", category: "maintenance" },
        { title: "Electrical System Check", description: "Comprehensive electrical system diagnostics and repair.", category: "Diagnostic" },
    ]

    return services.map((service, index) => (
        <Card key={index}>
            <CardHeader>
                <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>{service.description}</CardDescription>
                <CardDescription>$9.9</CardDescription>
            </CardContent>
            <CardFooter className='flex items-center'>
                <div className='flex flex-col gap-4 justify-center items-start'>
                    <Badge>{service.category}</Badge>
                    <Button size="sm">Book Service</Button>
                </div>
            </CardFooter>
        </Card>
    ))
}