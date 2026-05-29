import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { loginApi, type LoginPayload, type LoginResponse } from '../api/auth.api'
import { useAuthStore } from '../store/auth.store'

type LoginError = AxiosError<{ message?: string }>

export const useLogin = () => {
    const { setAuth } = useAuthStore()
    const [serverError, setServerError] = useState('')

    const { mutate, isPending, isSuccess, reset: resetMutation } = useMutation({
        mutationFn: loginApi,
        onSuccess: (data: LoginResponse) => {
            setAuth(data.token, data.user)
            setServerError('')
        },
        onError: (error: LoginError) => {
            const msg =
                error.response?.data?.message ||
                error.message ||
                'Something went wrong. Please try again.'
            setServerError(msg)
        },
    })

    const login = (payload: LoginPayload) => {
        setServerError('')
        mutate(payload)
    }

    return { login, isPending, isSuccess, serverError, resetMutation }
}