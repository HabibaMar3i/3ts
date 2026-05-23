import type { AdminVendor } from '../../types/admin'

export const initialAdminVendors: AdminVendor[] = [
    {
        id: 1,
        storeName: 'متجر الألعاب الذكية',
        owner: 'سارة علي',
        email: 'sara@example.com',
        productsCount: 24,
        status: 'active',
    },
    {
        id: 2,
        storeName: 'عالم الطفل',
        owner: 'خالد يوسف',
        email: 'khaled@example.com',
        productsCount: 18,
        status: 'active',
    },
    {
        id: 3,
        storeName: 'متجر المرح',
        owner: 'ليلى أحمد',
        email: 'layla@example.com',
        productsCount: 6,
        status: 'pending',
    },
]
