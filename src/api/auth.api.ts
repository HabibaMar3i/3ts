import { axiosInstance } from '../lib/axios'
import { getDeviceId, getDeviceType } from '../lib/device'
import type { SignupFormValues } from '../schemas/auth.schema'

export interface LoginPayload {
    phone: string
    password: string
    lang?: string
}


export interface LoginResponse {
    key: string
    msg: string
    data: {
        id: number
        name: string
        email: string | null
        phone: string
        image: string | null
        lang: string
        token: string
        city: { id: number; name: string } | null
    }
}

export const loginApi = async (payload: LoginPayload): Promise<LoginResponse> => {
    const form = new FormData()
    form.append('country_code', '966')
    form.append('phone', payload.phone)
    form.append('password', payload.password)
    form.append('lang', payload.lang ?? 'en')
    form.append('device_id', getDeviceId())
    form.append('device_type', getDeviceType())
    console.log('login payload:', Object.fromEntries(form))

    const { data } = await axiosInstance.post<LoginResponse>('/sign-in', form)
        .catch((error) => {
            console.log('login error:', error.response?.data)
            console.log('login error full:', error)
            console.log('login error response:', error.response)
            throw error
        })
    return data
}

export interface SignupPayload {
    name: string
    phone: string
    email: string
    location: string
    city: string
    password: string
    confirm: string
    lang?: string
}

export interface SignupResponse {
    key: string
    msg: string
    data: {
        token: string
        user: {
            id: string
            name: string
            phone: string
        }
    }
}

export const signupApi = async (payload: SignupFormValues & { lat: number; lng: number; lang?: string }): Promise<SignupResponse> => {
    const form = new FormData()

    if (payload.image) form.append('image', payload.image)
    form.append('name', payload.name)
    form.append('country_code', '966')
    form.append('phone', payload.phone)
    if (payload.email) form.append('email', payload.email)
    form.append('password', payload.password)
    form.append('city_id', String(payload.city_id))
    form.append('lat', String(payload.lat))
    form.append('lng', String(payload.lng))
    form.append('lang', payload.lang ?? 'en')
    form.append('map_desc', payload.map_desc)
    form.append('device_id', getDeviceId())
    form.append('device_type', getDeviceType())

    console.log('register payload:', Object.fromEntries(form))
    const { data } = await axiosInstance.post<SignupResponse>('/register', form)
        .catch((error) => {
            console.log('register error:', error.response?.data)
            throw error
        })
    return data
}

export interface OtpResponse {
    key: string
    msg: string
    data?: {
        id: number
        name: string
        email: string | null
        phone: string
        image: string | null
        lang: string
        token: string
        city: { id: number; name: string } | null
    }
}

export const activateApi = async (payload: { phone: string; code: string; lang?: string }): Promise<OtpResponse> => {
    const form = new FormData()
    form.append('phone', payload.phone)
    form.append('code', payload.code)
    form.append('lang', payload.lang ?? 'en')
    form.append('country_code', '966')
    form.append('device_id', getDeviceId())
    form.append('device_type', getDeviceType())

    const { data } = await axiosInstance.post<OtpResponse>('/activate?_method=patch', form)
    return data
}

export const resendCodeApi = async (phone: string, lang: string = 'en'): Promise<{ key: string; msg: string }> => {
    const form = new FormData()
    form.append('phone', phone)
    form.append('lang', lang)
    form.append('country_code', '966')

    const { data } = await axiosInstance.post('/resend-code', form)
    return data
}