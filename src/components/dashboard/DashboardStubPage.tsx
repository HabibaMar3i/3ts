import { Info } from 'lucide-react'
import { DashboardPage } from './DashboardPage'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'

interface DashboardStubPageProps {
    title: string
    description?: string
}

export function DashboardStubPage({ title, description }: DashboardStubPageProps) {
    return (
        <DashboardPage title={title} description={description}>
            <Alert>
                <Info className="size-4" />
                <AlertTitle>قيد التطوير</AlertTitle>
                <AlertDescription>هذه الصفحة قيد التطوير.</AlertDescription>
            </Alert>
        </DashboardPage>
    )
}
