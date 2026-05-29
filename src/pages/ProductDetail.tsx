import { Link, useParams } from 'react-router-dom'
import { ProductActions } from '../components/products/ProductActions'
import { ProductDetailHeader } from '../components/products/ProductDetailHeader'
import { ProductDetailInfo } from '../components/products/ProductDetailInfo'
import { ProductGallery } from '../components/products/ProductGallery'
import { RelatedProducts } from '../components/products/RelatedProducts'
import { Button } from '../components/ui/button'
import { getProductById, getRelatedProducts } from '../data/products'

export default function ProductDetail() {
    const { id } = useParams()
    const productId = Number(id)
    const product = Number.isNaN(productId) ? undefined : getProductById(productId)

    if (!product) {
        return (
            <div className="min-h-screen bg-white">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center">
                    <h1 className="text-2xl font-bold text-slate-950">المنتج غير موجود</h1>
                    <p className="mt-2 text-slate-600">تأكد من الرابط أو عد إلى قائمة المنتجات.</p>
                    <Button asChild className="mt-6 rounded-full">
                        <Link to="/products">عرض المنتجات</Link>
                    </Button>
                </div>
            </div>
        )
    }

    const relatedProducts = getRelatedProducts(product)

    return (
        <div className="min-h-screen bg-white">
            <ProductDetailHeader product={product} />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
                    <ProductGallery product={product} />
                    <div className="space-y-8">
                        <ProductDetailInfo product={product} />
                        <ProductActions />
                    </div>
                </div>

                <RelatedProducts products={relatedProducts} />
            </div>
        </div>
    )
}
