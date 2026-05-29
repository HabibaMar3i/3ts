import { z } from 'zod'

export const paymentMethodSchema = z.enum(['electronic', 'wallet'])

export const checkoutSchema = z
    .object({
        address: z.string().min(1, 'Delivery address is required'),
        latitude: z.number(),
        longitude: z.number(),
        paymentMethod: paymentMethodSchema,
        notes: z.string().optional(),
    })
    .refine((data) => data.latitude !== 0 && data.longitude !== 0, {
        message: 'Please select a delivery location on the map',
        path: ['address'],
    })

export type CheckoutFormValues = z.infer<typeof checkoutSchema>
export type PaymentMethod = z.infer<typeof paymentMethodSchema>
