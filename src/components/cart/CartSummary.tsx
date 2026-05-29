import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'
import { formatMoney } from '../../lib/formatMoney'

interface CartSummaryProps {
    subtotal: number
    vatRate: number
    vatAmount: number
    total: number
    locale: string
    isLoading?: boolean
}

export function CartSummary({
    subtotal,
    vatRate,
    vatAmount,
    total,
    locale,
    isLoading,
}: CartSummaryProps) {
    const { t } = useTranslation()
    const vatPercent = Math.round(vatRate * 100)

    return (
        <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border-2 border-slate-200 bg-linear-to-b from-slate-50 to-white p-6">
                <h2 className="mb-6 text-lg font-bold text-slate-950">{t('checkout.summary.title')}</h2>

                {isLoading ? (
                    <p className="py-8 text-center text-sm text-slate-500">{t('checkout.summary.loading')}</p>
                ) : (
                    <>
                        <div className="space-y-4 border-b-2 border-slate-200 pb-6">
                            <div className="flex items-center justify-between gap-4">
                                <p className="text-sm text-slate-600">{t('checkout.summary.subtotal')}</p>
                                <p className="text-sm font-semibold text-slate-950">
                                    {formatMoney(subtotal, locale)}
                                </p>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <p className="text-sm text-slate-600">
                                    {t('checkout.summary.vat', { rate: vatPercent })}
                                </p>
                                <p className="text-sm font-semibold text-slate-950">
                                    {formatMoney(vatAmount, locale)}
                                </p>
                            </div>
                        </div>

                        <div className="pt-6 mb-6">
                            <div className="mb-2 flex items-center justify-between gap-4">
                                <p className="text-lg font-bold text-slate-950">{t('checkout.summary.total')}</p>
                                <p className="text-2xl font-bold text-red-600">{formatMoney(total, locale)}</p>
                            </div>
                            <p className="mb-6 text-xs text-slate-500">{t('checkout.summary.taxNote')}</p>

                            <Button
                                asChild
                                className="w-full rounded-lg bg-linear-to-r from-red-600 to-red-700 px-6 py-3 font-semibold text-white shadow-lg shadow-red-600/30 transition-all duration-200 hover:shadow-red-600/50"
                            >
                                <Link to="/checkout">{t('checkout.summary.proceed')}</Link>
                            </Button>

                            <Button
                                variant="outline"
                                asChild
                                className="mt-3 w-full rounded-lg border-2 border-slate-200 bg-white font-semibold text-slate-950 hover:border-red-600 hover:bg-red-50"
                            >
                                <Link to="/products">{t('orders.continueShopping')}</Link>
                            </Button>
                        </div>

                        <div className="space-y-2 border-t-2 border-slate-200 pt-6">
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                <i className="fas fa-shield-alt text-red-600" />
                                <span>{t('checkout.trust.secure')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                <i className="fas fa-undo text-red-600" />
                                <span>{t('checkout.trust.returns')}</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
