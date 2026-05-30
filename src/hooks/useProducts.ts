import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { filterProductsApi } from '../api/products.api'
import { getMainCategoriesApi } from '../api/home.api'

export const useProducts = (initialCategory: number | null = null) => {
    const { t } = useTranslation()
    const [selectedCategory, setSelectedCategory] = useState<number | null>(initialCategory)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    const { data: categories = [] } = useQuery({
        queryKey: ['main-categories'],
        queryFn: () => getMainCategoriesApi(),
        onError: () => {
            toast.error(t('toast.productsLoadError'))
        },
    })

    const { data, isLoading } = useQuery({
        queryKey: ['products', selectedCategory, search, page],
        queryFn: () => filterProductsApi({ category_id: selectedCategory ?? undefined, search, page }),
        onError: () => {
            toast.error(t('toast.productsLoadError'))
        },
    })

    const changeCategory = (id: number | null) => {
        setSelectedCategory(id)
        setPage(1)
    }

    const changeSearch = (value: string) => {
        setSearch(value)
        setPage(1)
    }

    return {
        products: data?.data ?? [],
        categories,
        isLoading,
        selectedCategory,
        search,
        page,
        lastPage: data?.meta?.last_page ?? 1,
        setPage,
        changeCategory,
        changeSearch,
    }
}