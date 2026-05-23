import { DashboardPage } from '../../components/dashboard/DashboardPage'
import { DashboardStatCards } from '../../components/dashboard/DashboardStatCards'

export default function AdminDashboard() {
    return (
        <DashboardPage title="لوحة التحكم" description="نظرة عامة على نشاط المتجر.">
            <DashboardStatCards
                columns={4}
                stats={[
                    { label: 'الطلبات', value: '128' },
                    { label: 'المنتجات', value: '56' },
                    { label: 'البائعون', value: '12' },
                    { label: 'المستخدمون', value: '840' },
                ]}
            />
        </DashboardPage>
    )
}
