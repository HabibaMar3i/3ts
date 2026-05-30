import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { loginApi, type LoginResponse } from '../api/auth.api'
import { useAuthStore } from '../store/auth.store'
import type { LoginFormValues } from '../schemas/auth.schema'

type LoginError = AxiosError<{ msg?: string; message?: string }>

export const useLogin = () => {
  const { setAuth } = useAuthStore()
  const [serverError, setServerError] = useState('')
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data: LoginResponse, variables: LoginFormValues) => {
      if (data.key === 'needActive') {
        navigate('/verify-otp', { state: { phone: variables.phone } })
        toast.success('OTP sent to your phone')
        return
      }
      const { token, ...user } = data.data
      setAuth(token, user)
      setServerError('')
      toast.success('Logged in successfully')
      navigate('/')
    },
    onError: (error: LoginError) => {
      const msg =
        error.response?.data?.msg ||
        error.response?.data?.message ||
        error.message ||
        'Something went wrong.'
      setServerError(msg)
      toast.error(msg)
    },
  })

  const login = (payload: LoginFormValues) => {
    setServerError('')
    mutate(payload)
  }

  return { login, isPending, serverError }
}