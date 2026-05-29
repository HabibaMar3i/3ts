import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { WishlistEmpty } from '../components/wishlist/WishlistEmpty'
import { WishlistHeader } from '../components/wishlist/WishlistHeader'
import { WishlistItemCard } from '../components/wishlist/WishlistItemCard'
import { WishlistSummary } from '../components/wishlist/WishlistSummary'
import { wishlistItems } from '../data/wishlist'

export default function Wishlist() {
    const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0)
    const isEmpty = wishlistItems.length === 0

    return (
        <div className="min-h-screen bg-white">
            <WishlistHeader itemCount={wishlistItems.length} />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                {isEmpty ? (
                    <WishlistEmpty />
                ) : (
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <div className="space-y-4">
                                {wishlistItems.map((item, index) => (
                                    <WishlistItemCard item={item} index={index} key={item.id} />
                                ))}
                            </div>

                            <Link
                                to="/products"
                                className="mt-8 inline-flex items-center gap-2 font-semibold text-red-600 transition-all hover:gap-3"
                            >
                                <ArrowRight size={18} className="rtl:rotate-180" />
                                تابع التسوق
                            </Link>
                        </div>

                        <WishlistSummary itemCount={wishlistItems.length} totalValue={totalValue} />
                    </div>
                )}
            </div>
        </div>
    )
}
