import { Outlet } from 'react-router-dom'
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar'
import { vendorNavItems } from '../config/dashboardNav'

export default function VendorLayout() {
    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            <div className="flex min-h-screen flex-col lg:flex-row">
                <DashboardSidebar
                    title="لوحة البائع"
                    subtitle="3TS Vendor"
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
