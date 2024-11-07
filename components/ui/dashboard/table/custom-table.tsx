import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '../../button';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../../dropdown-menu';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { Card } from '../../card';

interface IColumn {
    header: string,
    accessor: string
}

interface IContentTable<T> {
    columns: IColumn[];
    data: T[];
}

const ContentTable = <T,>({ columns, data }: IContentTable<T>) => {
    return (
        <>
            <Card className='p-2'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableHead key={index}>{column.header}</TableHead>
                            ))}
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {columns.map((column, colIndex) => (
                                    <TableCell key={colIndex}>{(row as any)[column.accessor]}</TableCell>
                                ))}
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className='h-8 w-8 p-0'>
                                                <span className='sr-only'>Open menu</span>
                                                <MoreHorizontal className='h-4 w-4' />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align='end'>
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>
                                                <Edit className='mr-2 h-4 w-4' /> Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Trash className='mr-2 h-4 w-4' /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </>
    )
}

export default ContentTable