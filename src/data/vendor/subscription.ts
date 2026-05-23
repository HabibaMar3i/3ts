import type { VendorSubscriptionPlan } from '../../types/vendor'

export const vendorPlans: VendorSubscriptionPlan[] = [
    {
        id: 'basic',
        name: 'أساسي',
        price: 199,
        period: 'شهرياً',
        features: ['حتى 10 منتجات', 'دعم عبر البريد', 'تقارير أساسية'],
    },
    {
        id: 'pro',
        name: 'احترافي',
        price: 499,
        period: 'شهرياً',
        features: ['حتى 50 منتج', 'إعلانات مميزة', 'دعم أولوية', 'تقارير متقدمة'],
        recommended: true,
    },
    {
        id: 'enterprise',
        name: 'مؤسسات',
        price: 999,
        period: 'شهرياً',
        features: ['منتجات غير محدودة', 'مدير حساب', 'إعلانات غير محدودة', 'API'],
    },
]

export const currentPlanId = 'pro'
