import { Link } from 'react-router-dom'
import { ShoppingCart, Star, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { formatPrice } from '../../data/products'
import type { WishlistItem } from './types'

interface WishlistItemCardProps {
    item: WishlistItem
    index: number
}

export function WishlistItemCard({ item, index }: WishlistItemCardProps) {
    return (
        <Card
            className="group border-slate-200 bg-white p-6 transition-all duration-300 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/10"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className="flex gap-6">
                <Link to={`/product/${item.id}`} className="shrink-0">
                    <div className="relative h-24 w-24 overflow-hidden rounded-lg border-2 border-slate-200 bg-slate-100">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                </Link>

                <div className="flex flex-1 flex-col justify-between">
                    <div>
                        <p className="mb-1 text-xs font-semibold text-red-600">{item.category}</p>
                        <Link to={`/product/${item.id}`}>
                            <h3 className="text-sm font-bold text-slate-950 transition-colors group-hover:text-red-600">
                                {item.name}
                            </h3>
                        </Link>
                        <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                            <Star size={14} className="text-amber-500" />
                            <span>{item.rating.toFixed(1)}</span>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <Button type="button" size="sm" className="rounded-full gap-2 text-xs font-semibold">
                            <ShoppingCart size={16} />
                            أضف للسلة
                        </Button>
                        <button
                            type="button"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
                            aria-label="إزالة من المفضلة"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-end justify-center">
                    <p className="text-lg font-bold text-red-600">{formatPrice(item.price)}</p>
                </div>
            </div>
        </Card>
    )
}
