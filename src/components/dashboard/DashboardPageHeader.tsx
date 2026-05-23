import type { ReactNode } from 'react'

interface DashboardPageHeaderProps {
    title: string
    description?: string
    action?: ReactNode
}

export function DashboardPageHeader({ title, description, action }: DashboardPageHeaderProps) {
    return (
        <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold text-slate-950">{title}</h1>
                {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
            </div>
            {action ? <div className="shrink-0">{action}</div> : null}
        </div>
    )
}
