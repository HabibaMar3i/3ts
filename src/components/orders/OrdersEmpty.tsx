import { Link } from 'react-router-dom'
import { Package } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'

export function OrdersEmpty() {
    const { t } = useTranslation()

    return (
        <Card className="rounded-3xl border border-slate-200 bg-slate-50">
            <CardContent className="flex flex-col items-center px-6 py-16 text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600/10 text-red-600">
                    <Package size={28} />
                </div>
                <h2 className="mt-6 text-xl font-bold text-slate-950">
                    {t('orders.emptyTitle', 'لا توجد طلبات')}
                </h2>
                <p className="mt-2 max-w-md text-sm text-slate-600">
                    {t('orders.empty', 'لا توجد طلبات في هذا القسم')}
                </p>
                <Button asChild className="mt-6 rounded-full">
                    <Link to="/products">{t('orders.browseProducts', 'اكتشف المنتجات')}</Link>
                </Button>
            </CardContent>
        </Card>
    )
}
