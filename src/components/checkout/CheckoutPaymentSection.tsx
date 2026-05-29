import { CreditCard, Wallet } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Control, FieldErrors } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { cn } from '#lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import type { CheckoutFormValues, PaymentMethod } from '../../schemas/checkout.schema'

interface CheckoutPaymentSectionProps {
    control: Control<CheckoutFormValues>
    errors: FieldErrors<CheckoutFormValues>
}

const paymentOptions: { value: PaymentMethod; icon: typeof CreditCard; labelKey: string }[] = [
    { value: 'electronic', icon: CreditCard, labelKey: 'checkout.payment.electronic' },
    { value: 'wallet', icon: Wallet, labelKey: 'checkout.payment.wallet' },
]

export function CheckoutPaymentSection({ control, errors }: CheckoutPaymentSectionProps) {
    const { t } = useTranslation()

    return (
        <Card className="border-slate-200 bg-white">
            <CardHeader className="pb-4">
                <CardTitle className="text-base font-bold text-slate-950">
                    {t('checkout.payment.title')}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <Controller
                    name="paymentMethod"
                    control={control}
                    render={({ field }) => (
                        <>
                            {paymentOptions.map((option) => {
                                const Icon = option.icon
                                const isSelected = field.value === option.value
                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => field.onChange(option.value)}
                                        className={cn(
                                            'flex w-full items-center justify-between gap-4 rounded-xl border-2 px-4 py-3 transition-all',
                                            isSelected
                                                ? 'border-red-400 bg-red-50'
                                                : 'border-slate-200 bg-white hover:border-red-200'
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
                                                isSelected
                                                    ? 'border-red-600 bg-red-600'
                                                    : 'border-slate-300 bg-white'
                                            )}
                                        >
                                            {isSelected && (
                                                <span className="h-2 w-2 rounded-full bg-white" />
                                            )}
                                        </span>
                                        <span className="flex flex-1 items-center justify-end gap-2 text-sm font-semibold text-slate-800">
                                            {t(option.labelKey)}
                                            <Icon size={20} className="text-red-600" />
                                        </span>
                                    </button>
                                )
                            })}
                        </>
                    )}
                />
                {errors.paymentMethod && (
                    <p className="text-xs text-red-600">{errors.paymentMethod.message}</p>
                )}
            </CardContent>
        </Card>
    )
}
