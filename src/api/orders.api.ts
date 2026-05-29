import { axiosInstance } from '../lib/axios'
import type { OrderType, OrderStatus } from '../schemas/orders.schema'

export interface Order {
    id: string
    orderNumber: string
    orderDate: string
    status: OrderStatus
    relativeTime: string
}

export interface OrdersQueryParams {
    type: OrderType
    status: OrderStatus
}

export interface OrdersResponse {
    orders: Order[]
}

export const fetchOrdersApi = async (params: OrdersQueryParams): Promise<OrdersResponse> => {
    const { data } = await axiosInstance.get<OrdersResponse>('/api/orders', { params })
    return data
}
