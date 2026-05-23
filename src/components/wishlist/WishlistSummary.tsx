import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { Button } from '../ui/button'
import { formatPrice } from '../../data/products'

interface WishlistSummaryProps {
    itemCount: number
    totalValue: number
}

export function WishlistSummary({ itemCount, totalValue }: WishlistSummaryProps) {
    return (
        <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border-2 border-slate-200 bg-linear-to-b from-slate-50 to-white p-6">
                <h2 className="mb-6 text-lg font-bold text-slate-950">ملخص المفضلة</h2>

                <div className="space-y-4 border-b-2 border-slate-200 pb-6">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-600">عدد المنتجات</p>
                        <p className="text-sm font-semibold text-slate-950">{itemCount}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-600">إجمالي القيمة</p>
                        <p className="text-sm font-semibold text-slate-950">{formatPrice(totalValue)}</p>
                    </div>
                </div>

                <div className="pt-6">
                    <Button className="w-full gap-2 rounded-lg bg-linear-to-r from-red-600 to-red-700 px-6 py-3 font-semibold text-white shadow-lg shadow-red-600/30 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-red-600/50">
                        <ShoppingCart size={18} />
                        أضف الكل للسلة
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        className="mt-3 w-full rounded-lg border-2 px-6 py-3 font-semibold"
                    >
                        <Link to="/products">تصفح المنتجات</Link>
                    </Button>
                </div>

                <div className="mt-6 space-y-2 border-t-2 border-slate-200 pt-6 text-xs text-slate-600">
                    <p>احفظ منتجاتك المفضلة لتعود إليها لاحقاً.</p>
                    <p>يمكنك نقل أي منتج إلى السلة بنقرة واحدة.</p>
                </div>
            </div>
        </div>
    )
}
