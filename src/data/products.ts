import type { Product } from '../components/products/types'

export const products: Product[] = [
    {
        id: 1,
        name: 'سيارة ديناصور ذكية',
        category: 'سيارات',
        price: 299.99,
        rating: 4.8,
        image: 'https://hedeya.com/cdn/shop/files/1369828362.jpg?v=1764573580&width=360?w=800&h=800&fit=crop',
        description: 'لعبة قيادة تفاعلية مع مشاهد ديناصورية مثيرة',
        badge: 'مفضل',
    },
    {
        id: 2,
        name: 'مجموعة مكعبات بناء 500 قطعة',
        category: 'بناء',
        price: 149.99,
        rating: 4.6,
        image: 'https://hedeya.com/cdn/shop/files/204248__52346.1539243281.jpg?w=800&h=800&fit=crop',
        description: 'مجموعة إبداعية لبناء أشكال مختلفة.',
    },
    {
        id: 3,
        name: 'دراجة هوائية للأطفال',
        category: 'رياضة',
        price: 499.99,
        rating: 4.7,
        image: 'https://hedeya.com/cdn/shop/files/5c48884e7a336.jpg?w=800&h=800&fit=crop',
        description: 'دراجة آمنة وممتعة للنشاط الخارجي.',
    },
    {
        id: 4,
        name: 'لعبة روبوت تفاعلي',
        category: 'إلكترونيات',
        price: 399.99,
        rating: 4.5,
        image: 'https://hedeya.com/cdn/shop/files/899823e017748b7f35a06581e6cb0962.jpg?w=800&h=800&fit=crop',
        description: 'روبوت ذكي يتفاعل مع الأطفال بطريقة ممتعة.',
    },
    {
        id: 5,
        name: 'لعبة لوحية تعليمية',
        category: 'تعليم',
        price: 219.99,
        rating: 4.9,
        image: 'https://hedeya.com/cdn/shop/files/000674-2-big-1019x1140_1.jpg??w=800&h=800&fit=crop',
        description: 'لعبة تعلم التفكير الاستراتيجي بأسلوب ممتع.',
        badge: 'جديد',
    },
]

export function getProductById(id: number): Product | undefined {
    return products.find((product) => product.id === id)
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
    return products
        .filter((item) => item.id !== product.id && item.category === product.category)
        .slice(0, limit)
}

export { formatPrice } from '../lib/format'
