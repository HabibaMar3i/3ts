import type { ReactNode } from 'react'
import { Info } from 'lucide-react'
import { Alert, AlertDescription } from '../ui/alert'
import { Card, CardContent } from '../ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table'
import { cn } from '#lib/utils'

export interface DataTableColumn<T> {
    key: string
    header: string
    className?: string
    cell: (row: T) => ReactNode
}

interface DataTableProps<T> {
    data: T[]
    columns: DataTableColumn<T>[]
    getRowKey: (row: T) => string | number
    emptyMessage?: string
    minWidth?: string
}

export function DataTable<T>({
    data,
    columns,
    getRowKey,
    emptyMessage = 'لا توجد بيانات.',
    minWidth = '720px',
}: DataTableProps<T>) {
    if (data.length === 0) {
        return (
            <Alert>
                <Info className="size-4" />
                <AlertDescription>{emptyMessage}</AlertDescription>
            </Alert>
        )
    }

    return (
        <Card className="py-0">
            <CardContent className="p-0">
                <Table style={{ minWidth }}>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead
                                    key={column.key}
                                    className={cn('text-right', column.className)}
                                >
                                    {column.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={getRowKey(row)}>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.key}
                                        className={cn('text-right', column.className)}
                                    >
                                        {column.cell(row)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
