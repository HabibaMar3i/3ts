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
            image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=400&fit=crop',
            category: 'سيارات',
        },
        {
            id: 2,
            name: 'مجموعة مكعبات بناء 500 قطعة',
            price: 149.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1594787318286-3d835c1cab83?w=400&h=400&fit=crop',
            category: 'بناء',
        },
        {
            id: 3,
            name: 'دراجة هوائية للأطفال',
            price: 499.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1578702746067-f764ba69be67?w=400&h=400&fit=crop',
            category: 'رياضة',
        },
        {
            id: 4,
            name: 'لعبة روبوت تفاعلي',
            price: 399.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1611095461304-5d9caa8f5eab?w=400&h=400&fit=crop',
            category: 'إلكترونيات',
        },
    ]

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = 50
    const tax = subtotal * 0.14 // 14% tax
    const total = subtotal + shipping + tax

    return (
        <div className="min-h-screen bg-white" dir="rtl">
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
                            <ArrowRight size={18} />
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