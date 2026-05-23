import { useState } from 'react'
import { Plus } from 'lucide-react'
import { AdminVendorForm, type AdminVendorFormValues } from '../../components/admin/AdminVendorForm'
import { DashboardPage } from '../../components/dashboard/DashboardPage'
import { DataTable } from '../../components/dashboard/DataTable'
import { getVendorColumns } from '../../components/dashboard/tables/vendorColumns'
import { Button } from '../../components/ui/button'
import { initialAdminVendors } from '../../data/admin/vendors'
import { useLocalCrud } from '../../hooks/useLocalCrud'
import type { AdminVendor } from '../../types/admin'

type FormMode = 'closed' | 'create' | 'edit'

export default function AdminVendors() {
    const { items, create, update, remove } = useLocalCrud<AdminVendor>([...initialAdminVendors])
    const [formMode, setFormMode] = useState<FormMode>('closed')
    const [editing, setEditing] = useState<AdminVendor | null>(null)

    const closeForm = () => {
        setFormMode('closed')
        setEditing(null)
    }

    return (
        <DashboardPage
            title="البائعون"
            description="إدارة حسابات البائعين."
            action={
                formMode === 'closed' ? (
                    <Button type="button" className="gap-2" onClick={() => setFormMode('create')}>
                        <Plus size={18} />
                        إضافة بائع
                    </Button>
                ) : null
            }
        >
            {formMode === 'create' ? (
                <AdminVendorForm
                    submitLabel="حفظ البائع"
                    onSubmit={(values: AdminVendorFormValues) => {
                        create(values)
                        closeForm()
                    }}
                    onCancel={closeForm}
                />
            ) : null}

            {formMode === 'edit' && editing ? (
                <AdminVendorForm
                    initialValues={editing}
                    submitLabel="تحديث البائع"
                    onSubmit={(values) => {
                        update(editing.id, values)
                        closeForm()
                    }}
                    onCancel={closeForm}
                />
            ) : null}

            <DataTable
                data={items}
                columns={getVendorColumns({
                    onEdit: (vendor) => {
                        setEditing(vendor)
                        setFormMode('edit')
                    },
                    onDelete: (id) => {
                        if (remove(id, 'هل تريد حذف هذا البائع؟') && editing?.id === id) closeForm()
                    },
                })}
                getRowKey={(row) => row.id}
                emptyMessage="لا يوجد بائعون."
            />
        </DashboardPage>
    )
}
