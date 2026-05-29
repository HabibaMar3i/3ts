import { Link } from 'react-router-dom'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { OrdersHeader } from './OrdersHeader'
import { OrdersList } from './OrdersList'
import type { OrderTabItem } from './OrderTabs'
import type { OrderType } from '../../schemas/orders.schema'

interface OrdersPageLayoutProps<T extends string> {
    icon: LucideIcon
    title: string
    description: string
    type: OrderType
    tabs: OrderTabItem<T>[]
    defaultStatus: T
}

export function OrdersPageLayout<T extends string>({
    icon,
    title,
    description,
    type,
    tabs,
    defaultStatus,
}: OrdersPageLayoutProps<T>) {
    const { t } = useTranslation()

    return (
        <div className="min-h-screen bg-white">
            <OrdersHeader icon={icon} title={title} description={description} />

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <OrdersList type={type} tabs={tabs} defaultStatus={defaultStatus} />

                <Link
                    to="/products"
                    className="mt-8 inline-flex items-center gap-2 font-semibold text-red-600 transition-all hover:gap-3"
                >
                    <ArrowRight size={18} className="rtl:rotate-180" />
                    {t('orders.continueShopping', 'تابع التسوق')}
                </Link>
            </div>
        </div>
    )
}
