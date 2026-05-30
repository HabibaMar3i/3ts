import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useProducts } from '../hooks/useProducts'
import { Star, Heart, ShoppingCart, ChevronRight } from 'lucide-react'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'

export default function Products() {
    const { t } = useTranslation()
    const [searchParams] = useSearchParams()
    const categoryFromUrl = searchParams.get('category')

    const {
        products, categories, isLoading,
        selectedCategory, search, page, lastPage,
        setPage, changeCategory, changeSearch,
    } = useProducts(categoryFromUrl ? Number(categoryFromUrl) : null)

    return (
        <div className="min-h-screen bg-slate-50">

            <div className="bg-white border-b border-slate-100 px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                        <Link to="/" className="hover:text-red-600">{t('nav.home')}</Link>
                        <ChevronRight size={14} className="rtl:rotate-180" />
                        <span className="text-slate-800 font-semibold">{t('nav.products')}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">{t('nav.products')}</h1>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                <div className="mb-6">
                    <Input type="search" placeholder={t('products.searchPlaceholder')} value={search}
                        onChange={(e) => changeSearch(e.target.value)}
                        className="max-w-sm rounded-full border-slate-200" />
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                    <Button size="sm" variant={selectedCategory === null ? 'default' : 'outline'}
                        className="rounded-full" onClick={() => changeCategory(null)}>
                        {t('products.allCategories')}
                    </Button>
                    {categories.map((cat) => (
                        <Button key={cat.id} size="sm"
                            variant={selectedCategory === cat.id ? 'default' : 'outline'}
                            className="rounded-full" onClick={() => changeCategory(cat.id)}>
                            {cat.name}
                        </Button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <p className="text-lg font-semibold text-slate-700">{t('products.noResults')}</p>
                        <p className="text-sm text-slate-500 mt-1">{t('products.tryChanging')}</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                            {products.map((product) => (
                                <Link key={product.id} to={`/product/${product.id}`}
                                    className="group relative rounded-2xl border border-slate-200 bg-white p-3 transition-all hover:border-red-300 hover:shadow-md">

                                    <button onClick={(e) => e.preventDefault()}
                                        className="absolute end-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-red-500 transition-colors z-10">
                                        <Heart size={15} className={product.is_favorite ? 'fill-red-500 text-red-500' : ''} />
                                    </button>

                                    <div className="mb-3 h-36 overflow-hidden rounded-xl bg-slate-100">
                                        <img src={product.image} alt={product.title}
                                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.png' }}
                                        />
                                    </div>

                                    {product.has_discount && (
                                        <span className="mb-1 inline-block rounded-full bg-red-50 px-2 py-0.5 text-xs font-bold text-red-600">{t('products.discount')}</span>
                                    )}

                                    <p className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug">{product.title}</p>

                                    <div className="mt-1 flex items-center gap-1">
                                        <Star size={12} className="fill-amber-400 text-amber-400" />
                                        <span className="text-xs text-slate-500">{product.rate_avg}</span>
                                    </div>

                                    <div className="mt-2 flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm font-bold text-red-600">{product.discount_price ?? product.price}</span>
                                            <span className="text-xs text-slate-400">{product.currency}</span>
                                            {product.has_discount && (
                                                <span className="text-xs text-slate-400 line-through">{product.price}</span>
                                            )}
                                        </div>
                                        <button onClick={(e) => e.preventDefault()}
                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors">
                                            <ShoppingCart size={14} />
                                        </button>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {lastPage > 1 && (
                            <div className="mt-8 flex justify-center gap-2">
                                <Button variant="outline" disabled={page === 1} onClick={() => setPage(p => p - 1)} className="rounded-full">{t('products.previous')}</Button>
                                <span className="flex items-center px-4 text-sm text-slate-600">{page} / {lastPage}</span>
                                <Button variant="outline" disabled={page === lastPage} onClick={() => setPage(p => p + 1)} className="rounded-full">{t('products.next')}</Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}