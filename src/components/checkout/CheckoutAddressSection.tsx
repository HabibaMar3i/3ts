import { useState } from 'react'
import { MapPin, Pencil } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import type { CheckoutFormValues } from '../../schemas/checkout.schema'
import type { DeliveryLocation } from '../../types/location'
import { LocationMapModal } from './LocationMapModal'

interface CheckoutAddressSectionProps {
    register: UseFormRegister<CheckoutFormValues>
    errors: FieldErrors<CheckoutFormValues>
    addressValue: string
    latitude: number
    longitude: number
    onLocationSelect: (location: DeliveryLocation) => void
}

export function CheckoutAddressSection({
    register,
    errors,
    addressValue,
    latitude,
    longitude,
    onLocationSelect,
}: CheckoutAddressSectionProps) {
    const { t } = useTranslation()
    const [mapOpen, setMapOpen] = useState(false)

    const openMap = () => setMapOpen(true)

    return (
        <>
            <Card className="border-slate-200 bg-white">
                <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
                    <CardTitle className="text-base font-bold text-slate-950">
                        {t('checkout.address.title')}
                    </CardTitle>
                    <button
                        type="button"
                        onClick={openMap}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-red-400 hover:text-red-600"
                        aria-label={t('checkout.address.edit')}
                    >
                        <Pencil size={16} />
                    </button>
                </CardHeader>
                <CardContent className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900" htmlFor="address">
                        {t('checkout.address.label')}
                    </label>
                    <button
                        type="button"
                        onClick={openMap}
                        className="relative w-full text-start"
                    >
                        <MapPin
                            size={18}
                            className="pointer-events-none absolute start-3 top-1/2 z-10 -translate-y-1/2 text-red-600"
                        />
                        <Input
                            id="address"
                            type="text"
                            readOnly
                            value={addressValue}
                            placeholder={t('checkout.address.placeholder')}
                            className={`pointer-events-none w-full cursor-pointer rounded-xl border-slate-200 bg-slate-50 ps-10 pe-4 py-3 ${
                                errors.address ? 'border-red-400 focus-visible:ring-red-400' : ''
                            }`}
                        />
                    </button>
                    <input type="hidden" {...register('address')} />
                    <input type="hidden" {...register('latitude', { valueAsNumber: true })} />
                    <input type="hidden" {...register('longitude', { valueAsNumber: true })} />
                    {errors.address && (
                        <p className="text-xs text-red-600">{errors.address.message}</p>
                    )}
                </CardContent>
            </Card>

            <LocationMapModal
                open={mapOpen}
                onOpenChange={setMapOpen}
                initialLocation={{ latitude, longitude }}
                onLocationSelect={onLocationSelect}
            />
        </>
    )
}
