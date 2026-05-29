import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function CheckoutBreadcrumb() {
    const { t } = useTranslation()

    const crumbs = [
        { label: t('checkout.breadcrumb.home'), to: '/' },
        { label: t('checkout.breadcrumb.products'), to: '/products' },
        { label: t('checkout.breadcrumb.cart'), to: '/cart' },
        { label: t('checkout.breadcrumb.checkout'), to: null },
    ]

    return (
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-2">
                {crumbs.map((crumb, index) => (
                    <li key={crumb.label} className="flex items-center gap-2">
                        {index > 0 && (
                            <ChevronLeft size={14} className="text-slate-400 rtl:rotate-180" aria-hidden />
                        )}
                        {crumb.to ? (
                            <Link to={crumb.to} className="font-medium transition-colors hover:text-red-600">
                                {crumb.label}
                            </Link>
                        ) : (
                            <span className="font-semibold text-slate-800">{crumb.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
