import type { VendorPayment } from '../../types/vendor'

export const initialVendorPayments: VendorPayment[] = [
    {
        id: 1,
        reference: 'PAY-240501',
        description: 'رسوم إدراج منتجات - مايو',
        amount: 350,
        date: '2026-05-01',
        status: 'paid',
        method: 'بطاقة ائتمان',
        type: 'products',
    },
    {
        id: 2,
        reference: 'PAY-240515',
        description: 'حملة إعلان الصيف',
        amount: 1500,
        date: '2026-05-15',
        status: 'paid',
        method: 'محفظة إلكترونية',
        type: 'ads',
    },
    {
        id: 3,
        reference: 'PAY-240520',
        description: 'تجديد اشتراك البائع',
        amount: 499,
        date: '2026-05-20',
        status: 'pending',
        method: 'بطاقة ائتمان',
        type: 'products',
    },
    {
        id: 4,
        reference: 'PAY-240522',
        description: 'إعلان مكعبات البناء',
        amount: 800,
        date: '2026-05-22',
        status: 'failed',
        method: 'بطاقة ائتمان',
        type: 'ads',
    },
]

export const productPayments = initialVendorPayments.filter((p) => p.type === 'products')
export const adPayments = initialVendorPayments.filter((p) => p.type === 'ads')
