import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'

interface TableActionsProps {
    onEdit?: () => void
    onDelete?: () => void
    editLabel?: string
    deleteLabel?: string
}

export function TableActions({
    onEdit,
    onDelete,
    editLabel = 'تعديل',
    deleteLabel = 'حذف',
}: TableActionsProps) {
    return (
        <div className="flex items-center gap-2">
            {onEdit ? (
                <Button type="button" variant="outline" size="sm" onClick={onEdit}>
                    <Pencil size={14} />
                    {editLabel}
                </Button>
            ) : null}
            {onDelete ? (
                <Button type="button" variant="ghost" size="sm" onClick={onDelete}>
                    <Trash2 size={14} />
                    {deleteLabel}
                </Button>
            ) : null}
        </div>
    )
}
