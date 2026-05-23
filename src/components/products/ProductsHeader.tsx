import { ShoppingBag } from 'lucide-react'
import { Card, CardContent } from '../ui/card'

interface ProductsHeaderProps {
    itemCount: number
}

export function ProductsHeader({ itemCount }: ProductsHeaderProps) {
    return (
        <Card className="rounded-none border-b border-slate-100 bg-linear-to-b from-white to-slate-50">
            <CardContent className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid gap-6 md:grid-cols-[1fr_auto] items-center">
                    <div>
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600/10 text-red-600">
                            <ShoppingBag size={24} />
                        </div>
                        <h1 className="mt-4 text-3xl font-bold text-slate-950">اكتشف منتجاتنا</h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-600">
                            اختر من بين أحدث الألعاب والاكسسوارات المصممة لتناسب كل الفئات.
                        </p>
                    </div>
                    <div className="rounded-4xl border border-slate-200 bg-white px-6 py-5 text-center shadow-sm shadow-slate-200/50">
                        <p className="text-sm text-slate-500">عدد المنتجات</p>
                        <p className="mt-1 text-3xl font-bold text-red-600">{itemCount}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
