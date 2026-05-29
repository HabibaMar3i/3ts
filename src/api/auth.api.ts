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