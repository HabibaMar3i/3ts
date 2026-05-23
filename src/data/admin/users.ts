import type { AdminUser } from '../../types/admin'

export const initialAdminUsers: AdminUser[] = [
    {
        id: 1,
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        role: 'customer',
        status: 'active',
        joinedAt: '2026-01-15',
    },
    {
        id: 2,
        name: 'سارة علي',
        email: 'sara@example.com',
        role: 'vendor',
        status: 'active',
        joinedAt: '2026-02-20',
    },
    {
        id: 3,
        name: 'محمود حسن',
        email: 'mahmoud@example.com',
        role: 'admin',
        status: 'active',
        joinedAt: '2025-11-10',
    },
    {
        id: 4,
        name: 'نور إبراهيم',
        email: 'nour@example.com',
        role: 'customer',
        status: 'blocked',
        joinedAt: '2026-03-05',
    },
]
