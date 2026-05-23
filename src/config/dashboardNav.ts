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
    label: string
    path: string
    icon: LucideIcon
    end?: boolean
}

export const adminNavItems: DashboardNavItem[] = [
    { label: 'لوحة التحكم', path: '/admin', icon: LayoutDashboard, end: true },
    { label: 'المنتجات', path: '/admin/products', icon: Package },
    { label: 'الطلبات', path: '/admin/orders', icon: ShoppingBag },
    { label: 'المستخدمون', path: '/admin/users', icon: Users },
    { label: 'البائعون', path: '/admin/vendors', icon: Store },
    { label: 'الإعلانات', path: '/admin/ads', icon: Megaphone },
    { label: 'المدونة', path: '/admin/blogs', icon: FileText },
    { label: 'التعليقات', path: '/admin/feedback', icon: MessageSquare },
]

export const vendorNavItems: DashboardNavItem[] = [
    { label: 'لوحة التحكم', path: '/vendor', icon: LayoutDashboard, end: true },
    { label: 'منتجاتي', path: '/vendor/products', icon: Package },
    { label: 'الإعلانات', path: '/vendor/ads', icon: Megaphone },
    { label: 'الاشتراك', path: '/vendor/subscription', icon: CreditCard },
    { label: 'دفع المنتجات', path: '/vendor/products-payment', icon: Wallet },
    { label: 'دفع الإعلانات', path: '/vendor/ads-payment', icon: Wallet },
]
