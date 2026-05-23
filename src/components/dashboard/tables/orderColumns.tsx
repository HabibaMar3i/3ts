import type { DataTableColumn } from '../DataTable'
import { StatusBadge } from '../StatusBadge'
import { TableActions } from '../TableActions'
import { formatDate, formatPrice } from '../../../lib/format'
import type { VendorOrder } from '../../../types/vendor'

interface OrderColumnHandlers {
    onDelete?: (id: number) => void
}

export function getOrderColumns(handlers?: OrderColumnHandlers): DataTableColumn<VendorOrder>[] {
    const columns: DataTableColumn<VendorOrder>[] = [
        {
            key: 'id',
            header: 'رقم الطلب',
            cell: (row) => <span className="font-medium">#{row.id}</span>,
        },
        {
            key: 'customer',
            header: 'العميل',
            cell: (row) => <span className="text-muted-foreground">{row.customer}</span>,
        },
        {
            key: 'product',
            header: 'المنتج',
            cell: (row) => <span className="text-muted-foreground">{row.product}</span>,
        },
        {
            key: 'amount',
            header: 'المبلغ',
            cell: (row) => <span className="font-semibold text-primary">{formatPrice(row.amount)}</span>,
        },
        {
            key: 'date',
            header: 'التاريخ',
            cell: (row) => <span className="text-muted-foreground">{formatDate(row.date)}</span>,
        },
        {
            key: 'status',
            header: 'الحالة',
            cell: (row) => <StatusBadge status={row.status} />,
        },
    ]

    if (handlers?.onDelete) {
        columns.push({
            key: 'actions',
            header: 'إجراءات',
            cell: (row) => <TableActions onDelete={() => handlers.onDelete!(row.id)} />,
        })
    }

    return columns
}
