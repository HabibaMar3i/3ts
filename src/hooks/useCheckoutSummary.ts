import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { fetchCheckoutSummaryApi } from '../api/checkout.api'

type SummaryError = AxiosError<{ message?: string }>

function getErrorMessage(error: SummaryError | null): string {
    if (!error) return ''
    return error.response?.data?.message || error.message || 'Something went wrong. Please try again.'
}

export const useCheckoutSummary = () => {
    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['checkout', 'summary'],
        queryFn: fetchCheckoutSummaryApi,
    })

    return {
        summary: data,
        isPending,
        serverError: getErrorMessage(error as SummaryError | null),
        refetch,
    }
}
