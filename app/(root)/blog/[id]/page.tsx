import React from 'react'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

const Page = () => {
    return (
        <article className='container mx-auto px-4 py-16 max-w-4xl'>
            <Badge className='mb-4'>Maintenace</Badge>
            <h1 className='text-4xl font-bold mb-6'>The Complete Guid to Electric Vehicle Maintenace</h1>

            <Image
                src="/pic.png"
                width={1200}
                height={600}
                alt="Featured post"
                className="w-full h-[400px] object-cover rounded-lg mb-8"
            />

            <div className="prose max-w-none">
                <p>Electric vehicles (EVs) are becoming increasingly popular due to their environmental benefits and lower operating costs. However, many new EV owners are unsure about the maintenance requirements of their vehicles. This guide will walk you through everything you need to know about keeping your electric vehicle in top condition.</p>

                <h2>1. Battery Care</h2>
                <p>The battery is the heart of your electric vehicle, and proper care is essential for longevity and performance:</p>
                <ul>
                    <li>Avoid extreme temperatures when possible</li>
                    <li>Keep the battery charge between 20% and 80% for daily use</li>
                    <li>Use fast charging sparingly to prevent battery degradation</li>
                </ul>

                <h2>2. Tire Maintenance</h2>
                <p>EVs are typically heavier than traditional vehicles due to their batteries, which can lead to faster tire wear:</p>
                <ul>
                    <li>Rotate tires regularly (every 5,000-8,000 miles)</li>
                    <li>Check tire pressure monthly</li>
                    <li>Align wheels as needed to prevent uneven wear</li>
                </ul>

                <h2>3. Brake System</h2>
                <p>EVs use regenerative braking, which can extend the life of your brake pads. However, regular maintenance is still important:</p>
                <ul>
                    <li>Inspect brake pads annually</li>
                    <li>Clean brake rotors to prevent rust buildup</li>
                    <li>Check brake fluid levels and replace as recommended</li>
                </ul>

                <h2>4. Cooling System</h2>
                <p>While EVs don't have a traditional engine, they still require a cooling system for the battery and electric motor:</p>
                <ul>
                    <li>Check coolant levels regularly</li>
                    <li>Inspect for leaks or damage to cooling components</li>
                    <li>Replace coolant as recommended by the manufacturer</li>
                </ul>

                <h2>5. Software Updates</h2>
                <p>Unlike traditional vehicles, EVs often receive over-the-air software updates that can improve performance and add new features:</p>
                <ul>
                    <li>Keep your vehicle's software up to date</li>
                    <li>Check for updates regularly or enable automatic updates if available</li>
                </ul>

                <p>By following these maintenance tips, you can ensure that your electric vehicle remains efficient, safe, and reliable for years to come. Remember to always consult your vehicle's manual for specific maintenance schedules and recommendations.</p>
            </div>
        </article>
    )
}

export default Page