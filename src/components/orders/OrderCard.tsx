import { useTranslation } from 'react-i18next'
import { cn } from '#lib/utils'
import { Card } from '../ui/card'
import type { Order } from '../../api/orders.api'
import type { NormalOrderStatus, RefundOrderStatus, OrderType } from '../../schemas/orders.schema'
import {
    normalStatusConfig,
    refundStatusConfig,
    statusToneClasses,
} from './orderStatusConfig'

interface OrderCardProps {
    order: Order
    type: OrderType
    index: number
}

export function OrderCard({ order, type, index }: OrderCardProps) {
    const { t } = useTranslation()

    const config =
        type === 'normal'
            ? normalStatusConfig[order.status as NormalOrderStatus]
            : refundStatusConfig[order.status as RefundOrderStatus]

    const tone = statusToneClasses[config.tone]

    return (
        <Card
            className="group border-slate-200 bg-white p-6 transition-all duration-300 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/10"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 text-start">
                    <h3 className="text-sm font-bold text-slate-950 transition-colors group-hover:text-red-600">
                        {t('orders.card.summary', 'ملخص الطلب')}
                    </h3>
                    <p className="text-xs font-semibold text-red-600">
                        {t('orders.card.orderNumber', 'رقم الطلب')}
                    </p>
                    <p className="text-sm text-slate-600">{order.orderNumber}</p>
                    <p className="text-xs font-semibold text-slate-500">
                        {t('orders.card.orderDate', 'تاريخ الطلب')}
                    </p>
                    <p className="text-sm text-slate-600">{order.orderDate}</p>
                </div>

                <div className="space-y-1 text-end">
                    <p className={cn('flex items-center justify-end gap-2 text-sm font-semibold rtl:flex-row-reverse', tone.text)}>
                        <span className={cn('h-2 w-2 rounded-full', tone.dot)} />
                        {t(config.labelKey)}
                    </p>
                    <p className="text-xs text-slate-400">{order.relativeTime}</p>
                </div>
            </div>
        </Card>
    )
}
