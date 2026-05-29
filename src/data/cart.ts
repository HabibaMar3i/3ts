import type { CartItem } from '../components/cart/types'

export const cartItems: CartItem[] = [
    {
        id: 1,
        name: 'سيارة ديناصور ذكية',
        price: 299.99,
        quantity: 2,
        image: 'https://hedeya.com/cdn/shop/files/51ipoogjgpl-photoroom_1.jpg?v=1764661945&width=360?w=400&h=400&fit=crop',
        category: 'سيارات',
    },
    {
        id: 2,
        name: 'مجموعة مكعبات بناء 500 قطعة',
        price: 149.99,
        quantity: 1,
        image: 'https://hedeya.com/cdn/shop/files/61cueyvkz0l._ac_sl1500.jpg?v=1764652370&width=360?w=400&h=400&fit=crop',
        category: 'بناء',
    },
    {
        id: 3,
        name: 'دراجة هوائية للأطفال',
        price: 499.99,
        quantity: 1,
        image: 'https://hedeya.com/cdn/shop/files/588da_multi_blocks_92_parca.jpg?v=1764651688&width=360?w=400&h=400&fit=crop',
        category: 'رياضة',
    },
    {
        id: 4,
        name: 'لعبة روبوت تفاعلي',
        price: 399.99,
        quantity: 1,
        image: 'https://hedeya.com/cdn/shop/files/7233886dfcaf6e8485cd0dc5320eb8f2dc32a6f7.jpg?v=1764570447&width=360?w=400&h=400&fit=crop',
        category: 'إلكترونيات',
    },
]

export function getCartSubtotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function getCartItemCount(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.quantity, 0)
}
