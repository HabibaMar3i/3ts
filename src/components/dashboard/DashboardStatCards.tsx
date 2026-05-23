import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import type { StatCardItem } from './types'

export type { StatCardItem }

interface DashboardStatCardsProps {
    stats: StatCardItem[]
    columns?: 2 | 3 | 4
}

export function DashboardStatCards({ stats, columns = 3 }: DashboardStatCardsProps) {
    const gridClass =
        columns === 4
            ? 'sm:grid-cols-2 xl:grid-cols-4'
            : columns === 2
              ? 'sm:grid-cols-2'
              : 'sm:grid-cols-2 xl:grid-cols-3'

    return (
        <div className={`grid gap-4 ${gridClass}`}>
            {stats.map((stat) => (
                <Card key={stat.label} size="sm">
                    <CardHeader>
                        <CardDescription>{stat.label}</CardDescription>
                        <CardTitle className="text-3xl text-primary">{stat.value}</CardTitle>
                    </CardHeader>
                </Card>
            ))}
        </div>
    )
}
