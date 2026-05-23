import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'

export function WishlistEmpty() {
    return (
        <Card className="rounded-3xl border border-slate-200 bg-slate-50">
            <CardContent className="flex flex-col items-center px-6 py-16 text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600/10 text-red-600">
                    <Heart size={28} />
                </div>
                <h2 className="mt-6 text-xl font-bold text-slate-950">قائمة المفضلة فارغة</h2>
                <p className="mt-2 max-w-md text-sm text-slate-600">
                    لم تضف أي منتجات بعد. تصفح المتجر واضغط على أيقونة القلب لحفظ المنتجات هنا.
                </p>
                <Button asChild className="mt-6 rounded-full">
                    <Link to="/products">اكتشف المنتجات</Link>
                </Button>
            </CardContent>
        </Card>
    )
}
