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

export const signupSchema = z.object({
    image: z.instanceof(File).optional(),
    name: z.string().min(1, 'Full name is required').max(50),
    phone: z.string().min(1, 'Phone is required').regex(/^\d{9}$/, 'Must be 9 digits'),
    email: z.string().email('Invalid email').optional().or(z.literal('')),
    password: z.string().min(6).max(100),
    confirm: z.string().min(1, 'Please confirm your password'),
    city_id: z.coerce.number().min(1, 'City is required'),
    map_desc: z.string().min(1, 'Address description is required').max(250),
}).refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
})

export type SignupFormValues = z.infer<typeof signupSchema>