import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { activateApi, resendCodeApi, type OtpResponse } from '../api/auth.api'
import { useAuthStore } from '../store/auth.store'

type OtpError = AxiosError<{ msg?: string }>

export const useOtp = (phone: string) => {
    const { setAuth } = useAuthStore()
    const navigate = useNavigate()
    const [serverError, setServerError] = useState('')
    const [resendMsg, setResendMsg] = useState('')

    const { mutate: activate, isPending } = useMutation({
        mutationFn: (code: string) => activateApi({ phone, code }),
        onSuccess: (data: OtpResponse) => {
            if (data.key === 'success' && data.data) {
                const { token, ...user } = data.data
                setAuth(token, user)
                navigate('/')
            } else {
                setServerError(data.msg)
            }
        },
        onError: (error: OtpError) => {
            setServerError(error.response?.data?.msg || 'Invalid code. Please try again.')
        },
    })

    const { mutate: resend, isPending: isResending } = useMutation({
        mutationFn: () => resendCodeApi(phone),
        onSuccess: (data) => {
            setResendMsg(data.msg)
            setServerError('')
        },
        onError: (error: OtpError) => {
            setServerError(error.response?.data?.msg || 'Could not resend code.')
        },
    })

    return { activate, isPending, resend, isResending, serverError, resendMsg }
}