export type PaymentStatus = 'paid' | 'pending' | 'failed'
export type AdStatus = 'active' | 'paused' | 'pending'
export type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'cancelled'

export interface VendorAd {
    id: number
    title: string
    placement: string
    budget: number
    status: AdStatus
    startDate: string
    endDate: string
    impressions: number
}

export interface VendorPayment {
    id: number
    reference: string
    description: string
    amount: number
    date: string
    status: PaymentStatus
    method: string
    type: 'products' | 'ads'
}

export interface VendorOrder {
    id: number
    customer: string
    product: string
    amount: number
    status: OrderStatus
    date: string
}

export interface VendorSubscriptionPlan {
    id: string
    name: string
    price: number
    period: string
    features: string[]
    recommended?: boolean
}
