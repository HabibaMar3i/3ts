import { useState, useEffect, useRef, useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import {
  sendOtpApi,
  verifyOtpApi,
  resetPasswordApi,
  type SendOtpPayload,
  type SendOtpResponse,
  type VerifyOtpPayload,
  type VerifyOtpResponse,
  type ResetPasswordPayload,
  type ResetPasswordResponse,
} from '../api/forgotPassword.api'
import { useForgotPasswordStore } from '../store/forgotPassword.store'

const OTP_TIMEOUT = 36 // seconds

export const useForgotPassword = () => {
  const { phone, resetToken, setPhone, setResetToken, setStep } = useForgotPasswordStore()
  const [serverError, setServerError] = useState('')
  const [otpTimer, setOtpTimer] = useState(OTP_TIMEOUT)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = useCallback(() => {
    setOtpTimer(OTP_TIMEOUT)
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [])

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  // Step 1: Send OTP
  const {
    mutate: mutateSendOtp,
    isPending: isSendingOtp,
  } = useMutation<SendOtpResponse, AxiosError<{ message?: string }>, SendOtpPayload>({
    mutationFn: sendOtpApi,
    onSuccess: () => {
      setServerError('')
      setStep('otp')
      startTimer()
    },
    onError: (error) => {
      setServerError(
        error.response?.data?.message || error.message || 'Something went wrong.'
      )
    },
  })

  // Step 2: Verify OTP
  const {
    mutate: mutateVerifyOtp,
    isPending: isVerifyingOtp,
  } = useMutation<VerifyOtpResponse, AxiosError<{ message?: string }>, VerifyOtpPayload>({
    mutationFn: verifyOtpApi,
    onSuccess: (data) => {
      setResetToken(data.resetToken)
      setServerError('')
      setStep('reset')
    },
    onError: (error) => {
      setServerError(
        error.response?.data?.message || error.message || 'Invalid OTP. Please try again.'
      )
    },
  })

  // Step 3: Reset Password
  const {
    mutate: mutateResetPassword,
    isPending: isResettingPassword,
  } = useMutation<ResetPasswordResponse, AxiosError<{ message?: string }>, ResetPasswordPayload>({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      setServerError('')
      setStep('success')
    },
    onError: (error) => {
      setServerError(
        error.response?.data?.message || error.message || 'Something went wrong.'
      )
    },
  })

  const sendOtp = (phoneNumber: string) => {
    setServerError('')
    setPhone(phoneNumber)
    mutateSendOtp({ phone: phoneNumber })
  }

  const verifyOtp = (otp: string) => {
    setServerError('')
    mutateVerifyOtp({ phone, otp })
  }

  const resendOtp = () => {
    setServerError('')
    mutateSendOtp({ phone })
    startTimer()
  }

  const resetPassword = (newPassword: string) => {
    setServerError('')
    mutateResetPassword({ resetToken, newPassword })
  }

  const formatTimer = () => {
    const m = Math.floor(otpTimer / 60).toString().padStart(2, '0')
    const s = (otpTimer % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return {
    sendOtp,
    verifyOtp,
    resendOtp,
    resetPassword,
    isSendingOtp,
    isVerifyingOtp,
    isResettingPassword,
    serverError,
    otpTimer,
    formatTimer,
    phone,
  }
}