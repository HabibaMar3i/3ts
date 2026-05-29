import { RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { OrdersPageLayout } from '../components/orders/OrdersPageLayout'
import type { RefundOrderStatus } from '../schemas/orders.schema'

export default function OrdersRefund() {
    const { t } = useTranslation()

    const tabs = [
        { value: 'review' as RefundOrderStatus, label: t('orders.refund.tabs.review', 'المراجعة') },
        { value: 'acceptance' as RefundOrderStatus, label: t('orders.refund.tabs.acceptance', 'القبول') },
        { value: 'received' as RefundOrderStatus, label: t('orders.refund.tabs.received', 'المستلمة') },
        { value: 'rejection' as RefundOrderStatus, label: t('orders.refund.tabs.rejection', 'الرفض') },
    ]

    return (
        <OrdersPageLayout
            icon={RotateCcw}
            title={t('orders.refund.title', 'طلبات الاسترجاع')}
            description={t('orders.refund.desc', 'تابع حالة طلبات الاسترجاع من المراجعة حتى القبول أو الرفض')}
            type="refund"
            tabs={tabs}
            defaultStatus="review"
        />
    )
}
