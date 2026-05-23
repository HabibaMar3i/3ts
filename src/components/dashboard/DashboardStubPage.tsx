import { DashboardPageHeader } from './DashboardPageHeader'
import { Card, CardContent } from '../ui/card'

interface DashboardStubPageProps {
    title: string
    description?: string
}

export function DashboardStubPage({ title, description }: DashboardStubPageProps) {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <DashboardPageHeader title={title} description={description} />
            <Card className="border-slate-200">
                <CardContent className="p-8 text-center text-sm text-slate-600">
                    هذه الصفحة قيد التطوير.
                </CardContent>
            </Card>
        </div>
    )
}
