import React from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const page = () => {
    return (
        <div className='min-h-screen bg-white mx-auto'>

            <div className='bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20'>
                <div className='mx-auto text-center'>
                    <h1 className='text-4xl font-bold mb-4'>
                        Meet Our Team
                    </h1>
                    <p className="text-xl opacity-90">The experts behind CarService Pro&apos;s exceptional service</p>
                </div>
            </div>

            <div className='container mx-auto px-4 py-16'>
                <div className='max-w-2xl mx-auto mb-12'>
                    <div className='relative'>
                        <Input
                            type="search"
                            placeholder='Search staff...'
                            className='w-full pl-10'
                        />
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                    </div>
                </div>

                <Tabs defaultValue="all" className="w-full mb-12">
                    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                        <TabsTrigger value="all">All Staff</TabsTrigger>
                        <TabsTrigger value="management">Management</TabsTrigger>
                        <TabsTrigger value="technicians">Technicians</TabsTrigger>
                        <TabsTrigger value="customer-service">Customer Service</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {renderStaffCards()}
                        </div>
                    </TabsContent>
                    <TabsContent value="management">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {renderStaffCards().filter(card => card.props.department === "Management")}
                        </div>
                    </TabsContent>
                    <TabsContent value="technicians">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {renderStaffCards().filter(card => card.props.department === "Technicians")}
                        </div>
                    </TabsContent>
                    <TabsContent value="customer-service">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {renderStaffCards().filter(card => card.props.department === "Customer Service")}
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Team Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { title: "Years of Experience", value: "250+" },
                        { title: "Certified Technicians", value: "20+" },
                        { title: "Happy Customers", value: "10,000+" }
                    ].map((stat, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{stat.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">{stat.value}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default page

function renderStaffCards() {
    const staff = [
        { name: "John Doe", role: "Founder & CEO", department: "Management", bio: "25+ years of automotive industry experience" },
        { name: "Jane Smith", role: "Head Technician", department: "Technicians", bio: "ASE Master Certified with 15 years of experience" },
        { name: "Mike Johnson", role: "Customer Service Manager", department: "Customer Service", bio: "Dedicated to ensuring customer satisfaction" },
        { name: "Emily Brown", role: "Operations Manager", department: "Management", bio: "Streamlining processes for efficient service delivery" },
        { name: "Chris Lee", role: "Senior Mechanic", department: "Technicians", bio: "Specializing in European vehicle repairs" },
        { name: "Sarah Wilson", role: "Service Advisor", department: "Customer Service", bio: "Your go-to person for all service inquiries" },
        { name: "Tom Garcia", role: "Electrical Systems Specialist", department: "Technicians", bio: "Expert in diagnosing and repairing complex electrical issues" },
        { name: "Lisa Chen", role: "Marketing Manager", department: "Management", bio: "Bringing innovative automotive care solutions to you" },
        { name: "Alex Taylor", role: "Apprentice Technician", department: "Technicians", bio: "Eager to learn and assist with your vehicle needs" }
    ]

    return staff.map((member, index) => (
        <Card key={index}>
            <CardHeader>
                <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={`/placeholder.svg?height=96&width=96`} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-center">{member.bio}</p>
            </CardContent>
            <CardFooter className="justify-center">
                <Badge>{member.department}</Badge>
            </CardFooter>
        </Card>
    ))
}