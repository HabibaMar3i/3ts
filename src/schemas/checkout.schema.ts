import { z } from 'zod'

export const paymentMethodSchema = z.enum(['electronic', 'wallet'])

export const checkoutSchema = z.object({
    address: z.string().min(1, 'Delivery address is required'),
    paymentMethod: paymentMethodSchema,
    notes: z.string().optional(),
})

export type CheckoutFormValues = z.infer<typeof checkoutSchema>
export type PaymentMethod = z.infer<typeof paymentMethodSchema>
