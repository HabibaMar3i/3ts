import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar'
import { adminNavItems } from '../config/dashboardNav'

export default function AdminLayout() {
    const { t } = useTranslation()

    return (
        <div className="min-h-screen bg-background">
            <div className="flex min-h-screen flex-col lg:flex-row">
                <DashboardSidebar
                    title={t('dashboard.admin.title')}
                    subtitle={t('dashboard.admin.subtitle')}
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
