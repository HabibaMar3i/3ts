import type { DataTableColumn } from '../DataTable'
import { StatusBadge } from '../StatusBadge'
import { TableActions } from '../TableActions'
import { formatNumber } from '../../../lib/format'
import type { AdminVendor } from '../../../types/admin'

interface VendorColumnHandlers {
    onEdit: (vendor: AdminVendor) => void
    onDelete: (id: number) => void
}

export function getVendorColumns({
    onEdit,
    onDelete,
}: VendorColumnHandlers): DataTableColumn<AdminVendor>[] {
    return [
        {
            key: 'store',
            header: 'المتجر',
            cell: (row) => (
                <div>
                    <p className="font-medium">{row.storeName}</p>
                    <p className="text-xs text-muted-foreground">{row.owner}</p>
                </div>
            ),
        },
        {
            key: 'email',
            header: 'البريد',
            cell: (row) => <span className="text-muted-foreground">{row.email}</span>,
        },
        {
            key: 'productsCount',
            header: 'المنتجات',
            cell: (row) => <span className="text-muted-foreground">{formatNumber(row.productsCount)}</span>,
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
