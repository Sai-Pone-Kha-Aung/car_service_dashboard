import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../card'
import { Button } from '../button'

const BlogSection = () => {
    return (
        <section className='py-16'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <h2 className='text-3xl font-extrabold text-center mb-8'>
                    Latest from Our Blog
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {['5 Tips for Better Fuel Efficiency', 'Understanding Your Car\'s Warning Lights', 'The Importance of Regular Oil Changes'].map((title) => (
                        <Card key={title}>
                            <CardHeader>
                                <CardTitle>{title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline">Read More</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BlogSection