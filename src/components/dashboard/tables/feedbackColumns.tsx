import { Star } from 'lucide-react'
import type { DataTableColumn } from '../DataTable'
import { StatusBadge } from '../StatusBadge'
import { TableActions } from '../TableActions'
import { formatDate } from '../../../lib/format'
import type { AdminFeedback } from '../../../types/admin'

interface FeedbackColumnHandlers {
    onDelete: (id: number) => void
}

export function getFeedbackColumns({
    onDelete,
}: FeedbackColumnHandlers): DataTableColumn<AdminFeedback>[] {
    return [
        {
            key: 'user',
            header: 'المستخدم',
            cell: (row) => <span className="font-medium">{row.user}</span>,
        },
        {
            key: 'rating',
            header: 'التقييم',
            cell: (row) => (
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Star size={14} className="text-amber-500" />
                    {row.rating.toFixed(1)}
                </span>
            ),
        },
        {
            key: 'comment',
            header: 'التعليق',
            cell: (row) => <span className="text-muted-foreground">{row.comment}</span>,
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
        {
            key: 'actions',
            header: 'إجراءات',
            cell: (row) => <TableActions onDelete={() => onDelete(row.id)} />,
        },
    ]
}
