import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { activateApi, resendCodeApi, type OtpResponse } from '../api/auth.api'
import { useAuthStore } from '../store/auth.store'

type OtpError = AxiosError<{ msg?: string }>

export const useOtp = (phone: string, lang: string) => {
    const { setAuth } = useAuthStore()
    const navigate = useNavigate()
    const [serverError, setServerError] = useState('')
    const [resendMsg, setResendMsg] = useState('')

    const { mutate: activate, isPending } = useMutation({
        mutationFn: (code: string) => activateApi({ phone, code, lang }),
        onSuccess: (data: OtpResponse) => {
            if (data.key === 'success' && data.data) {
                const { token, ...user } = data.data
                setAuth(token, user)
                toast.success('Phone verified successfully')
                navigate('/')
            } else {
                const message = data.msg || 'Invalid code. Please try again.'
                setServerError(message)
                toast.error(message)
            }
        },
        onError: (error: OtpError) => {
            const msg = error.response?.data?.msg || 'Invalid code. Please try again.'
            setServerError(msg)
            toast.error(msg)
        },
    })

    const { mutate: resend, isPending: isResending } = useMutation({
        mutationFn: () => resendCodeApi(phone, lang),
        onSuccess: (data) => {
            setResendMsg(data.msg)
            setServerError('')
            toast.success(data.msg || 'OTP resent successfully')
        },
        onError: (error: OtpError) => {
            const msg = error.response?.data?.msg || 'Could not resend code.'
            setServerError(msg)
            toast.error(msg)
        },
    })

    return { activate, isPending, resend, isResending, serverError, resendMsg }
}