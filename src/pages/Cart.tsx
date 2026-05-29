import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CartHeader } from '../components/cart/CartHeader'
import { CartItemCard } from '../components/cart/CartItemCard'
import { CartSummary } from '../components/cart/CartSummary'
import { PromoCodeSection } from '../components/cart/PromoCodeSection'
import type { CartItem } from '../components/cart/types'

export default function Cart() {
    // Sample cart items
    const cartItems: CartItem[] = [
        {
            id: 1,
            name: 'سيارة ديناصور ذكية',
            price: 299.99,
            quantity: 2,
            image: 'https://hedeya.com/cdn/shop/files/51ipoogjgpl-photoroom_1.jpg?v=1764661945&width=360?w=400&h=400&fit=crop',
            category: 'سيارات',
        },
        {
            id: 2,
            name: 'مجموعة مكعبات بناء 500 قطعة',
            price: 149.99,
            quantity: 1,
            image: 'https://hedeya.com/cdn/shop/files/61cueyvkz0l._ac_sl1500.jpg?v=1764652370&width=360?w=400&h=400&fit=crop',
            category: 'بناء',
        },
        {
            id: 3,
            name: 'دراجة هوائية للأطفال',
            price: 499.99,
            quantity: 1,
            image: 'https://hedeya.com/cdn/shop/files/588da_multi_blocks_92_parca.jpg?v=1764651688&width=360?w=400&h=400&fit=crop',
            category: 'رياضة',
        },
        {
            id: 4,
            name: 'لعبة روبوت تفاعلي',
            price: 399.99,
            quantity: 1,
            image: 'https://hedeya.com/cdn/shop/files/7233886dfcaf6e8485cd0dc5320eb8f2dc32a6f7.jpg?v=1764570447&width=360?w=400&h=400&fit=crop',
            category: 'إلكترونيات',
        },
    ]

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = 50
    const tax = subtotal * 0.14 // 14% tax
    const total = subtotal + shipping + tax

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <CartHeader itemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items - Left Side */}
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {cartItems.map((item, index) => (
                                <CartItemCard item={item} index={index} key={item.id} />
                            ))}
                        </div>

                        {/* Continue Shopping */}
                        <Link
                            to="/products"
                            className="mt-8 inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all"
                        >
                            <ArrowRight size={18} className="rtl:rotate-180" />
                            تابع التسوق
                        </Link>
                    </div>

                    {/* Order Summary - Right Side */}
                    <CartSummary subtotal={subtotal} shipping={shipping} tax={tax} total={total} />
                </div>
            </div>

            <PromoCodeSection />
        </div>
    )
}