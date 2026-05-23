import { Trash2, Plus, Minus } from 'lucide-react'
import { Card } from '../ui/card'
import type { CartItem } from './types'

interface CartItemCardProps {
    item: CartItem
    index: number
}

export function CartItemCard({ item, index }: CartItemCardProps) {
    return (
        <Card
            className="group border-slate-200 bg-white p-6 transition-all duration-300 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/10"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className="flex gap-6">
                <div className="shrink-0">
                    <div className="relative h-24 w-24 overflow-hidden rounded-lg border-2 border-slate-200 bg-slate-100">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                </div>

                <div className="flex-1">
                    <div className="mb-2 flex items-start justify-between">
                        <div>
                            <p className="text-xs font-semibold text-red-600 mb-1">{item.category}</p>
                            <h3 className="text-sm font-bold text-slate-950 group-hover:text-red-600 transition-colors">
                                {item.name}
                            </h3>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                        <div className="inline-flex items-center rounded-lg border-2 border-slate-200 bg-slate-50">
                            <button
                                type="button"
                                className="inline-flex h-8 w-8 items-center justify-center text-slate-600 transition-colors hover:bg-red-600 hover:text-white"
                            >
                                <Minus size={16} />
                            </button>
                            <input
                                type="number"
                                value={item.quantity}
                                readOnly
                                className="h-8 w-10 border-x border-slate-200 bg-white text-center text-sm font-semibold text-slate-900"
                            />
                            <button
                                type="button"
                                className="inline-flex h-8 w-8 items-center justify-center text-slate-600 transition-colors hover:bg-red-600 hover:text-white"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        <button
                            type="button"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                    <p className="text-lg font-bold text-red-600">
                        {(item.price * item.quantity).toLocaleString('ar-EG', {
                            style: 'currency',
                            currency: 'EGP',
                        })}
                    </p>
                    <p className="text-xs text-slate-500">
                        {item.price.toLocaleString('ar-EG', {
                            style: 'currency',
                            currency: 'EGP',
                        })}{' '}
                        للوحدة
                    </p>
                </div>
            </div>
        </Card>
    )
}
