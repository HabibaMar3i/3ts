import { cn } from '#lib/utils'
import { Card } from '../ui/card'

export interface OrderTabItem<T extends string> {
    value: T
    label: string
}

interface OrderTabsProps<T extends string> {
    tabs: OrderTabItem<T>[]
    activeTab: T
    onTabChange: (value: T) => void
}

export function OrderTabs<T extends string>({ tabs, activeTab, onTabChange }: OrderTabsProps<T>) {
    return (
        <Card className="mb-6 border-slate-200 bg-white p-2">
            <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => {
                    const isActive = tab.value === activeTab
                    return (
                        <button
                            key={tab.value}
                            type="button"
                            onClick={() => onTabChange(tab.value)}
                            className={cn(
                                'rounded-full border px-5 py-2 text-sm font-semibold transition-all',
                                isActive
                                    ? 'border-red-400 bg-red-50 text-red-700'
                                    : 'border-slate-200 bg-white text-slate-600 hover:border-red-200 hover:text-red-600'
                            )}
                        >
                            {tab.label}
                        </button>
                    )
                })}
            </div>
        </Card>
    )
}
