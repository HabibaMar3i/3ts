import type { DataTableColumn } from '../DataTable'
import { StatusBadge } from '../StatusBadge'
import { formatDate, formatPrice } from '../../../lib/format'
import type { VendorPayment } from '../../../types/vendor'

export function getPaymentColumns(): DataTableColumn<VendorPayment>[] {
    return [
        {
            key: 'reference',
            header: 'المرجع',
            cell: (row) => (
                <div>
                    <p className="font-medium">{row.reference}</p>
                    <p className="text-xs text-muted-foreground">{row.description}</p>
                </div>
            ),
        },
        {
            key: 'amount',
            header: 'المبلغ',
            cell: (row) => <span className="font-semibold text-primary">{formatPrice(row.amount)}</span>,
        },
        {
            key: 'method',
            header: 'طريقة الدفع',
            cell: (row) => <span className="text-muted-foreground">{row.method}</span>,
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
