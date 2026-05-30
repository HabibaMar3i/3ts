
import type { Product } from './types'

interface RelatedProductsProps {
    products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
    if (products.length === 0) return null

    return (
        <section className="space-y-6 border-t border-slate-100 pt-12">
            <div>
                <h2 className="text-xl font-bold text-slate-950">منتجات مشابهة</h2>
                <p className="mt-1 text-sm text-slate-600">قد يعجبك أيضاً</p>
            </div>
        </section>
    )
}
