import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHome } from '../hooks/useHome'
import { ChevronLeft, ChevronRight, Star, Heart } from 'lucide-react'

export default function Home() {
    const { sliders, categories, latestProducts, isLoading } = useHome()
    const [currentSlide, setCurrentSlide] = useState(0)

    const prevSlide = () => setCurrentSlide((p) => (p === 0 ? sliders.length - 1 : p - 1))
    const nextSlide = () => setCurrentSlide((p) => (p === sliders.length - 1 ? 0 : p + 1))

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Slider */}
            {sliders.length > 0 && (
                <section className="relative overflow-hidden bg-slate-900">
                    <div className="relative h-64 sm:h-80 lg:h-[420px]">
                        <img
                            src={sliders[currentSlide]?.image}
                            alt={sliders[currentSlide]?.title}
                            className="h-full w-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

                        {/* Text */}
                        <div className="absolute bottom-8 start-8 max-w-lg">
                            <h2 className="text-2xl font-bold text-white sm:text-3xl">
                                {sliders[currentSlide]?.title}
                            </h2>
                            <p className="mt-2 text-sm text-slate-300">
                                {sliders[currentSlide]?.description}
                            </p>
                        </div>

                        {/* Arrows */}
                        {sliders.length > 1 && (
                            <>
                                <button onClick={prevSlide}
                                    className="absolute start-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/40 transition-all">
                                    <ChevronLeft size={20} />
                                </button>
                                <button onClick={nextSlide}
                                    className="absolute end-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/40 transition-all">
                                    <ChevronRight size={20} />
                                </button>
                            </>
                        )}

                        {/* Dots */}
                        <div className="absolute bottom-3 start-1/2 -translate-x-1/2 flex gap-1.5">
                            {sliders.map((_, i) => (
                                <button key={i} onClick={() => setCurrentSlide(i)}
                                    className={`h-1.5 rounded-full transition-all ${i === currentSlide ? 'w-6 bg-red-500' : 'w-1.5 bg-white/50'}`} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">

                {/* Categories */}
                {categories.length > 0 && (
                    <section>
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900">الأقسام</h2>
                            <Link to="/products" className="text-sm font-semibold text-red-600 hover:text-red-700">
                                عرض الكل
                            </Link>
                        </div>
                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                            {categories.map((cat) => (
                                <Link key={cat.id} to={`/products?category=${cat.id}`}
                                    className="group flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-center transition-all hover:border-red-300 hover:shadow-md">
                                    <div className="h-14 w-14 overflow-hidden rounded-full bg-slate-100">
                                        <img src={cat.image} alt={cat.name}
                                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.png' }}
                                        />
                                    </div>
                                    <p className="text-xs font-semibold text-slate-700 group-hover:text-red-600 line-clamp-2">
                                        {cat.name}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Latest Products */}
                {latestProducts.length > 0 && (
                    <section>
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900">أحدث المنتجات</h2>
                            <Link to="/products" className="text-sm font-semibold text-red-600 hover:text-red-700">
                                عرض الكل
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                            {latestProducts.map((product) => (
                                <Link key={product.id} to={`/product/${product.id}`}
                                    className="group relative rounded-2xl border border-slate-200 bg-white p-3 transition-all hover:border-red-300 hover:shadow-md">

                                    {/* Favorite */}
                                    <button onClick={(e) => e.preventDefault()}
                                        className="absolute end-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-red-500 transition-colors">
                                        <Heart size={15} className={product.is_favorite ? 'fill-red-500 text-red-500' : ''} />
                                    </button>

                                    {/* Image */}
                                    <div className="mb-3 h-36 overflow-hidden rounded-xl bg-slate-100">
                                        <img src={product.image} alt={product.title}
                                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.png' }}
                                        />
                                    </div>

                                    {/* Discount badge */}
                                    {product.has_discount && (
                                        <span className="mb-1 inline-block rounded-full bg-red-50 px-2 py-0.5 text-xs font-bold text-red-600">
                                            خصم
                                        </span>
                                    )}

                                    {/* Title */}
                                    <p className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug">
                                        {product.title}
                                    </p>

                                    {/* Rating */}
                                    <div className="mt-1 flex items-center gap-1">
                                        <Star size={12} className="fill-amber-400 text-amber-400" />
                                        <span className="text-xs text-slate-500">{product.rate_avg}</span>
                                    </div>

                                    {/* Price */}
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="text-sm font-bold text-red-600">
                                            {product.discount_price ?? product.price} {product.currency}
                                        </span>
                                        {product.has_discount && (
                                            <span className="text-xs text-slate-400 line-through">
                                                {product.price} {product.currency}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}