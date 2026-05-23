import { ShoppingCart, Star } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import type { Product } from './types'

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
            <div className="overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <CardContent className="space-y-4 p-5">
                <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="accent">{product.category}</Badge>
                    {product.badge ? <Badge variant="secondary">{product.badge}</Badge> : null}
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-950">{product.name}</h3>
                    {product.description ? (
                        <p className="text-sm leading-6 text-slate-500">{product.description}</p>
                    ) : null}
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Star size={14} className="text-amber-500" />
                        <span>{product.rating.toFixed(1)}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                    <div>
                        <p className="text-sm text-slate-500">السعر</p>
                        <p className="text-xl font-bold text-red-600">
                            {product.price.toLocaleString('ar-EG', {
                                style: 'currency',
                                currency: 'EGP',
                            })}
                        </p>
                    </div>
                    <Button type="button" variant="default" className="rounded-full px-4 py-2 text-sm font-semibold gap-2">
                        <ShoppingCart size={18} />
                        أضف للسلة
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
