import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { getHomeApi, getCategoriesApi, getLatestProductsApi } from '../api/home.api'
import type { Category, HomeData, Product, Slider } from '../api/home.api'

export type UseHomeReturn = {
    sliders: Slider[]
    categories: Category[]
    latestProducts: Product[]
    isLoading: boolean
}

export const useHome = (): UseHomeReturn => {
    const { t } = useTranslation()

    const { data: homeData, isLoading: homeLoading } = useQuery<HomeData, Error>({
        queryKey: ['home'],
        queryFn: getHomeApi,
        onError: () => {
            toast.error(t('toast.homeLoadError'))
        },
    })

    const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[], Error>({
        queryKey: ['categories'],
        queryFn: getCategoriesApi,
        onError: () => {
            toast.error(t('toast.categoriesLoadError'))
        },
    })

    const { data: latestProducts = [], isLoading: productsLoading } = useQuery<Product[], Error>({
        queryKey: ['latest-products'],
        queryFn: getLatestProductsApi,
        onError: () => {
            toast.error(t('toast.homeLoadError'))
        },
    })

    return {
        sliders: homeData?.sliders ?? [],
        categories,
        latestProducts,
        isLoading: homeLoading || categoriesLoading || productsLoading,
    }
}