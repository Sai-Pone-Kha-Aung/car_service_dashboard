import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../table'

const LowStockData = [
    {
        product: 'Engine Oil',
        stock: 2,
        reorder: 10
    },
    {
        product: 'Brake Pads',
        stock: 3,
        reorder: 12
    },
    {
        product: 'Spark Plugs',
        stock: 5,
        reorder: 20
    },
    {
        product: 'Air Filter',
        stock: 4,
        reorder: 15
    }
]
const LowStock = () => {
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
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {LowStockData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.product}</TableCell>
                                    <TableCell>{item.stock}</TableCell>
                                    <TableCell>{item.reorder}</TableCell>
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