import { Link } from 'react-router-dom'
import { DashboardPage } from '../../components/dashboard/DashboardPage'
import { DashboardSection } from '../../components/dashboard/DashboardSection'
import { DashboardStatCards } from '../../components/dashboard/DashboardStatCards'
import { DataTable } from '../../components/dashboard/DataTable'
import { getOrderColumns } from '../../components/dashboard/tables/orderColumns'
import { getPaymentColumns } from '../../components/dashboard/tables/paymentColumns'
import { initialVendorAds } from '../../data/vendor/ads'
import { initialVendorOrders } from '../../data/vendor/orders'
import { initialVendorPayments } from '../../data/vendor/payments'
import { initialVendorProducts } from '../../data/vendorProducts'
import { formatPrice } from '../../lib/format'
import { Button } from '../../components/ui/button'

export default function VendorDashboard() {
    const revenue = initialVendorOrders.reduce((sum, order) => sum + order.amount, 0)
    const recentOrders = initialVendorOrders.slice(0, 4)
    const recentPayments = initialVendorPayments.slice(0, 3)

    return (
        <DashboardPage
            title="لوحة البائع"
            description="نظرة عامة على نشاط متجرك."
            action={
                <Button asChild>
                    <Link to="/vendor/products">إدارة المنتجات</Link>
                </Button>
            }
        >
            <DashboardStatCards
                columns={4}
                stats={[
                    { label: 'المنتجات', value: String(initialVendorProducts.length) },
                    { label: 'الإعلانات النشطة', value: String(initialVendorAds.filter((a) => a.status === 'active').length) },
                    { label: 'الطلبات', value: String(initialVendorOrders.length) },
                    { label: 'الإيرادات', value: formatPrice(revenue) },
                ]}
            />

            <div className="mt-10 grid gap-10">
                <DashboardSection title="أحدث الطلبات">
                    <DataTable
                        data={recentOrders}
                        columns={getOrderColumns()}
                        getRowKey={(row) => row.id}
                        emptyMessage="لا توجد طلبات."
                        minWidth="800px"
                    />
                </DashboardSection>

                <DashboardSection title="آخر المدفوعات">
                    <DataTable
                        data={recentPayments}
                        columns={getPaymentColumns()}
                        getRowKey={(row) => row.id}
                        emptyMessage="لا توجد مدفوعات."
                    />
                </DashboardSection>
            </div>
        </DashboardPage>
    )
}
