import { Badge } from '../ui/badge'
import type { AdStatus, OrderStatus, PaymentStatus } from '../../types/vendor'
import type { BlogStatus, FeedbackStatus, UserStatus, VendorAccountStatus } from '../../types/admin'

type Status =
    | PaymentStatus
    | AdStatus
    | OrderStatus
    | UserStatus
    | VendorAccountStatus
    | BlogStatus
    | FeedbackStatus

const statusLabels: Record<Status, string> = {
    paid: 'مدفوع',
    pending: 'قيد الانتظار',
    failed: 'فشل',
    active: 'نشط',
    paused: 'متوقف',
    shipped: 'تم الشحن',
    delivered: 'تم التسليم',
    cancelled: 'ملغي',
    blocked: 'محظور',
    suspended: 'موقوف',
    draft: 'مسودة',
    published: 'منشور',
    new: 'جديد',
    reviewed: 'تمت المراجعة',
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
    blocked: 'destructive',
    suspended: 'warning',
    draft: 'secondary',
    published: 'success',
    new: 'warning',
    reviewed: 'success',
}

interface StatusBadgeProps {
    status: Status
}

export function StatusBadge({ status }: StatusBadgeProps) {
    return <Badge variant={statusVariants[status]}>{statusLabels[status]}</Badge>
}
