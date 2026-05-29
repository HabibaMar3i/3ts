import { axiosInstance } from '../lib/axios'

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
    message: string
    user: {
        id: string
        name: string
        phone: string
        email: string
    }
}

export const signupApi = async (payload: SignupPayload): Promise<SignupResponse> => {
    const { data } = await axiosInstance.post<SignupResponse>('/api/auth/register', payload)
    return data
}