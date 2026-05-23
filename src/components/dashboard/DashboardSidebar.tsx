import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, Store } from 'lucide-react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '../ui/sheet'
import { cn } from '#lib/utils'
import type { DashboardNavItem } from '../../config/dashboardNav'

interface DashboardSidebarProps {
    title: string
    subtitle: string
    homePath: string
    navItems: DashboardNavItem[]
}

function SidebarNav({
    homePath,
    navItems,
    title,
    subtitle,
    onNavigate,
}: DashboardSidebarProps & { onNavigate?: () => void }) {
    const { t } = useTranslation()

    return (
        <>
            <div className="p-4">
                <Link to={homePath} className="flex items-center gap-3" onClick={onNavigate}>
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Store size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-bold">{title}</p>
                        <p className="text-xs text-muted-foreground">{subtitle}</p>
                    </div>
                </Link>
            </div>

            <Separator />

            <nav className="flex-1 space-y-1 overflow-y-auto p-3">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.end}
                        onClick={onNavigate}
                        className={({ isActive }) =>
                            cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                            )
                        }
                    >
                        <item.icon size={18} />
                        {t(item.labelKey)}
                    </NavLink>
                ))}
            </nav>

            <Separator />

            <div className="p-4">
                <Button variant="outline" className="w-full" asChild onClick={onNavigate}>
                    <Link to="/">{t('common.backToStore')}</Link>
                </Button>
            </div>
        </>
    )
}

export function DashboardSidebar(props: DashboardSidebarProps) {
    const { t } = useTranslation()
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <>
            <div className="flex items-center justify-between border-b p-4 lg:hidden">
                <div>
                    <p className="text-sm font-bold">{props.title}</p>
                    <p className="text-xs text-muted-foreground">{props.subtitle}</p>
                </div>
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" aria-label={t('common.openMenu')}>
                            <Menu size={18} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="flex w-64 flex-col gap-0 p-0">
                        <SheetHeader className="sr-only">
                            <SheetTitle>{props.title}</SheetTitle>
                        </SheetHeader>
                        <SidebarNav {...props} onNavigate={() => setMobileOpen(false)} />
                    </SheetContent>
                </Sheet>
            </div>

            <aside className="hidden w-64 shrink-0 flex-col border-s border-border bg-card lg:flex">
                <SidebarNav {...props} />
            </aside>
        </>
    )
}
