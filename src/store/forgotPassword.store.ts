import { create } from 'zustand'

export type ForgotPasswordStep = 'phone' | 'otp' | 'reset' | 'success'

interface ForgotPasswordState {
    step: ForgotPasswordStep
    phone: string
    resetToken: string
    setPhone: (phone: string) => void
    setResetToken: (token: string) => void
    setStep: (step: ForgotPasswordStep) => void
    reset: () => void
}

export const useForgotPasswordStore = create<ForgotPasswordState>((set) => ({
    step: 'phone',
    phone: '',
    resetToken: '',
    setPhone: (phone) => set({ phone }),
    setResetToken: (resetToken) => set({ resetToken }),
    setStep: (step) => set({ step }),
    reset: () => set({ step: 'phone', phone: '', resetToken: '' }),
}))