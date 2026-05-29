import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { CartHeader } from '../components/cart/CartHeader'
import { CartItemCard } from '../components/cart/CartItemCard'
import { CartSummary } from '../components/cart/CartSummary'
import { cartItems, getCartItemCount, getCartSubtotal } from '../data/cart'
import { useCheckoutSummary } from '../hooks/useCheckoutSummary'

export default function Cart() {
    const { t, i18n } = useTranslation()
    const { summary, isPending } = useCheckoutSummary()

    const subtotal = summary?.subtotal ?? getCartSubtotal(cartItems)
    const vatRate = summary?.vatRate ?? 0.14
    const vatAmount = summary?.vatAmount ?? subtotal * vatRate
    const total = summary?.total ?? subtotal + vatAmount

    return (
        <div className="min-h-screen bg-white">
            <CartHeader itemCount={getCartItemCount(cartItems)} />

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {cartItems.map((item, index) => (
                                <CartItemCard item={item} index={index} key={item.id} />
                            ))}
                        </div>

                        <Link
                            to="/products"
                            className="mt-8 inline-flex items-center gap-2 font-semibold text-red-600 transition-all hover:gap-3"
                        >
                            <ArrowRight size={18} className="rtl:rotate-180" />
                            {t('orders.continueShopping')}
                        </Link>
                    </div>

                    <CartSummary
                        subtotal={subtotal}
                        vatRate={vatRate}
                        vatAmount={vatAmount}
                        total={total}
                        locale={i18n.language}
                        isLoading={isPending}
                    />
                </div>
            </div>
        </div>
    )
}
