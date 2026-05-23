import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface ProductFiltersProps {
    categories: string[]
    selectedCategory: string
    onCategoryChange: (category: string) => void
    searchTerm: string
    onSearchChange: (value: string) => void
}

export function ProductFilters({ categories, selectedCategory, onCategoryChange, searchTerm, onSearchChange }: ProductFiltersProps) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-lg font-bold text-slate-950">فلتر المنتجات</h2>
                    <p className="text-sm text-slate-500">اختَر الفئة المناسبة أو ابحث على حسب الاسم.</p>
                </div>
                <Input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="ابحث عن منتج"
                    className="max-w-sm rounded-full"
                />
            </div>

            <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                    const active = category === selectedCategory
                    return (
                        <Button
                            key={category}
                            type="button"
                            size="sm"
                            variant={active ? 'default' : 'outline'}
                            className="rounded-full px-4 py-2 text-sm font-semibold"
                            onClick={() => onCategoryChange(category)}
                        >
                            {category}
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}
