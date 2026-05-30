import { useQuery } from '@tanstack/react-query'
import { getHomeApi, getCategoriesApi, getLatestProductsApi } from '../api/home.api'
import type { Category, HomeData, Product, Slider } from '../api/home.api'

export type UseHomeReturn = {
    sliders: Slider[]
    categories: Category[]
    latestProducts: Product[]
    isLoading: boolean
}

export const useHome = (): UseHomeReturn => {
    const { data: homeData, isLoading: homeLoading } = useQuery<HomeData>({
        queryKey: ['home'],
        queryFn: getHomeApi,
    })

    const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: getCategoriesApi,
    })

    const { data: latestProducts, isLoading: productsLoading } = useQuery<Product[]>({
        queryKey: ['latest-products'],
        queryFn: getLatestProductsApi,
    })

    return {
        sliders: homeData?.sliders ?? [],
        categories: categories ?? [],
        latestProducts: latestProducts ?? [],
        isLoading: homeLoading || categoriesLoading || productsLoading,
    }
}