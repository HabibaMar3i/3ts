import type { LucideIcon } from 'lucide-react'
import { Card } from '../ui/card'

interface OrdersHeaderProps {
    icon: LucideIcon
    title: string
    description: string
}

export function OrdersHeader({ icon: Icon, title, description }: OrdersHeaderProps) {
    return (
        <Card className="rounded-none border-b border-slate-100 bg-linear-to-b from-white to-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-4 flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-600/10">
                        <Icon size={24} className="text-red-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-950">{title}</h1>
                </div>
                <p className="text-slate-600">{description}</p>
            </div>
        </Card>
    )
}
