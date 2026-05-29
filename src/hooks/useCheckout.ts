import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { submitCheckoutApi, type CheckoutSubmitResponse } from '../api/checkout.api'
import type { CheckoutFormValues } from '../schemas/checkout.schema'

type CheckoutError = AxiosError<{ message?: string }>

export const useCheckout = () => {
    const [serverError, setServerError] = useState('')

    const { mutate, isPending, isSuccess, data, reset } = useMutation({
        mutationFn: submitCheckoutApi,
        onSuccess: () => setServerError(''),
        onError: (error: CheckoutError) => {
            const msg =
                error.response?.data?.message ||
                error.message ||
                'Something went wrong. Please try again.'
            setServerError(msg)
        },
    })

    const confirmCheckout = (payload: CheckoutFormValues) => {
        setServerError('')
        mutate(payload)
    }

    return {
        confirmCheckout,
        isPending,
        isSuccess,
        orderResult: data as CheckoutSubmitResponse | undefined,
        serverError,
        reset,
    }
}
