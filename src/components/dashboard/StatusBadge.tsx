import { Badge } from '../ui/badge'
import type { AdStatus, OrderStatus, PaymentStatus } from '../../types/vendor'

type Status = PaymentStatus | AdStatus | OrderStatus

const statusLabels: Record<Status, string> = {
    paid: 'مدفوع',
    pending: 'قيد الانتظار',
    failed: 'فشل',
    active: 'نشط',
    paused: 'متوقف',
    shipped: 'تم الشحن',
    delivered: 'تم التسليم',
    cancelled: 'ملغي',
}

const statusVariants: Record<
    Status,
    'success' | 'warning' | 'destructive' | 'secondary' | 'default' | 'outline'
> = {
    paid: 'success',
    pending: 'warning',
    failed: 'destructive',
    active: 'success',
    paused: 'secondary',
    shipped: 'default',
    delivered: 'success',
    cancelled: 'destructive',
}

interface StatusBadgeProps {
    status: Status
}

export function StatusBadge({ status }: StatusBadgeProps) {
    return <Badge variant={statusVariants[status]}>{statusLabels[status]}</Badge>
}
