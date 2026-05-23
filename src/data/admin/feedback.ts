import type { AdminFeedback } from '../../types/admin'

export const initialAdminFeedback: AdminFeedback[] = [
    {
        id: 1,
        user: 'أحمد محمد',
        rating: 5,
        comment: 'تجربة شراء ممتازة وتوصيل سريع.',
        date: '2026-05-20',
        status: 'reviewed',
    },
    {
        id: 2,
        user: 'منى سعيد',
        rating: 4,
        comment: 'منتجات رائعة لكن الشحن تأخر يوماً.',
        date: '2026-05-21',
        status: 'new',
    },
    {
        id: 3,
        user: 'ياسر كامل',
        rating: 5,
        comment: 'ألعاب أصلية وجودة عالية.',
        date: '2026-05-22',
        status: 'new',
    },
]
