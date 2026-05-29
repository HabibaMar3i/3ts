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
    name: z.string().min(1, 'Full name is required'),
    phone: z
        .string()
        .min(1, 'Phone number is required')
        .regex(/^\+?[0-9\s\-()]{7,15}$/, 'Enter a valid phone number'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Enter a valid email'),
    location: z.string().min(1, 'Location is required'),
    city: z.string().min(1, 'City is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirm: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
})

export type SignupFormValues = z.infer<typeof signupSchema>