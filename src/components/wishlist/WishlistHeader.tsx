import { Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card } from '../ui/card'

interface WishlistHeaderProps {
    itemCount: number
}

export function WishlistHeader({ itemCount }: WishlistHeaderProps) {
    const { t } = useTranslation()

    return (
        <Card className="rounded-none border-b border-slate-100 bg-linear-to-b from-white to-slate-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-600/10">
                        <Heart size={24} className="text-red-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-950">{t('wishlist.title')}</h1>
                </div>
                <p className="text-slate-600">
                    {t('wishlist.itemCount', { count: itemCount })}
                </p>
            </div>
        </Card>
    )
}
