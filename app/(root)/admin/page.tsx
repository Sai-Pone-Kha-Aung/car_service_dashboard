'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CustomTable from '@/components/ui/dashboard/table/custom-table';
import LowStock from '@/components/ui/dashboard/table/lowstock';
import RecentAppointments from '@/components/ui/dashboard/table/recent-appointments';
import { Calendar, DollarSign, Package, Truck } from 'lucide-react'
import React, { useState, useEffect } from 'react'

interface AppointmentData {
  appointment_id: number;
  service_id: number;
  mechanic_id: number;
  appointment_name: string;
  appointment_car: string;
  appointment_date: string;
  appointment_status: string;
  service_name: string;
  service_price: string;
  mechanic_name: string;
  mechanic_role: string;
  mechanic_email: string;
  user_name: string;
}

const calculateAppointmentsData = () => {
  const currentMonth = new Date().getMonth() + 1;
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear === 1 ? currentYear - 1 : currentYear;
  const [data, setData] = useState<AppointmentData[]>([]);
  const fetchData = async () => {
    try {
      const res = await fetch('/api/appointmentServices');
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      const response = await res.json();
      setData(response);
    } catch (error) {
      console.error("Failed to fetch");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  const currentMonthAppointments = data.filter(
    (appointment) => {
      const appointmentDate = new Date(appointment.appointment_date);
      return appointmentDate.getMonth() + 1 === currentMonth && appointmentDate.getFullYear() === currentYear;
    }
  ).length;

  const previousMonthAppointments = data.filter(
    (appointment) => {
      const appointmentDate = new Date(appointment.appointment_date);
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
  const [product, setProduct] = useState<Product[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/product');
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      const response = await res.json();
      setProduct(response);
    } catch (error) {
      console.error("Failed to fetch");
    }
  }

  useEffect(() => {
    fetchData();
  }, [])
  const lowStockItems = product.filter(item => item.quantity <= item.reorder).length;
  return {
    value: `${lowStockItems}`,
    description: 'Reorder needed',
  }
}

const calculateInProgressAppointments = () => {
  const [data, setData] = useState<AppointmentData[]>([]);
  const fetchData = async () => {
    try {
      const res = await fetch('/api/appointmentServices');
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      const response = await res.json();
      setData(response);
    } catch (error) {
      console.error("Failed to fetch");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const inProgressAppointments = data.filter(appointment => appointment.appointment_status === 'In Service' && new Date(appointment.appointment_date).toDateString() === new Date().toDateString()).length;
  return {
    value: inProgressAppointments,
    description: `${inProgressAppointments} cars in service`,
  }
}

const calculateTotalRevenue = () => {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [product, setProduct] = useState<Product[]>([]);
  const [servicesData, setServicesData] = useState<any[]>([]);
  const fetchData = async () => {
    try {
      const res = await fetch('/api/appointmentServices');
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      const response = await res.json();
      setAppointments(response);
    } catch (error) {
      console.error("Failed to fetch");
    }
  }

  const fetchProductData = async () => {
    try {
      const res = await fetch('/api/product');
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      const response = await res.json();
      setProduct(response);
    } catch (error) {
      console.error("Failed to fetch");
    }
  }

  const fetchServicesData = async () => {
    try {
      const res = await fetch('/api/service');
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      const response = await res.json();
      setServicesData(response);
    } catch (error) {
      console.error("Failed to fetch");
    }
  }

  useEffect(() => {
    fetchData();
    fetchProductData();
    fetchServicesData();
  }, []);

  let totalRevenue = 0;
  appointments.forEach(appointment => {
    if (appointment.appointment_status !== 'Completed') return;
    const service = servicesData.find(service => service.id === appointment.service_id);
    const stock = product.find(stock => stock.serviceId === service?.id);
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

  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const fetchData = async () => {
    try {
      const res = await fetch('/api/appointmentServices');
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      const response = await res.json();
      setAppointments(response);
    } catch (error) {
      console.error("Failed to fetch");
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const status = 'Walk-In';
  const data = appointments.filter(appointment => appointment.appointment_status === status);
  const columns = [
    {
      header: 'Name',
      accessor: 'user_name'
    },
    {
      header: 'Car',
      accessor: 'appointment_car'
    },
    {
      header: 'Service',
      accessor: 'service_name'
    },
    {
      header: 'Date',
      accessor: 'appointment_date'
    },
    {
      header: 'Status',
      accessor: 'appointment_status'
    },
  ];

  const cardData = [
    {
      title: 'Total Appointments',
      icon: <Calendar className='h-4 w-4 text-muted-foreground' />,
      value: appointmentsData.value,
      description: appointmentsData.description,
    },
    {
      title: 'Cars in Service',
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
      <div className='mt-6'>
        {data.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">No Walk-In Customers</p>
            </CardContent>
          </Card>
        ) : (
          <CustomTable columns={columns} data={data.map(item => ({
            ...item,
            name: item.user_name,
            car: item.appointment_car,
            date: item.appointment_date,
            status: item.appointment_status.charAt(0).toUpperCase() + item.appointment_status.slice(1),
            service: item.service_name,
            mechanics: item.mechanic_name
          }))} />
        )}
      </div>
    </div>
  )
}

export default page

//NAME CAR SERVICE DATE STATUS