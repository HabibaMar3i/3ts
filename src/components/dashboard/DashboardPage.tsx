import type { ReactNode } from 'react'
import { DashboardPageHeader } from './DashboardPageHeader'

interface DashboardPageProps {
    title: string
    description?: string
    action?: ReactNode
    children: ReactNode
}

export function DashboardPage({ title, description, action, children }: DashboardPageProps) {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <DashboardPageHeader title={title} description={description} action={action} />
            {children}
        </div>
    )
}
