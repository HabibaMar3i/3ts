import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { getMainCategoriesApi, getSubCategoriesApi } from '../api/home.api'
import type { Category } from '../api/home.api'
import { ChevronRight } from 'lucide-react'

export default function Categories() {
    const { t } = useTranslation()
    const [selectedCategory, setSelectedCategory] = useState<{ id: number; name: string } | null>(null)
    const categoriesToastShown = useRef(false)

    const { data: mainCategories = [], isLoading: mainLoading } = useQuery<Category[], Error>({
        queryKey: ['main-categories'],
        queryFn: () => getMainCategoriesApi(),
        onError: () => {
            toast.error(t('toast.categoriesLoadError'))
        },
    })

    const { data: subCategories = [], isLoading: subLoading } = useQuery<Category[], Error>({
        queryKey: ['sub-categories', selectedCategory?.id],
        queryFn: () => getSubCategoriesApi(selectedCategory!.id),
        enabled: !!selectedCategory,
        onError: () => {
            toast.error(t('toast.categoriesLoadError'))
        },
    })

    useEffect(() => {
        if (!mainLoading && !categoriesToastShown.current) {
            toast.success(t('toast.categoriesLoaded'))
            categoriesToastShown.current = true
        }
    }, [mainLoading, t])

    if (mainLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}
            <div className="bg-white border-b border-slate-100 px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                        <Link to="/" className="hover:text-red-600">{t('nav.home')}</Link>
                        <ChevronRight size={14} className="rtl:rotate-180" />
                        {selectedCategory ? (
                            <>
                                <button onClick={() => {
                                    setSelectedCategory(null)
                                    toast.success(t('toast.categoryCleared'))
                                }} className="hover:text-red-600">
                                    {t('categories.categoryLabel')}
                                </button>
                                <ChevronRight size={14} className="rtl:rotate-180" />
                                <span className="text-slate-800 font-semibold">{selectedCategory.name}</span>
                            </>
                        ) : (
                            <span className="text-slate-800 font-semibold">{t('categories.categoryLabel')}</span>
                        )}
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        {selectedCategory ? selectedCategory.name : t('categories.allCategories')}
                    </h1>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Sub categories view */}
                {selectedCategory ? (
                    <>
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="mb-6 flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700">
                            <ChevronRight size={16} className="rotate-180" />
                            {t('categories.backToCategories')}
                        </button>

                        {subLoading ? (
                            <div className="flex justify-center py-20">
                                <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
                            </div>
                        ) : subCategories.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <p className="text-slate-500">{t('categories.noSubCategories')}</p>
                                <Link
                                    to={`/products?category=${selectedCategory.id}`}
                                    className="mt-4 rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700">
                                    {t('categories.viewProducts', { name: selectedCategory.name })}
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                {/* All products in this category */}
                                <Link
                                    to={`/products?category=${selectedCategory.id}`}
                                    className="group flex flex-col items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-center transition-all hover:border-red-400 hover:shadow-md">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl">
                                        🛍️
                                    </div>
                                    <p className="text-sm font-bold text-red-700">{t('categories.allProductsInCategory', { name: selectedCategory.name })}</p>
                                </Link>

                                {subCategories.map((sub) => (
                                    <Link
                                        key={sub.id}
                                        to={`/products?category=${sub.id}`}
                                        className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-center transition-all hover:border-red-300 hover:shadow-md">
                                        <div className="h-16 w-16 overflow-hidden rounded-full bg-slate-100">
                                            <img
                                                src={sub.image}
                                                alt={sub.name}
                                                className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.png' }}
                                            />
                                        </div>
                                        <p className="text-sm font-semibold text-slate-700 group-hover:text-red-600 line-clamp-2">
                                            {sub.name}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    /* Main categories grid */
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {mainCategories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setSelectedCategory({ id: cat.id, name: cat.name })
                                    toast.success(t('toast.categorySelected', { name: cat.name }))
                                }}
                                className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-center transition-all hover:border-red-300 hover:shadow-md">
                                <div className="h-20 w-20 overflow-hidden rounded-full bg-slate-100">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.png' }}
                                    />
                                </div>
                                <p className="text-sm font-semibold text-slate-700 group-hover:text-red-600 line-clamp-2">
                                    {cat.name}
                                </p>
                                <ChevronRight size={14} className="text-slate-300 group-hover:text-red-400 rtl:rotate-180" />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}