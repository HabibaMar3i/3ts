import { Link } from 'react-router-dom'
import { DashboardPage } from '../../components/dashboard/DashboardPage'
import { DashboardSection } from '../../components/dashboard/DashboardSection'
import { DashboardStatCards } from '../../components/dashboard/DashboardStatCards'
import { DataTable } from '../../components/dashboard/DataTable'
import { getOrderColumns } from '../../components/dashboard/tables/orderColumns'
import { getUserColumns } from '../../components/dashboard/tables/userColumns'
import { initialAdminUsers } from '../../data/admin/users'
import { initialAdminVendors } from '../../data/admin/vendors'
import { initialAdminFeedback } from '../../data/admin/feedback'
import { products } from '../../data/products'
import { initialVendorOrders } from '../../data/vendor/orders'
import { formatPrice } from '../../lib/format'
import { Button } from '../../components/ui/button'

export default function AdminDashboard() {
    const revenue = initialVendorOrders.reduce((sum, order) => sum + order.amount, 0)
    const newFeedback = initialAdminFeedback.filter((item) => item.status === 'new').length

    return (
        <DashboardPage
            title="لوحة التحكم"
            description="نظرة عامة على نشاط المتجر."
            action={
                <Button asChild>
                    <Link to="/admin/orders">عرض الطلبات</Link>
                </Button>
            }
        >
            <DashboardStatCards
                columns={4}
                stats={[
                    { label: 'الطلبات', value: String(initialVendorOrders.length) },
                    { label: 'المنتجات', value: String(products.length) },
                    { label: 'البائعون', value: String(initialAdminVendors.length) },
                    { label: 'الإيرادات', value: formatPrice(revenue) },
                ]}
            />

            <div className="mt-10 grid gap-10">
                <DashboardSection title="أحدث الطلبات">
                    <DataTable
                        data={initialVendorOrders.slice(0, 4)}
                        columns={getOrderColumns()}
                        getRowKey={(row) => row.id}
                        emptyMessage="لا توجد طلبات."
                        minWidth="800px"
                    />
                </DashboardSection>

                <DashboardSection title={`مستخدمون جدد · ${newFeedback} تعليقات جديدة`}>
                    <DataTable
                        data={initialAdminUsers.slice(0, 4)}
                        columns={getUserColumns()}
                        getRowKey={(row) => row.id}
                        emptyMessage="لا يوجد مستخدمون."
                    />
                </DashboardSection>
            </div>
        </DashboardPage>
    )
}
