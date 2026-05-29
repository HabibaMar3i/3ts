import axios from 'axios'

export interface SendOtpPayload {
    phone: string
}

export interface SendOtpResponse {
    message: string
}

export interface VerifyOtpPayload {
    phone: string
    otp: string
}

export interface VerifyOtpResponse {
    resetToken: string
}

export interface ResetPasswordPayload {
    resetToken: string
    newPassword: string
}

export interface ResetPasswordResponse {
    message: string
}

export const sendOtpApi = async (payload: SendOtpPayload): Promise<SendOtpResponse> => {
    const { data } = await axios.post<SendOtpResponse>('/api/auth/forgot-password/send-otp', payload)
    return data
}

export const verifyOtpApi = async (payload: VerifyOtpPayload): Promise<VerifyOtpResponse> => {
    const { data } = await axios.post<VerifyOtpResponse>('/api/auth/forgot-password/verify-otp', payload)
    return data
}

export const resetPasswordApi = async (payload: ResetPasswordPayload): Promise<ResetPasswordResponse> => {
    const { data } = await axios.post<ResetPasswordResponse>('/api/auth/forgot-password/reset', payload)
    return data
}