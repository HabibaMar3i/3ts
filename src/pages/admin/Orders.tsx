import { DashboardPage } from '../../components/dashboard/DashboardPage'
import { DataTable } from '../../components/dashboard/DataTable'
import { getOrderColumns } from '../../components/dashboard/tables/orderColumns'
import { initialVendorOrders } from '../../data/vendor/orders'
import { useLocalCrud } from '../../hooks/useLocalCrud'
import type { VendorOrder } from '../../types/vendor'

export default function AdminOrders() {
    const { items, remove } = useLocalCrud<VendorOrder>([...initialVendorOrders])

    return (
        <DashboardPage title="الطلبات" description="متابعة وإدارة طلبات العملاء.">
            <DataTable
                data={items}
                columns={getOrderColumns({
                    onDelete: (id) => remove(id, 'هل تريد حذف هذا الطلب؟'),
                })}
                getRowKey={(row) => row.id}
                emptyMessage="لا توجد طلبات."
                minWidth="800px"
            />
        </DashboardPage>
    )
}
