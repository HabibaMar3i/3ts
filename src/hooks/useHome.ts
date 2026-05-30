import { useQuery } from '@tanstack/react-query'
import { getHomeApi, getCategoriesApi, getLatestProductsApi } from '../api/home.api'

export const useHome = () => {
    const { data: homeData, isLoading: homeLoading } = useQuery({
        queryKey: ['home'],
        queryFn: getHomeApi,
    })

    const { data: categories = [], isLoading: categoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategoriesApi,
    })

    const { data: latestProducts = [], isLoading: productsLoading } = useQuery({
        queryKey: ['latest-products'],
        queryFn: getLatestProductsApi,
    })

    return {
        sliders: homeData?.sliders ?? [],
        categories,
        latestProducts,
        isLoading: homeLoading || categoriesLoading || productsLoading,
    }
}