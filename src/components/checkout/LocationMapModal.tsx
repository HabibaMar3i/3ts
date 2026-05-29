import { APIProvider } from '@vis.gl/react-google-maps'
import { useTranslation } from 'react-i18next'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog'
import { resolveLocale } from '../../i18n'
import { getGoogleMapsApiKey, isGoogleMapsConfigured } from '../../lib/googleMaps'
import { LocationMapPicker } from './LocationMapPicker'
import type { DeliveryLocation } from '../../types/location'

interface LocationMapModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialLocation?: Pick<DeliveryLocation, 'latitude' | 'longitude'>
    onLocationSelect: (location: DeliveryLocation) => void
}

export function LocationMapModal({
    open,
    onOpenChange,
    initialLocation,
    onLocationSelect,
}: LocationMapModalProps) {
    const { t, i18n } = useTranslation()
    const apiKey = getGoogleMapsApiKey()
    const mapLanguage = resolveLocale(i18n.language) === 'ar' ? 'ar' : 'en'

    const handleConfirm = (location: DeliveryLocation) => {
        onLocationSelect(location)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl" dir="inherit">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-slate-950">
                        {t('checkout.address.mapTitle')}
                    </DialogTitle>
                    <DialogDescription>
                        {t('checkout.address.mapDescription')}
                    </DialogDescription>
                </DialogHeader>

                {!isGoogleMapsConfigured() ? (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                        <p className="font-semibold">{t('checkout.address.missingApiKeyTitle')}</p>
                        <p className="mt-2">{t('checkout.address.missingApiKeyDesc')}</p>
                        <p className="mt-2 font-mono text-xs">
                            VITE_GOOGLE_MAPS_API_KEY=your_key_here
                        </p>
                        <p className="mt-2 text-xs">
                            {t('checkout.address.missingApiKeyHelp')}
                        </p>
                    </div>
                ) : (
                    <APIProvider apiKey={apiKey} language={mapLanguage}>
                        <LocationMapPicker
                            initialLocation={initialLocation}
                            onConfirm={handleConfirm}
                            onCancel={() => onOpenChange(false)}
                        />
                    </APIProvider>
                )}
            </DialogContent>
        </Dialog>
    )
}
