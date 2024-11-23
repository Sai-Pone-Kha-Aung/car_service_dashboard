'use client'
import React, { useState, useEffect } from 'react'
import NewAppointmentDialog from '@/components/ui/dashboard/appointment/new-appointment';
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import CustomTable from '@/components/ui/dashboard/table/custom-table';
import { appointments, statusOptions } from '@/constants/Data';
import { AddAppointment } from '@/utils/add-form';
import { isToday, isThisWeek, isThisMonth } from 'date-fns';
import useSearch from '@/hooks/useSearch';

const Page = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [filterStatus, setFilterStatus] = useState('All-statuses')
    const [filterDate, setFilterDate] = useState('all-dates')
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 10;
    const data = appointments
    const { searchQuery, setSearchQuery, searchResults } = useSearch(data, 'name');

    const columns = Object.keys(appointments[0])
        .filter(key => key !== 'id')
        .map((key) => ({
            header: key.charAt(0).toUpperCase() + key.slice(1),
            accessor: key
        }));

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
        let filteredData = data;

        if (filterStatus !== 'All-statuses') {
            filteredData = filteredData.filter(item => item.status.toLowerCase() === filterStatus.toLowerCase());
        }

        if (filterDate) {
            filteredData = filteredData.filter(item => {
                const appointmentDate = new Date(item.date);
                switch (filterDate) {
                    case 'all-dates':
                        return true;
                    case 'today':
                        return isToday(appointmentDate);
                    case 'this-week':
                        return isThisWeek(appointmentDate);
                    case 'this-month':
                        return isThisMonth(appointmentDate);
                    default:
                        return true;
                }
            });
        }

        setCurrentPage(1);
    }, [searchQuery, filterStatus, filterDate, data]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

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
                    <Select defaultValue='All-statuses' onValueChange={handleStatusChange}>
                        <SelectTrigger className='w-[180px] bg-white'>
                            <SelectValue placeholder="Filter by status" />
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
                        </SelectTrigger>
                    </Select>
                    <Select defaultValue='all-dates' onValueChange={handleDateChange}>
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
                    </Select>
                </div>
                <div className='relative'>
                    <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input placeholder='Search appointments' className='pl-8 w-[300px] bg-white' onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
            </div>
            <CustomTable columns={columns} data={currentItems} />

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