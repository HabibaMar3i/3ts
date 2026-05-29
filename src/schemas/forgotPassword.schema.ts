import { z } from 'zod'

export const forgotPasswordPhoneSchema = z.object({
    phone: z
        .string()
        .min(1, 'Phone number is required')
        .regex(/^\+?[0-9\s\-()]{7,15}$/, 'Enter a valid phone number'),
})

export const forgotPasswordOtpSchema = z.object({
    otp: z
        .string()
        .length(6, 'OTP must be 6 digits')
        .regex(/^\d{6}$/, 'OTP must contain only digits'),
})

export const resetPasswordSchema = z
    .object({
        newPassword: z
            .string()
            .min(1, 'Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string().min(1, 'Please confirm your password'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })

export type ForgotPasswordPhoneValues = z.infer<typeof forgotPasswordPhoneSchema>
export type ForgotPasswordOtpValues = z.infer<typeof forgotPasswordOtpSchema>
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>