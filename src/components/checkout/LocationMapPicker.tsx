import { useCallback, useMemo, useState } from 'react'
import { Map, Marker, useMapsLibrary } from '@vis.gl/react-google-maps'
import { useTranslation } from 'react-i18next'
import { Loader2, Navigation } from 'lucide-react'
import { Button } from '../ui/button'
import { DEFAULT_MAP_CENTER, type DeliveryLocation } from '../../types/location'

interface LocationMapPickerProps {
    initialLocation?: Pick<DeliveryLocation, 'latitude' | 'longitude'>
    onConfirm: (location: DeliveryLocation) => void
    onCancel: () => void
}

export function LocationMapPicker({ initialLocation, onConfirm, onCancel }: LocationMapPickerProps) {
    const { t } = useTranslation()
    const geocodingLib = useMapsLibrary('geocoding')

    const geocoder = useMemo(
        () => (geocodingLib ? new geocodingLib.Geocoder() : null),
        [geocodingLib]
    )

    const hasInitial =
        initialLocation &&
        initialLocation.latitude !== 0 &&
        initialLocation.longitude !== 0

    const [position, setPosition] = useState(() =>
        hasInitial
            ? { lat: initialLocation.latitude, lng: initialLocation.longitude }
            : { lat: DEFAULT_MAP_CENTER.lat, lng: DEFAULT_MAP_CENTER.lng }
    )
    const [isGeocoding, setIsGeocoding] = useState(false)
    const [geocodeError, setGeocodeError] = useState('')

    const updatePosition = useCallback((lat: number, lng: number) => {
        setPosition({ lat, lng })
        setGeocodeError('')
    }, [])

    const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
            setGeocodeError(t('checkout.address.geolocationUnsupported'))
            return
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => updatePosition(pos.coords.latitude, pos.coords.longitude),
            () => setGeocodeError(t('checkout.address.geolocationDenied'))
        )
    }

    const handleConfirm = () => {
        if (!geocoder) {
            setGeocodeError(t('checkout.address.geocoderLoading'))
            return
        }

        setIsGeocoding(true)
        setGeocodeError('')

        geocoder.geocode(
            { location: position },
            (
                results: google.maps.GeocoderResult[] | null,
                status: google.maps.GeocoderStatus
            ) => {
            setIsGeocoding(false)
            if (status === google.maps.GeocoderStatus.OK && results?.[0]) {
                onConfirm({
                    address: results[0].formatted_address,
                    latitude: position.lat,
                    longitude: position.lng,
                })
                return
            }
            setGeocodeError(t('checkout.address.geocodeFailed'))
        }
        )
    }

    return (
        <div className="space-y-4">
            <div className="h-[min(60vh,420px)] w-full overflow-hidden rounded-xl border border-slate-200">
                <Map
                    center={position}
                    zoom={14}
                    gestureHandling="greedy"
                    className="h-full w-full"
                    onClick={(event) => {
                        const latLng = event.detail.latLng
                        if (latLng) {
                            updatePosition(latLng.lat, latLng.lng)
                        }
                    }}
                >
                    <Marker
                        position={position}
                        draggable
                        onDragEnd={(event) => {
                            const latLng = event.latLng
                            if (latLng) {
                                updatePosition(latLng.lat(), latLng.lng())
                            }
                        }}
                    />
                </Map>
            </div>

            <p className="text-xs text-slate-500">{t('checkout.address.mapHint')}</p>

            {geocodeError && (
                <p className="text-xs text-red-600">{geocodeError}</p>
            )}

            <div className="flex flex-wrap gap-2">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleUseMyLocation}
                    className="gap-2"
                >
                    <Navigation size={16} />
                    {t('checkout.address.useMyLocation')}
                </Button>
            </div>

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isGeocoding}>
                    {t('checkout.address.cancel')}
                </Button>
                <Button
                    type="button"
                    onClick={handleConfirm}
                    disabled={isGeocoding || !geocoder}
                    className="gap-2 bg-red-600 hover:bg-red-700"
                >
                    {isGeocoding && <Loader2 size={16} className="animate-spin" />}
                    {t('checkout.address.confirmLocation')}
                </Button>
            </div>
        </div>
    )
}
