import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar'
import { vendorNavItems } from '../config/dashboardNav'

export default function VendorLayout() {
    const { t } = useTranslation()

    return (
        <div className="min-h-screen bg-background">
            <div className="flex min-h-screen flex-col lg:flex-row">
                <DashboardSidebar
                    title={t('dashboard.vendor.title')}
                    subtitle={t('dashboard.vendor.subtitle')}
                    homePath="/vendor"
                    navItems={vendorNavItems}
                />
                <main className="flex-1 min-w-0">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
