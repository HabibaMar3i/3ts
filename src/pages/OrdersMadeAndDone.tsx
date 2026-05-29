import { PackageCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { OrdersPageLayout } from '../components/orders/OrdersPageLayout'
import type { NormalOrderStatus } from '../schemas/orders.schema'

export default function OrdersMadeAndDone() {
    const { t } = useTranslation()

    const tabs = [
        { value: 'new' as NormalOrderStatus, label: t('orders.normal.tabs.new', 'جديدة') },
        { value: 'current' as NormalOrderStatus, label: t('orders.normal.tabs.current', 'حالية') },
        { value: 'finished' as NormalOrderStatus, label: t('orders.normal.tabs.finished', 'منتهية') },
        { value: 'cancelled' as NormalOrderStatus, label: t('orders.normal.tabs.cancelled', 'ملغية') },
    ]

    return (
        <OrdersPageLayout
            icon={PackageCheck}
            title={t('orders.madeAndDone.title', 'الطلبات المنجزة')}
            description={t('orders.madeAndDone.desc', 'تابع طلباتك الجديدة والحالية والمنتهية والملغية')}
            type="normal"
            tabs={tabs}
            defaultStatus="new"
        />
    )
}
