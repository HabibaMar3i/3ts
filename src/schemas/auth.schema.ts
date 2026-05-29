import { z } from 'zod'

export const loginSchema = z.object({
    phone: z
        .string()
        .min(1, 'Phone number is required')
        .regex(/^\+?[0-9\s\-()]{7,15}$/, 'Enter a valid phone number'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters'),
})

export type LoginFormValues = z.infer<typeof loginSchema>