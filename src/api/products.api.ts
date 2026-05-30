import { axiosInstance } from '../lib/axios'

export interface ApiProduct {
    id: number
    title: string
    rate_avg: number
    is_favorite: boolean
    image: string
    price: number
    discount_price: number | null
    has_discount: boolean
    currency: string
}

export interface ProductsResponse {
    data: ApiProduct[]
    meta?: {
        current_page: number
        last_page: number
        total: number
    }
}

export interface FilterParams {
    category_id?: number
    search?: string
    page?: number
}

export const filterProductsApi = async (params: FilterParams): Promise<ProductsResponse> => {
    const form = new FormData()
    if (params.category_id) form.append('category_id', String(params.category_id))
    if (params.search) form.append('search', params.search)
    if (params.page) form.append('page', String(params.page))

    const { data } = await axiosInstance.post('/filter-products', form)
    console.log('products response:', data)
    return {
        data: data.data?.data ?? data.data ?? [],
        meta: data.data?.meta ?? data.meta ?? null,
    }
}