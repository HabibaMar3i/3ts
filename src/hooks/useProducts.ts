import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { filterProductsApi } from '../api/products.api'
import { getMainCategoriesApi } from '../api/home.api'
import type { Category } from '../api/home.api'
import type { ApiProduct } from '../api/products.api'

export const useProducts = (initialCategory: number | null = null) => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(initialCategory)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    const { data: categories = [] } = useQuery<Category[]>({
        queryKey: ['main-categories'],
        queryFn: () => getMainCategoriesApi(),
    })

    const { data, isLoading } = useQuery({
        queryKey: ['products', selectedCategory, search, page],
        queryFn: () => filterProductsApi({ category_id: selectedCategory ?? undefined, search, page }),
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
        products: (data?.data ?? []) as ApiProduct[],
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