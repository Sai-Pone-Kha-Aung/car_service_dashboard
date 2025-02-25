'use client'
import React, { useState, useEffect } from 'react'
import NewAppointmentDialog from '@/components/ui/dashboard/appointment/new-appointment';
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import CustomTable from '@/components/ui/dashboard/table/custom-table';
import { statusOptions } from '@/constants/Data';
import { AddAppointment } from '@/utils/add-form';
import { isToday, isThisWeek, isThisMonth, format } from 'date-fns';
import useSearch from '@/hooks/useSearch';

interface AppointmentData {
    appointment_id: number;
    service_id: number;
    mechanic_id: number;
    appointment_name: string;
    appointment_car: string;
    appointment_date: string;
    appointment_status: string;
    appointment_time: string;
    service_name: string;
    service_price: string;
    mechanic_name: string;
    mechanic_role: string;
    mechanic_email: string;
    user_name: string;
}

const Page = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [filterStatus, setFilterStatus] = useState('All-statuses')
    const [filterDate, setFilterDate] = useState('all-dates')
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 10;
    const [data, setData] = useState<AppointmentData[]>([]);
    const { searchQuery, setSearchQuery, searchResults } = useSearch(data, 'appointment_name');

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

    console.table(data)

    const columns = data.length > 0 ? [
        { header: ' Name', accessor: 'user_name' },
        { header: 'Car', accessor: 'appointment_car' },
        { header: 'Date', accessor: 'appointment_date' },
        { header: 'Time', accessor: 'appointment_time' },
        { header: 'Status', accessor: 'appointment_status' },
        { header: 'Service', accessor: 'service_name' },
        { header: 'Mechanics', accessor: 'mechanic_name' },
        ...Object.keys(data[0])
            .filter(key => key !== 'id' && key !== 'user_id' && key !== 'appointment_id' && key !== 'service_id' && key !== 'mechanic_id' && key !== 'service_price' && key !== 'mechanic_role' && key !== 'mechanic_email' && key !== 'user_name' && key !== 'appointment_car' && key !== 'appointment_date' && key !== 'appointment_status' && key !== 'appointment_time' && key !== 'service_name' && key !== 'mechanic_name' && key !== 'appointment_name')
            .sort()
            .map((key) => ({
                header: key.charAt(0).toUpperCase() + key.slice(1),
                accessor: key
            }))
    ] : [];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

    const handleDialogOpen = () => {
        setIsDialogOpen(true)
    }

    const handleDialogClose = () => {
        setIsDialogOpen(false)
    }

    const handleStatusChange = (value: string) => {
        setFilterStatus(value);
    }

    const handleDateChange = (value: string) => {
        setFilterDate(value);
    }

    useEffect(() => {
        let filteredData = currentItems;

        if (filterStatus !== 'All-statuses') {
            filteredData = filteredData.filter(item => item.appointment_status === filterStatus);
        }

        setCurrentPage(1);
    }, [searchQuery, filterStatus, data]);


    const handleNextPage = () => {
        if (currentPage < Math.ceil(searchResults.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
            console.log(currentPage)
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    return (
        <div className='flex-1 overflow-y-auto bg-gray-100 h-full p-6'>
            <div className='flex justify-between items-center mb-8'>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <AddAppointment />
                    </DialogTrigger>
                    <NewAppointmentDialog onClose={handleDialogClose} />
                </Dialog>
            </div>

            <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center space-x-2'>
                    {/* <Select defaultValue='All-statuses' onValueChange={handleStatusChange}>
                        <SelectTrigger className='w-[180px] bg-white'>
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='All-statuses'>
                                All Statuses
                            </SelectItem>
                            {statusOptions.map((status) => (
                                <SelectItem key={status.id} value={status.value}>
                                    {status.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select> */}
                    {/* <Select defaultValue='all-dates' onValueChange={handleDateChange}>
                        <SelectTrigger className='w-[180px] bg-white'>
                            <SelectValue placeholder="Filter by date" />
                            <SelectContent>
                                <SelectItem value='all-dates'>
                                    All Dates
                                </SelectItem>
                                <SelectItem value='today'>
                                    Today
                                </SelectItem>
                                <SelectItem value='this-week'>
                                    This Week
                                </SelectItem>
                                <SelectItem value='this-month'>
                                    This Month
                                </SelectItem>
                            </SelectContent>
                        </SelectTrigger>
                    </Select> */}
                </div>
                <div className='relative'>
                    <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input placeholder='Search appointments' className='pl-8 w-[300px] bg-white' onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
            </div>
            <CustomTable columns={columns} data={currentItems.map(item => ({
                ...item,
                appointment_date: format(new Date(item.appointment_date), 'dd/MM/yyyy'),
                appointment_status: item.appointment_status.charAt(0).toUpperCase() + item.appointment_status.slice(1),
            }))} />

            <div className='flex justify-between items-center space-x-2 py-4'>
                <div className='flex-1 text-sm text-muted-foreground'>
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, searchResults.length)} of {searchResults.length} appointments
                </div>
                <div className='flex items-center space-x-2'>
                    <Button variant="outline" size="sm" onClick={handlePreviousPage}>
                        <ChevronLeft className='h-4 w-4' />
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleNextPage}>
                        Next
                        <ChevronRight className='h-4 w-4' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Page