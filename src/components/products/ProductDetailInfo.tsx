import { Star } from 'lucide-react'
import { Badge } from '../ui/badge'
import { formatPrice } from '../../data/products'
import type { Product } from './types'

interface ProductDetailInfoProps {
    product: Product
}

export function ProductDetailInfo({ product }: ProductDetailInfoProps) {
    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent">{product.category}</Badge>
                {product.badge ? <Badge variant="secondary">{product.badge}</Badge> : null}
            </div>

            <div className="space-y-3">
                <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">{product.name}</h2>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Star size={16} className="text-amber-500" />
                    <span className="font-semibold text-slate-800">{product.rating.toFixed(1)}</span>
                    <span className="text-slate-400">تقييم المنتج</span>
                </div>

                {product.description ? (
                    <p className="text-base leading-7 text-slate-600">{product.description}</p>
                ) : null}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                <p className="text-sm text-slate-500">السعر</p>
                <p className="mt-1 text-3xl font-bold text-red-600">{formatPrice(product.price)}</p>
            </div>
        </div>
    )
}
