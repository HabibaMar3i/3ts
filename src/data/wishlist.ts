import type { WishlistItem } from '../components/wishlist/types'
import { products } from './products'

export const wishlistItems: WishlistItem[] = products
    .filter((product) => [1, 3, 5].includes(product.id))
    .map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        rating: product.rating,
    }))
