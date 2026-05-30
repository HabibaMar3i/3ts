import { axiosInstance } from '../lib/axios'
import { getDeviceId, getDeviceType } from '../lib/device'
import type { SignupFormValues } from '../schemas/auth.schema'

export interface LoginPayload {
    phone: string
    password: string
}

export interface LoginResponse {
    token: string
    user: {
        id: string
        name: string
        phone: string
    }
}

export const loginApi = async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await axiosInstance.post<LoginResponse>('/api/auth/login', payload)
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

export const signupApi = async (payload: SignupFormValues & { lat: number; lng: number }): Promise<SignupResponse> => {
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
    form.append('map_desc', payload.map_desc)
    form.append('device_id', getDeviceId())
    form.append('device_type', getDeviceType())

    const { data } = await axiosInstance.post<SignupResponse>('/register', form)
    return data
}