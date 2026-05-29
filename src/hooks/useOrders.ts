import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { fetchOrdersApi, type OrdersQueryParams } from '../api/orders.api'

type OrdersError = AxiosError<{ message?: string }>

function getErrorMessage(error: OrdersError | null): string {
    if (!error) return ''
    return (
        error.response?.data?.message ||
        error.message ||
        'Something went wrong. Please try again.'
    )
}

export const useOrders = (params: OrdersQueryParams) => {
    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['orders', params.type, params.status],
        queryFn: () => fetchOrdersApi(params),
        select: (response) => response.orders,
    })

    return {
        orders: data ?? [],
        isPending,
        serverError: getErrorMessage(error as OrdersError | null),
        refetch,
    }
}
