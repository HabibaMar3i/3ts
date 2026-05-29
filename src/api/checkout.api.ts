import { axiosInstance } from '../lib/axios'
import type { CheckoutFormValues } from '../schemas/checkout.schema'

export interface CheckoutSummaryResponse {
    subtotal: number
    vatRate: number
    vatAmount: number
    total: number
    currency: string
}

export interface CheckoutSubmitResponse {
    orderId: string
    message: string
}

export const fetchCheckoutSummaryApi = async (): Promise<CheckoutSummaryResponse> => {
    const { data } = await axiosInstance.get<CheckoutSummaryResponse>('/api/checkout/summary')
    return data
}

export const submitCheckoutApi = async (
    payload: CheckoutFormValues
): Promise<CheckoutSubmitResponse> => {
    const { data } = await axiosInstance.post<CheckoutSubmitResponse>('/api/checkout/confirm', payload)
    return data
}
