export interface DeliveryLocation {
    address: string
    latitude: number
    longitude: number
}

export const DEFAULT_MAP_CENTER = { lat: 30.0444, lng: 31.2357 } as const
