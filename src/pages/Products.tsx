import { useMemo, useState } from 'react'
import { ProductCard } from '../components/products/ProductCard'
import { ProductFilters } from '../components/products/ProductFilters'
import { ProductsHeader } from '../components/products/ProductsHeader'
import { products } from '../data/products'

export default function Products() {
    const [selectedCategory, setSelectedCategory] = useState('جميع المنتجات')
    const [searchTerm, setSearchTerm] = useState('')

    const categories = useMemo(
        () => ['جميع المنتجات', ...Array.from(new Set(products.map((product) => product.category)))],
        []
    )

    const filteredProducts = useMemo(
        () => {
            const categoryFiltered =
                selectedCategory === 'جميع المنتجات'
                    ? products
                    : products.filter((product) => product.category === selectedCategory)

            return categoryFiltered.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.description ?? '').toLowerCase().includes(searchTerm.toLowerCase())
            )
        },
        [selectedCategory, searchTerm]
    )

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <ProductsHeader itemCount={filteredProducts.length} />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
                <ProductFilters
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}
