import {
    CreditCard,
    LayoutDashboard,
    Megaphone,
    MessageSquare,
    Package,
    ShoppingBag,
    Store,
    Users,
    FileText,
    Wallet,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface DashboardNavItem {
    labelKey: string
    path: string
    icon: LucideIcon
    end?: boolean
}

export const adminNavItems: DashboardNavItem[] = [
    { labelKey: 'dashboard.admin.dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { labelKey: 'dashboard.admin.products', path: '/admin/products', icon: Package },
    { labelKey: 'dashboard.admin.orders', path: '/admin/orders', icon: ShoppingBag },
    { labelKey: 'dashboard.admin.users', path: '/admin/users', icon: Users },
    { labelKey: 'dashboard.admin.vendors', path: '/admin/vendors', icon: Store },
    { labelKey: 'dashboard.admin.ads', path: '/admin/ads', icon: Megaphone },
    { labelKey: 'dashboard.admin.blogs', path: '/admin/blogs', icon: FileText },
    { labelKey: 'dashboard.admin.feedback', path: '/admin/feedback', icon: MessageSquare },
]

export const vendorNavItems: DashboardNavItem[] = [
    { labelKey: 'dashboard.vendor.dashboard', path: '/vendor', icon: LayoutDashboard, end: true },
    { labelKey: 'dashboard.vendor.products', path: '/vendor/products', icon: Package },
    { labelKey: 'dashboard.vendor.ads', path: '/vendor/ads', icon: Megaphone },
    { labelKey: 'dashboard.vendor.subscription', path: '/vendor/subscription', icon: CreditCard },
    { labelKey: 'dashboard.vendor.productsPayment', path: '/vendor/products-payment', icon: Wallet },
    { labelKey: 'dashboard.vendor.adsPayment', path: '/vendor/ads-payment', icon: Wallet },
]
