import { DashboardPageHeader } from '../../components/dashboard/DashboardPageHeader'
import { Card, CardContent } from '../../components/ui/card'

export default function VendorDashboard() {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <DashboardPageHeader
                title="لوحة البائع"
                description="تابع مبيعاتك ومنتجاتك من مكان واحد."
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[
                    { label: 'منتجاتي', value: '3' },
                    { label: 'الطلبات', value: '24' },
                    { label: 'الإيرادات', value: '12,450 ج.م' },
                ].map((stat) => (
                    <Card key={stat.label} className="border-slate-200">
                        <CardContent className="p-6">
                            <p className="text-sm text-slate-600">{stat.label}</p>
                            <p className="mt-2 text-3xl font-bold text-red-600">{stat.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
