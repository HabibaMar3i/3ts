import type { Product } from '../components/products/types'

export const initialVendorProducts: Product[] = [
    {
        id: 101,
        name: 'سيارة ديناصور ذكية',
        category: 'سيارات',
        price: 299.99,
        rating: 4.8,
        image: 'https://hedeya.com/cdn/shop/files/1369828362.jpg?v=1764573580&width=360?w=800&h=800&fit=crop',
        description: 'لعبة قيادة تفاعلية مع مشاهد ديناصورية مثيرة',
        badge: 'مفضل',
    },
    {
        id: 102,
        name: 'مجموعة مكعبات بناء 500 قطعة',
        category: 'بناء',
        price: 149.99,
        rating: 4.6,
        image: 'https://hedeya.com/cdn/shop/files/204248__52346.1539243281.jpg?w=800&h=800&fit=crop',
        description: 'مجموعة إبداعية لبناء أشكال مختلفة.',
    },
    {
        id: 103,
        name: 'لعبة روبوت تفاعلي',
        category: 'إلكترونيات',
        price: 399.99,
        rating: 4.5,
        image: 'https://hedeya.com/cdn/shop/files/899823e017748b7f35a06581e6cb0962.jpg?w=800&h=800&fit=crop',
        description: 'روبوت ذكي يتفاعل مع الأطفال بطريقة ممتعة.',
    },
]
