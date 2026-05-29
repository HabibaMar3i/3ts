import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { checkoutSchema, type CheckoutFormValues } from '../schemas/checkout.schema'
import { useCheckout } from '../hooks/useCheckout'
import { useCheckoutSummary } from '../hooks/useCheckoutSummary'
import { cartItems } from '../data/cart'
import { CheckoutHeader } from '../components/checkout/CheckoutHeader'
import { CheckoutBreadcrumb } from '../components/checkout/CheckoutBreadcrumb'
import { CheckoutItemsList } from '../components/checkout/CheckoutItemsList'
import { CheckoutAddressSection } from '../components/checkout/CheckoutAddressSection'
import { CheckoutPaymentSection } from '../components/checkout/CheckoutPaymentSection'
import { CheckoutNotesSection } from '../components/checkout/CheckoutNotesSection'
import { CheckoutSummary } from '../components/checkout/CheckoutSummary'

export default function Checkout() {
    const { t } = useTranslation()
    const { summary, isPending: isSummaryLoading, serverError: summaryError } = useCheckoutSummary()
    const { confirmCheckout, isPending, isSuccess, serverError, orderResult } = useCheckout()

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            address: '',
            latitude: 0,
            longitude: 0,
            paymentMethod: 'wallet',
            notes: '',
        },
    })

    const addressValue = watch('address')
    const latitude = watch('latitude')
    const longitude = watch('longitude')

    const handleLocationSelect = (location: {
        address: string
        latitude: number
        longitude: number
    }) => {
        setValue('address', location.address, { shouldValidate: true })
        setValue('latitude', location.latitude, { shouldValidate: true })
        setValue('longitude', location.longitude, { shouldValidate: true })
    }

    const onSubmit = (values: CheckoutFormValues) => {
        confirmCheckout(values)
    }

    return (
        <div className="min-h-screen bg-white">
            <CheckoutHeader />

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <CheckoutBreadcrumb />

                {isSuccess && orderResult && (
                    <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                        {orderResult.message || t('checkout.success')}
                    </div>
                )}

                {(serverError || summaryError) && (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {serverError || summaryError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-2">
                            <CheckoutItemsList items={cartItems} />

                            <CheckoutAddressSection
                                register={register}
                                errors={errors}
                                addressValue={addressValue}
                                latitude={latitude}
                                longitude={longitude}
                                onLocationSelect={handleLocationSelect}
                            />
                            <CheckoutPaymentSection control={control} errors={errors} />
                            <CheckoutNotesSection register={register} />
                        </div>

                        <CheckoutSummary
                            summary={summary}
                            isLoading={isSummaryLoading}
                            isSubmitting={isPending}
                        />
                    </div>
                </form>

                <Link
                    to="/cart"
                    className="mt-8 inline-flex items-center gap-2 font-semibold text-red-600 transition-all hover:gap-3"
                >
                    {t('checkout.backToCart')}
                </Link>
            </div>
        </div>
    )
}
