import { DashboardPage } from '../../components/dashboard/DashboardPage'
import { DashboardStatCards } from '../../components/dashboard/DashboardStatCards'
import { DataTable } from '../../components/dashboard/DataTable'
import { getPaymentColumns } from '../../components/vendor/tables/paymentColumns'
import { adPayments } from '../../data/vendor/payments'
import { formatPrice } from '../../lib/format'

export default function VendorAdsPayment() {
    const paidTotal = adPayments
        .filter((p) => p.status === 'paid')
        .reduce((sum, p) => sum + p.amount, 0)

    return (
        <DashboardPage
            title="دفع الإعلانات"
            description="سجل مدفوعات حملاتك الإعلانية."
        >
            <DashboardStatCards
                columns={3}
                stats={[
                    { label: 'إجمالي المدفوع', value: formatPrice(paidTotal) },
                    { label: 'عدد العمليات', value: String(adPayments.length) },
                    {
                        label: 'فشل الدفع',
                        value: String(adPayments.filter((p) => p.status === 'failed').length),
                    },
                ]}
            />

            <div className="mt-8">
                <DataTable
                    data={adPayments}
                    columns={getPaymentColumns()}
                    getRowKey={(row) => row.id}
                    emptyMessage="لا توجد مدفوعات إعلانات."
                />
            </div>
        </DashboardPage>
    )
}
