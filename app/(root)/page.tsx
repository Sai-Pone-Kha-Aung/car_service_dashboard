import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import LowStock from '@/components/ui/dashboard/table/lowstock';
import RecentAppointments from '@/components/ui/dashboard/table/recent-appointments';
import { appointments, servicesData, stockData } from '@/constants/Data';
import { Calendar, DollarSign, Package, Truck } from 'lucide-react'
import React from 'react'
import { Button } from 'react-day-picker';

const calculateAppointmentsData = () => {
  const currentMonth = new Date().getMonth() + 1;
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear === 1 ? currentYear - 1 : currentYear;

  const currentMonthAppointments = appointments.filter(
    (appointment) => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate.getMonth() + 1 === currentMonth && appointmentDate.getFullYear() === currentYear;
    }
  ).length;

  const previousMonthAppointments = appointments.filter(
    (appointment) => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate.getMonth() + 1 === previousMonth && appointmentDate.getFullYear() === previousYear;
    }
  ).length;

  const percentageChange = previousMonthAppointments === 0 ? 100 : ((currentMonthAppointments - previousMonthAppointments) / previousMonthAppointments) * 100;

  return {
    value: currentMonthAppointments,
    description: `${percentageChange > 0 ? '+' : ''}${percentageChange.toFixed(2)}%  from last month`,
  }
}

const calculateLowStockData = () => {
  const lowStockItems = stockData.filter(item => item.quantity <= item.reorder).length;
  return {
    value: `${lowStockItems}`,
    description: 'Reorder needed',
  }
}

const calculateInProgressAppointments = () => {
  const inProgressAppointments = appointments.filter(appointment => appointment.status === 'In Progress' && new Date(appointment.date).toDateString() === new Date().toDateString()).length;
  return {
    value: inProgressAppointments,
    description: `${inProgressAppointments} vehicles in service`,
  }
}

const calculateTotalRevenue = () => {
  let totalRevenue = 0;
  appointments.forEach(appointment => {
    if (appointment.status !== 'Completed') return;
    const service = servicesData.find(service => service.name === appointment.service);
    const stock = stockData.find(stock => stock.serviceId === service?.id);
    if (service && stock) {
      totalRevenue += service.price + stock.price;
    }

    if (service && !stock) {
      totalRevenue += service.price;
    }
  });

  return {
    value: `$${totalRevenue}`,
    description: 'Total revenue from services and products',
  }
}

const page = () => {
  const appointmentsData = calculateAppointmentsData();
  const lowStockData = calculateLowStockData();
  const inProgressAppointments = calculateInProgressAppointments();
  const totalRevenue = calculateTotalRevenue();

  const cardData = [
    {
      title: 'Total Appointments',
      icon: <Calendar className='h-4 w-4 text-muted-foreground' />,
      value: appointmentsData.value,
      description: appointmentsData.description,
    },
    {
      title: 'Vehicles in Service',
      icon: <Truck className='h-4 w-4 text-muted-foreground' />,
      value: inProgressAppointments.value,
      description: inProgressAppointments.description,
    },
    {
      title: 'Total Revenue',
      icon: <DollarSign className='h-4 w-4 text-muted-foreground' />,
      value: totalRevenue.value,
      description: totalRevenue.description,
    },
    {
      title: 'Low Stock Items',
      icon: <Package className='h-6 w-6 text-muted-foreground' />,
      value: lowStockData.value,
      description: lowStockData.description,
    },
  ];
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