import { Card } from '../ui/card'
import type { Product } from './types'

interface ProductGalleryProps {
    product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
    return (
        <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-0">
            <img
                src={product.image}
                alt={product.name}
                className="aspect-square w-full object-cover"
            />
        </Card>
    )
}
