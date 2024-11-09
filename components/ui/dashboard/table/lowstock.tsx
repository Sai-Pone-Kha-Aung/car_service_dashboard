import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../table'
import { stockData } from '@/constants/Data'

const LowStock = () => {
    const lowStockItems = stockData
        .filter(item => item.quantity <= item.reorder)
        .slice(0, 4);

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Low Stock Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Reorder Level</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {lowStockItems.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.reorder}</TableCell>
                                    <TableCell>{item.quantity < 5 ? (
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Low Stock</span>
                                    ) : (
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">In Stock</span>
                                    )}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default LowStock