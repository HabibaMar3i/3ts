import { Badge } from '../../ui/badge'
import type { DataTableColumn } from '../DataTable'
import { StatusBadge } from '../StatusBadge'
import { TableActions } from '../TableActions'
import { formatDate } from '../../../lib/format'
import type { AdminUser, UserRole } from '../../../types/admin'

const roleLabels: Record<UserRole, string> = {
    customer: 'عميل',
    admin: 'مدير',
    vendor: 'بائع',
}

interface UserColumnHandlers {
    onEdit?: (user: AdminUser) => void
    onDelete?: (id: number) => void
}

export function getUserColumns(handlers?: UserColumnHandlers): DataTableColumn<AdminUser>[] {
    const columns: DataTableColumn<AdminUser>[] = [
        {
            key: 'name',
            header: 'المستخدم',
            cell: (row) => (
                <div>
                    <p className="font-medium">{row.name}</p>
                    <p className="text-xs text-muted-foreground">{row.email}</p>
                </div>
            ),
        },
        {
            key: 'role',
            header: 'الدور',
            cell: (row) => <Badge variant="outline">{roleLabels[row.role]}</Badge>,
        },
        {
            key: 'joinedAt',
            header: 'تاريخ الانضمام',
            cell: (row) => <span className="text-muted-foreground">{formatDate(row.joinedAt)}</span>,
        },
        {
            key: 'status',
            header: 'الحالة',
            cell: (row) => <StatusBadge status={row.status} />,
        },
    ]

    if (handlers?.onEdit || handlers?.onDelete) {
        columns.push({
            key: 'actions',
            header: 'إجراءات',
            cell: (row) => (
                <TableActions
                    onEdit={handlers.onEdit ? () => handlers.onEdit!(row) : undefined}
                    onDelete={handlers.onDelete ? () => handlers.onDelete!(row.id) : undefined}
                />
            ),
        })
    }

    return columns
}
