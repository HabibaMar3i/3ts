import { DashboardPageHeader } from '../../components/dashboard/DashboardPageHeader'
import { Card, CardContent } from '../../components/ui/card'

export default function AdminDashboard() {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <DashboardPageHeader
                title="لوحة التحكم"
                description="نظرة عامة على نشاط المتجر."
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                    { label: 'الطلبات', value: '128' },
                    { label: 'المنتجات', value: '56' },
                    { label: 'البائعون', value: '12' },
                    { label: 'المستخدمون', value: '840' },
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
