import { DashboardPage } from '../../components/dashboard/DashboardPage'
import { DataTable } from '../../components/dashboard/DataTable'
import { SubscriptionPlans } from '../../components/vendor/SubscriptionPlans'
import { getPaymentColumns } from '../../components/dashboard/tables/paymentColumns'
import { initialVendorPayments } from '../../data/vendor/payments'
import { currentPlanId, vendorPlans } from '../../data/vendor/subscription'

export default function VendorSubscription() {
    const billingHistory = initialVendorPayments.filter((p) => p.description.includes('اشتراك'))

    return (
        <DashboardPage
            title="الاشتراك"
            description="إدارة خطتك الحالية وترقية حسابك."
        >
            <SubscriptionPlans plans={vendorPlans} currentPlanId={currentPlanId} />

            <div className="mt-10">
                <h2 className="mb-4 text-lg font-bold text-slate-950">سجل الفواتير</h2>
                <DataTable
                    data={billingHistory.length > 0 ? billingHistory : initialVendorPayments.slice(0, 2)}
                    columns={getPaymentColumns()}
                    getRowKey={(row) => row.id}
                    emptyMessage="لا توجد فواتير."
                />
            </div>
        </DashboardPage>
    )
}
