import { Link } from 'react-router-dom'
import { ArrowRight, Package } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import type { Product } from './types'

interface ProductDetailHeaderProps {
    product: Product
}

export function ProductDetailHeader({ product }: ProductDetailHeaderProps) {
    return (
        <Card className="rounded-none border-b border-slate-100 bg-linear-to-b from-white to-slate-50">
            <CardContent className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <Link
                    to="/products"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-red-600 transition-all hover:gap-3"
                >
                    <ArrowRight size={16} className="rtl:rotate-180" />
                    العودة للمنتجات
                </Link>

                <div className="flex items-start gap-3">
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600/10">
                        <Package size={22} className="text-red-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">{product.name}</h1>
                        <p className="mt-1 text-sm text-slate-600">{product.category}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
