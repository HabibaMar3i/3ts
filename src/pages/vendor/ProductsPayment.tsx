import { DashboardPage } from '../../components/dashboard/DashboardPage'
import { DashboardStatCards } from '../../components/dashboard/DashboardStatCards'
import { DataTable } from '../../components/dashboard/DataTable'
import { getPaymentColumns } from '../../components/dashboard/tables/paymentColumns'
import { productPayments } from '../../data/vendor/payments'
import { formatPrice } from '../../lib/format'

export default function VendorProductsPayment() {
    const paidTotal = productPayments
        .filter((p) => p.status === 'paid')
        .reduce((sum, p) => sum + p.amount, 0)

    return (
        <DashboardPage
            title="دفع المنتجات"
            description="سجل مدفوعات رسوم المنتجات والاشتراكات."
        >
            <DashboardStatCards
                columns={3}
                stats={[
                    { label: 'إجمالي المدفوع', value: formatPrice(paidTotal) },
                    { label: 'عدد العمليات', value: String(productPayments.length) },
                    {
                        label: 'قيد الانتظار',
                        value: String(productPayments.filter((p) => p.status === 'pending').length),
                    },
                ]}
            />

            <div className="mt-8">
                <DataTable
                    data={productPayments}
                    columns={getPaymentColumns()}
                    getRowKey={(row) => row.id}
                    emptyMessage="لا توجد مدفوعات منتجات."
                />
            </div>
        </DashboardPage>
    )
}
