import { Outlet } from 'react-router-dom'
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar'
import { adminNavItems } from '../config/dashboardNav'

export default function AdminLayout() {
    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            <div className="flex min-h-screen flex-col lg:flex-row">
                <DashboardSidebar
                    title="لوحة الإدارة"
                    subtitle="3TS Admin"
                    homePath="/admin"
                    navItems={adminNavItems}
                />
                <main className="flex-1 min-w-0">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
