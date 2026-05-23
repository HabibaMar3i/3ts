import type { VendorOrder } from '../../types/vendor'

export const initialVendorOrders: VendorOrder[] = [
    {
        id: 1001,
        customer: 'أحمد محمد',
        product: 'سيارة ديناصور ذكية',
        amount: 299.99,
        status: 'delivered',
        date: '2026-05-20',
    },
    {
        id: 1002,
        customer: 'سارة علي',
        product: 'مجموعة مكعبات بناء',
        amount: 149.99,
        status: 'shipped',
        date: '2026-05-21',
    },
    {
        id: 1003,
        customer: 'محمود حسن',
        product: 'لعبة روبوت تفاعلي',
        amount: 399.99,
        status: 'pending',
        date: '2026-05-22',
    },
    {
        id: 1004,
        customer: 'نور إبراهيم',
        product: 'سيارة ديناصور ذكية',
        amount: 299.99,
        status: 'pending',
        date: '2026-05-23',
    },
]
