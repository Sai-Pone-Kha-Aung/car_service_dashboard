import NewAppointmentDialog from '@/components/ui/dashboard/appointment/new-appointment';
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react'
import React from 'react'
import ContentTable from '@/components/ui/dashboard/table/custom-table';
import { appointments } from '@/constants/Data';

const page = () => {
    const columns = Object.keys(appointments[0])
        .filter(key => key !== 'id')
        .map((key) => ({
            header: key.charAt(0).toUpperCase() + key.slice(1),
            accessor: key
        }))
    const data = appointments

    return (
        <div className='flex-1 overflow-y-auto bg-gray-100 h-full p-6'>
            <div className='flex justify-between items-center mb-8'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className='font-semibold'>
                            <Plus className='mr-2 h-4 w-4' />
                            New Appointment
                        </Button>
                    </DialogTrigger>
                    <NewAppointmentDialog />
                </Dialog>
            </div>

            <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center space-x-2'>
                    <Select defaultValue='all' >
                        <SelectTrigger className='w-[180px] bg-white'>
                            <SelectValue placeholder="Filter by status" />
                            <SelectContent>
                                <SelectItem value='all'>
                                    All Statuses
                                </SelectItem>
                                <SelectItem value='scheduled'>
                                    Scheduled
                                </SelectItem>
                                <SelectItem value='in-progress'>

                                    In Progress
                                </SelectItem>
                                <SelectItem value='completed'>

                                    Completed
                                </SelectItem>
                                <SelectItem value='cancelled'>
                                    Cancelled
                                </SelectItem>
                            </SelectContent>
                        </SelectTrigger>
                    </Select>
                    <Select defaultValue='today'>
                        <SelectTrigger className='w-[180px] bg-white'>
                            <SelectValue placeholder="Filter by date" />
                            <SelectContent>
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
                    <Input placeholder='Search appointments' className='pl-8 w-[300px] bg-white' />
                </div>
            </div>
            <ContentTable columns={columns} data={data} />

            <div className='flex justify-between items-center space-x-2 py-4'>
                <div className='flex-1 text-sm text-muted-foreground'>
                    Showing 10 of 50 appointments
                </div>
                <div className='flex items-center space-x-2'>
                    <Button variant="outline" size="sm">
                        <ChevronLeft className='h-4 w-4' />
                        Previous
                    </Button>
                    <Button variant="outline" size="sm">
                        Next
                        <ChevronRight className='h-4 w-4' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default page