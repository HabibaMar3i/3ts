import { axiosInstance } from '../lib/axios'

export const sendOtpApi = async (phone: string) => {
    const form = new FormData()
    form.append('phone', phone)
    const { data } = await axiosInstance.post('/forget-password-send-code', form)
    return data
}

export const verifyOtpApi = async (payload: { phone: string; code: string }) => {
    const form = new FormData()
    form.append('phone', payload.phone)
    form.append('code', payload.code)
    const { data } = await axiosInstance.post('/forget-password-check-code', form)
    return data
}

export const resetPasswordApi = async (payload: { phone: string; password: string }) => {
    const form = new FormData()
    form.append('phone', payload.phone)
    form.append('password', payload.password)
    const { data } = await axiosInstance.post('/reset-password', form)
    return data
}