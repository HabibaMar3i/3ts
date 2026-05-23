import { Badge } from '../../ui/badge'
import type { DataTableColumn } from '../../dashboard/DataTable'
import { TableActions } from '../../dashboard/TableActions'
import { formatPrice } from '../../../lib/format'
import type { Product } from '../../products/types'

interface ProductColumnHandlers {
    onEdit: (product: Product) => void
    onDelete: (id: number) => void
}

export function getProductColumns({
    onEdit,
    onDelete,
}: ProductColumnHandlers): DataTableColumn<Product>[] {
    return [
        {
            key: 'product',
            header: 'المنتج',
            cell: (row) => (
                <div className="flex items-center gap-3">
                    <img
                        src={row.image}
                        alt={row.name}
                        className="size-12 rounded-lg border object-cover"
                    />
                    <div>
                        <p className="font-medium">{row.name}</p>
                        {row.badge ? (
                            <Badge variant="secondary" className="mt-1">
                                {row.badge}
                            </Badge>
                        ) : null}
                    </div>
                </div>
            ),
        },
        {
            key: 'category',
            header: 'التصنيف',
            cell: (row) => <span className="text-muted-foreground">{row.category}</span>,
        },
        {
            key: 'price',
            header: 'السعر',
            cell: (row) => <span className="font-semibold text-primary">{formatPrice(row.price)}</span>,
        },
        {
            key: 'rating',
            header: 'التقييم',
            cell: (row) => <span className="text-muted-foreground">{row.rating.toFixed(1)}</span>,
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
