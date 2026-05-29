import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'
import { formatMoney } from '../../lib/formatMoney'
import type { CheckoutSummaryResponse } from '../../api/checkout.api'

interface CheckoutSummaryProps {
    summary: CheckoutSummaryResponse | undefined
    isLoading: boolean
    isSubmitting: boolean
}

export function CheckoutSummary({ summary, isLoading, isSubmitting }: CheckoutSummaryProps) {
    const { t, i18n } = useTranslation()
    const locale = i18n.language

    const vatPercent = summary ? Math.round(summary.vatRate * 100) : 14

    return (
        <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border-2 border-slate-200 bg-linear-to-b from-slate-50 to-white p-6">
                <h2 className="mb-6 text-lg font-bold text-slate-950">{t('checkout.summary.title')}</h2>

                {isLoading ? (
                    <p className="py-8 text-center text-sm text-slate-500">{t('checkout.summary.loading')}</p>
                ) : summary ? (
                    <>
                        <div className="space-y-4 border-b-2 border-slate-200 pb-6">
                            <div className="flex items-center justify-between gap-4">
                                <p className="text-sm text-slate-600">{t('checkout.summary.subtotal')}</p>
                                <p className="text-sm font-semibold text-slate-950">
                                    {formatMoney(summary.subtotal, locale)}
                                </p>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <p className="text-sm text-slate-600">
                                    {t('checkout.summary.vat', { rate: vatPercent })}
                                </p>
                                <p className="text-sm font-semibold text-slate-950">
                                    {formatMoney(summary.vatAmount, locale)}
                                </p>
                            </div>
                        </div>

                        <div className="pt-6">
                            <div className="mb-2 flex items-center justify-between gap-4">
                                <p className="text-lg font-bold text-slate-950">{t('checkout.summary.total')}</p>
                                <p className="text-2xl font-bold text-red-600">
                                    {formatMoney(summary.total, locale)}
                                </p>
                            </div>
                            <p className="mb-6 text-xs text-slate-500">{t('checkout.summary.taxNote')}</p>

                            <Button
                                type="submit"
                                disabled={isSubmitting || isLoading || !summary}
                                className="w-full rounded-lg bg-linear-to-r from-red-600 to-red-700 px-6 py-3 font-semibold text-white shadow-lg shadow-red-600/30 transition-all duration-200 hover:shadow-red-600/50 disabled:opacity-70"
                            >
                                {isSubmitting ? t('checkout.summary.submitting') : t('checkout.summary.confirm')}
                            </Button>
                        </div>
                    </>
                ) : (
                    <p className="py-8 text-center text-sm text-red-600">{t('checkout.summary.error')}</p>
                )}
            </div>
        </div>
    )
}
