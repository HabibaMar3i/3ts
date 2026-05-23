import type { DataTableColumn } from '../../dashboard/DataTable'
import { StatusBadge } from '../../dashboard/StatusBadge'
import { TableActions } from '../../dashboard/TableActions'
import { formatDate, formatNumber, formatPrice } from '../../../lib/format'
import type { VendorAd } from '../../../types/vendor'

interface AdColumnHandlers {
    onEdit: (ad: VendorAd) => void
    onDelete: (id: number) => void
}

export function getAdColumns({ onEdit, onDelete }: AdColumnHandlers): DataTableColumn<VendorAd>[] {
    return [
        {
            key: 'title',
            header: 'الحملة',
            cell: (row) => (
                <div>
                    <p className="font-medium">{row.title}</p>
                    <p className="text-xs text-muted-foreground">{row.placement}</p>
                </div>
            ),
        },
        {
            key: 'budget',
            header: 'الميزانية',
            cell: (row) => <span className="font-semibold text-primary">{formatPrice(row.budget)}</span>,
        },
        {
            key: 'period',
            header: 'الفترة',
            cell: (row) => (
                <span className="text-muted-foreground">
                    {formatDate(row.startDate)} — {formatDate(row.endDate)}
                </span>
            ),
        },
        {
            key: 'impressions',
            header: 'المشاهدات',
            cell: (row) => <span className="text-muted-foreground">{formatNumber(row.impressions)}</span>,
        },
        {
            key: 'status',
            header: 'الحالة',
            cell: (row) => <StatusBadge status={row.status} />,
        },
        {
            key: 'actions',
            header: 'إجراءات',
            cell: (row) => (
                <TableActions onEdit={() => onEdit(row)} onDelete={() => onDelete(row.id)} />
            ),
        },
    ]
}
