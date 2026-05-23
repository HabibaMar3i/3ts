import type { ReactNode } from 'react'
import { Separator } from '../ui/separator'

interface DashboardPageHeaderProps {
    title: string
    description?: string
    action?: ReactNode
}

export function DashboardPageHeader({ title, description, action }: DashboardPageHeaderProps) {
    return (
        <div className="mb-8 space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                    {description ? (
                        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                    ) : null}
                </div>
                {action ? <div className="shrink-0">{action}</div> : null}
            </div>
            <Separator />
        </div>
    )
}
