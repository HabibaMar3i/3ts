import { useTranslation } from 'react-i18next'
import { Card } from '../ui/card'
import { CartItemCard } from '../cart/CartItemCard'
import type { CartItem } from '../cart/types'

interface CheckoutItemsListProps {
    items: CartItem[]
}

export function CheckoutItemsList({ items }: CheckoutItemsListProps) {
    const { t } = useTranslation()
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-950">
                {t('checkout.products', { count: itemCount })}
            </h2>

            <Card className="border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-sm font-semibold text-slate-700">{t('checkout.storeName')}</p>
            </Card>

            <div className="space-y-4">
                {items.map((item, index) => (
                    <CartItemCard key={item.id} item={item} index={index} />
                ))}
            </div>
        </section>
    )
}
