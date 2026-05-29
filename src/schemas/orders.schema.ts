import { z } from 'zod'

export const orderTypeSchema = z.enum(['normal', 'refund'])
export type OrderType = z.infer<typeof orderTypeSchema>

export const normalOrderStatusSchema = z.enum(['new', 'current', 'finished', 'cancelled'])
export type NormalOrderStatus = z.infer<typeof normalOrderStatusSchema>

export const refundOrderStatusSchema = z.enum(['review', 'acceptance', 'received', 'rejection'])
export type RefundOrderStatus = z.infer<typeof refundOrderStatusSchema>

export const orderStatusSchema = z.union([normalOrderStatusSchema, refundOrderStatusSchema])
export type OrderStatus = z.infer<typeof orderStatusSchema>

export const ordersQuerySchema = z.object({
    type: orderTypeSchema,
    status: orderStatusSchema,
})

export type OrdersQueryValues = z.infer<typeof ordersQuerySchema>
