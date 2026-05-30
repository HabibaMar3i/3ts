import { z } from 'zod'

export const forgotPasswordPhoneSchema = z.object({
    phone: z.string().min(9).max(11).regex(/^\d+$/, 'Numbers only'),
})

export const forgotPasswordOtpSchema = z.object({
    otp: z.string().length(4, 'OTP must be 4 digits').regex(/^\d{4}$/, 'OTP must contain only digits'),
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