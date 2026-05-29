import type { Order } from '../api/orders.api'
import type { NormalOrderStatus, RefundOrderStatus } from '../schemas/orders.schema'

const baseOrders: Order[] = [
    {
        id: '1',
        orderNumber: '#123321',
        orderDate: '2026-05-28',
        status: 'new',
        relativeTime: 'منذ 1 ساعة',
    },
    {
        id: '2',
        orderNumber: '#123322',
        orderDate: '2026-05-27',
        status: 'current',
        relativeTime: 'منذ 3 ساعات',
    },
    {
        id: '3',
        orderNumber: '#123323',
        orderDate: '2026-05-26',
        status: 'finished',
        relativeTime: 'منذ يوم',
    },
    {
        id: '4',
        orderNumber: '#123324',
        orderDate: '2026-05-25',
        status: 'cancelled',
        relativeTime: 'منذ يومين',
    },
]

const refundOrders: Order[] = [
    {
        id: 'r1',
        orderNumber: '#123321',
        orderDate: '2026-05-28',
        status: 'review',
        relativeTime: 'منذ 1 ساعة',
    },
    {
        id: 'r2',
        orderNumber: '#123325',
        orderDate: '2026-05-27',
        status: 'acceptance',
        relativeTime: 'منذ 2 ساعة',
    },
    {
        id: 'r3',
        orderNumber: '#123326',
        orderDate: '2026-05-26',
        status: 'received',
        relativeTime: 'منذ 5 ساعات',
    },
    {
        id: 'r4',
        orderNumber: '#123327',
        orderDate: '2026-05-25',
        status: 'rejection',
        relativeTime: 'منذ يوم',
    },
]

export function getMockOrders(
    type: 'normal' | 'refund',
    status: NormalOrderStatus | RefundOrderStatus
): Order[] {
    const pool = type === 'normal' ? baseOrders : refundOrders
    return pool.filter((order) => order.status === status)
}
