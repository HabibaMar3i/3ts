import type { DataTableColumn } from '../DataTable'
import { StatusBadge } from '../StatusBadge'
import { TableActions } from '../TableActions'
import { formatDate } from '../../../lib/format'
import type { AdminBlog } from '../../../types/admin'

interface BlogColumnHandlers {
    onEdit: (blog: AdminBlog) => void
    onDelete: (id: number) => void
}

export function getBlogColumns({ onEdit, onDelete }: BlogColumnHandlers): DataTableColumn<AdminBlog>[] {
    return [
        {
            key: 'title',
            header: 'المقال',
            cell: (row) => (
                <div>
                    <p className="font-medium">{row.title}</p>
                    <p className="text-xs text-muted-foreground">{row.author}</p>
                </div>
            ),
        },
        {
            key: 'category',
            header: 'التصنيف',
            cell: (row) => <span className="text-muted-foreground">{row.category}</span>,
        },
        {
            key: 'publishedAt',
            header: 'تاريخ النشر',
            cell: (row) => <span className="text-muted-foreground">{formatDate(row.publishedAt)}</span>,
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
