import { axiosInstance } from '../lib/axios'

export interface Slider {
    id: number
    image: string
    title: string
    description: string
}

export interface Category {
    id: number
    name: string
    image: string
}

export interface Product {
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

export interface CategoryWithProducts {
    id: number
    name: string
    image: string
    products: Product[]
}

export interface HomeData {
    sliders: Slider[]
}

export const getHomeApi = async (): Promise<HomeData> => {
    const { data } = await axiosInstance.get('/home-page')
    return data.data
}

export const getCategoriesApi = async (): Promise<Category[]> => {
    const { data } = await axiosInstance.get('/main-categories-with-limit')
    return data.data
}

export const getLatestProductsApi = async (): Promise<Product[]> => {
    const { data } = await axiosInstance.get('/latest-added-products')
    return data.data
}

export const getMainCategoriesApi = async (page = 1): Promise<Category[]> => {
    const { data } = await axiosInstance.get(`/main-categories-with-pagination?paginate=12&page=${page}`)
    console.log('categories response:', data)
    return data.data?.data ?? data.data ?? []
}

export const getHomeCategoriesApi = async (): Promise<CategoryWithProducts[]> => {
    const { data } = await axiosInstance.get('/home-page-categories')
    return data.data
}

export const getSubCategoriesApi = async (categoryId: number): Promise<Category[]> => {
    const { data } = await axiosInstance.get(`/categories/${categoryId}`)
    return data.data
}