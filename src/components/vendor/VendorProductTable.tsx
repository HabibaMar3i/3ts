import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card } from '../ui/card'
import { formatPrice } from '../../data/products'
import type { Product } from '../products/types'

interface VendorProductTableProps {
    products: Product[]
    onEdit: (product: Product) => void
    onDelete: (id: number) => void
}

export function VendorProductTable({ products, onEdit, onDelete }: VendorProductTableProps) {
    if (products.length === 0) {
        return (
            <Card className="border-slate-200 p-8 text-center text-sm text-slate-600">
                لا توجد منتجات بعد. أضف أول منتج من الزر أعلاه.
            </Card>
        )
    }

    return (
        <Card className="overflow-hidden border-slate-200 p-0">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                        <tr>
                            <th className="px-4 py-3 text-right font-semibold">المنتج</th>
                            <th className="px-4 py-3 text-right font-semibold">التصنيف</th>
                            <th className="px-4 py-3 text-right font-semibold">السعر</th>
                            <th className="px-4 py-3 text-right font-semibold">التقييم</th>
                            <th className="px-4 py-3 text-right font-semibold">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-b border-slate-100 last:border-0">
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-12 w-12 rounded-lg border border-slate-200 object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold text-slate-950">{product.name}</p>
                                            {product.badge ? (
                                                <Badge variant="secondary" className="mt-1">
                                                    {product.badge}
                                                </Badge>
                                            ) : null}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-slate-600">{product.category}</td>
                                <td className="px-4 py-4 font-semibold text-red-600">{formatPrice(product.price)}</td>
                                <td className="px-4 py-4 text-slate-600">{product.rating.toFixed(1)}</td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="gap-1.5 rounded-full"
                                            onClick={() => onEdit(product)}
                                        >
                                            <Pencil size={14} />
                                            تعديل
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="gap-1.5 rounded-full text-red-600 hover:bg-red-50 hover:text-red-700"
                                            onClick={() => onDelete(product.id)}
                                        >
                                            <Trash2 size={14} />
                                            حذف
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    )
}
