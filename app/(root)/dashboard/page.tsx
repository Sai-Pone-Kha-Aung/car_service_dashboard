import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import LowStock from '@/components/ui/dashboard/table/lowstock';
import RecentAppointments from '@/components/ui/dashboard/table/recentappointments';
import { Calendar, ClipboardList, Package, Truck } from 'lucide-react'
import React from 'react'

const cardData = [
  {
    title: 'Total Appointments',
    icon: <Calendar className='h-4 w-4 text-muted-foreground' />,
    value: '24',
    description: '+10% from last month',
  },
  {
    title: 'Vehicles in Service',
    icon: <Truck className='h-4 w-4 text-muted-foreground' />,
    value: '12',
    description: '+2 since yesterday',
  },
  {
    title: 'Pending Invoices',
    icon: <ClipboardList className='h-4 w-4 text-muted-foreground' />,
    value: '8',
    description: '+2 from last week',
  },
  {
    title: 'Low Stock Items',
    icon: <Package className='h-6 w-6 text-muted-foreground' />,
    value: '5',
    description: 'Reorder needed',
  },
];

const page = () => {
  return (
    <div className='flex-1 overflow-y-auto bg-gray-100 h-full p-6'>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {cardData.map((card, index) => (
          <Card key={index}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {card.title}
              </CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div>
                <div className='text-2xl font-bold'>{card.value}</div>
              </div>
              <p className='text-xs text-muted-foreground'>
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className='mt-6 grid gap-6 md:grid-cols-2'>
        <RecentAppointments />
        <LowStock />
      </div>
    </div>
  )
}

export default page