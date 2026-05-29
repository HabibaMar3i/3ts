export function getGoogleMapsApiKey(): string {
    return import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? ''
}

export function isGoogleMapsConfigured(): boolean {
    return getGoogleMapsApiKey().length > 0
}
