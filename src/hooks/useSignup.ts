import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { signupApi, type SignupPayload, type SignupResponse } from '../api/auth.api'

type SignupError = AxiosError<{ message?: string }>

export const useSignup = () => {
    const [serverError, setServerError] = useState('')

    const { mutate, isPending, isSuccess, reset: resetMutation } = useMutation({
        mutationFn: signupApi,
        onSuccess: (_data: SignupResponse) => {
            setServerError('')
        },
        onError: (error: SignupError) => {
            const msg =
                error.response?.data?.message ||
                error.message ||
                'Something went wrong. Please try again.'
            setServerError(msg)
        },
    })

    const signup = (payload: SignupPayload) => {
        setServerError('')
        mutate(payload)
    }

    return { signup, isPending, isSuccess, serverError, resetMutation }
}