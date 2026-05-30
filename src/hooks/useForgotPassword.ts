import { useState, useEffect, useRef, useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import { sendOtpApi, verifyOtpApi, resetPasswordApi } from '../api/forgotPassword.api'
import { useForgotPasswordStore } from '../store/forgotPassword.store'

const OTP_TIMEOUT = 60

type ApiError = AxiosError<{ msg?: string; message?: string }>

export const useForgotPassword = () => {
  const { phone, setPhone, setStep } = useForgotPasswordStore()
  const [serverError, setServerError] = useState('')
  const [otpTimer, setOtpTimer] = useState(OTP_TIMEOUT)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = useCallback(() => {
    setOtpTimer(OTP_TIMEOUT)
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) { clearInterval(timerRef.current!); return 0 }
        return prev - 1
      })
    }, 1000)
  }, [])

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  const { mutate: mutateSendOtp, isPending: isSendingOtp } = useMutation({
    mutationFn: sendOtpApi,
    onSuccess: () => {
      setServerError('')
      setStep('otp')
      startTimer()
      toast.success('OTP sent successfully')
    },
    onError: (error: ApiError) => {
      const msg = error.response?.data?.msg || error.response?.data?.message || 'Something went wrong.'
      setServerError(msg)
      toast.error(msg)
    },
  })

  const { mutate: mutateVerifyOtp, isPending: isVerifyingOtp } = useMutation({
    mutationFn: verifyOtpApi,
    onSuccess: (data) => {
      if (data.key === 'success') {
        setServerError('')
        setStep('reset')
        toast.success('OTP verified successfully')
      } else {
        setServerError(data.msg)
        toast.error(data.msg)
      }
    },
    onError: (error: ApiError) => {
      const msg = error.response?.data?.msg || 'Invalid code. Please try again.'
      setServerError(msg)
      toast.error(msg)
    },
  })

  const { mutate: mutateResetPassword, isPending: isResettingPassword } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: (data) => {
      if (data.key === 'success') {
        setServerError('')
        setStep('success')
        toast.success('Password reset successfully')
      } else {
        setServerError(data.msg)
        toast.error(data.msg)
      }
    },
    onError: (error: ApiError) => {
      const msg = error.response?.data?.msg || 'Something went wrong.'
      setServerError(msg)
      toast.error(msg)
    },
  })

  const sendOtp = (phoneNumber: string) => {
    setServerError('')
    setPhone(phoneNumber)
    mutateSendOtp(phoneNumber)
  }

  const verifyOtp = (otp: string) => {
    setServerError('')
    mutateVerifyOtp({ phone, code: otp })
  }

  const resendOtp = () => {
    setServerError('')
    toast.loading('Resending OTP...')
    mutateSendOtp(phone)
    startTimer()
  }

  const resetPassword = (newPassword: string) => {
    setServerError('')
    mutateResetPassword({ phone, password: newPassword })
  }

  const formatTimer = () => {
    const m = Math.floor(otpTimer / 60).toString().padStart(2, '0')
    const s = (otpTimer % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return { sendOtp, verifyOtp, resendOtp, resetPassword, isSendingOtp, isVerifyingOtp, isResettingPassword, serverError, otpTimer, formatTimer, phone }
}