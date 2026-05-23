import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Store, X } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '#lib/utils'
import type { DashboardNavItem } from '../../config/dashboardNav'

interface DashboardSidebarProps {
    title: string
    subtitle: string
    homePath: string
    navItems: DashboardNavItem[]
}

export function DashboardSidebar({ title, subtitle, homePath, navItems }: DashboardSidebarProps) {
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <>
            <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
                <div>
                    <p className="text-sm font-bold text-slate-950">{title}</p>
                    <p className="text-xs text-slate-500">{subtitle}</p>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setMobileOpen(true)}
                    aria-label="فتح القائمة"
                >
                    <Menu size={18} />
                </Button>
            </div>

            {mobileOpen ? (
                <button
                    type="button"
                    className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                    aria-label="إغلاق القائمة"
                />
            ) : null}

            <aside
                className={cn(
                    'fixed inset-y-0 right-0 z-50 flex w-64 flex-col border-l border-slate-200 bg-white transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0',
                    mobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
                )}
            >
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
                    <Link to={homePath} className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/10 text-red-600">
                            <Store size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-950">{title}</p>
                            <p className="text-xs text-slate-500">{subtitle}</p>
                        </div>
                    </Link>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setMobileOpen(false)}
                        aria-label="إغلاق القائمة"
                    >
                        <X size={18} />
                    </Button>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto p-3">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) =>
                                cn(
                                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-red-600 text-white shadow-sm shadow-red-600/20'
                                        : 'text-slate-600 hover:bg-red-50 hover:text-red-700'
                                )
                            }
                        >
                            <item.icon size={18} />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="border-t border-slate-100 p-4">
                    <Link
                        to="/"
                        className="flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-red-600 hover:text-red-600"
                        onClick={() => setMobileOpen(false)}
                    >
                        العودة للمتجر
                    </Link>
                </div>
            </aside>
        </>
    )
}
