import type { DataTableColumn } from '../../dashboard/DataTable'
import { StatusBadge } from '../../dashboard/StatusBadge'
import { formatDate, formatPrice } from '../../../lib/format'
import type { VendorOrder } from '../../../types/vendor'

export function getOrderColumns(): DataTableColumn<VendorOrder>[] {
    return [
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
}
