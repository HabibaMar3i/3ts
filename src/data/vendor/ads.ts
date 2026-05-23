import type { VendorAd } from '../../types/vendor'

export const initialVendorAds: VendorAd[] = [
    {
        id: 1,
        title: 'عرض الصيف على السيارات',
        placement: 'الصفحة الرئيسية',
        budget: 1500,
        status: 'active',
        startDate: '2026-05-01',
        endDate: '2026-06-30',
        impressions: 12400,
    },
    {
        id: 2,
        title: 'إعلان مكعبات البناء',
        placement: 'صفحة المنتجات',
        budget: 800,
        status: 'paused',
        startDate: '2026-04-10',
        endDate: '2026-05-10',
        impressions: 5200,
    },
    {
        id: 3,
        title: 'روبوت تفاعلي - إطلاق جديد',
        placement: 'شريط علوي',
        budget: 2200,
        status: 'pending',
        startDate: '2026-06-01',
        endDate: '2026-07-15',
        impressions: 0,
    },
]
