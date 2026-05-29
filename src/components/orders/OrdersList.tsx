import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '../ui/card'
import { useOrders } from '../../hooks/useOrders'
import type { NormalOrderStatus, RefundOrderStatus, OrderType } from '../../schemas/orders.schema'
import { OrderTabs, type OrderTabItem } from './OrderTabs'
import { OrderCard } from './OrderCard'
import { OrdersEmpty } from './OrdersEmpty'

interface OrdersListProps<T extends string> {
    type: OrderType
    tabs: OrderTabItem<T>[]
    defaultStatus: T
}

export function OrdersList<T extends string>({ type, tabs, defaultStatus }: OrdersListProps<T>) {
    const { t } = useTranslation()
    const [activeTab, setActiveTab] = useState<T>(defaultStatus)

    const { orders, isPending, serverError } = useOrders({
        type,
        status: activeTab as NormalOrderStatus | RefundOrderStatus,
    })

    return (
        <>
            <OrderTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {serverError && (
                <Card className="mb-6 border-red-200 bg-red-50">
                    <CardContent className="p-4 text-sm text-red-700">{serverError}</CardContent>
                </Card>
            )}

            {isPending ? (
                <Card className="rounded-3xl border border-slate-200 bg-slate-50">
                    <CardContent className="px-6 py-16 text-center text-sm text-slate-600">
                        {t('orders.loading', 'جاري تحميل الطلبات...')}
                    </CardContent>
                </Card>
            ) : orders.length === 0 ? (
                <OrdersEmpty />
            ) : (
                <div className="space-y-4">
                    {orders.map((order, index) => (
                        <OrderCard key={order.id} order={order} type={type} index={index} />
                    ))}
                </div>
            )}
        </>
    )
}
