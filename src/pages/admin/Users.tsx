import { useState } from 'react'
import { Plus } from 'lucide-react'
import { AdminUserForm, type AdminUserFormValues } from '../../components/admin/AdminUserForm'
import { DashboardPage } from '../../components/dashboard/DashboardPage'
import { DataTable } from '../../components/dashboard/DataTable'
import { getUserColumns } from '../../components/dashboard/tables/userColumns'
import { Button } from '../../components/ui/button'
import { initialAdminUsers } from '../../data/admin/users'
import { useLocalCrud } from '../../hooks/useLocalCrud'
import type { AdminUser } from '../../types/admin'

type FormMode = 'closed' | 'create' | 'edit'

export default function AdminUsers() {
    const { items, create, update, remove } = useLocalCrud<AdminUser>([...initialAdminUsers])
    const [formMode, setFormMode] = useState<FormMode>('closed')
    const [editing, setEditing] = useState<AdminUser | null>(null)

    const closeForm = () => {
        setFormMode('closed')
        setEditing(null)
    }

    return (
        <DashboardPage
            title="المستخدمون"
            description="إدارة حسابات المستخدمين."
            action={
                formMode === 'closed' ? (
                    <Button type="button" className="gap-2" onClick={() => setFormMode('create')}>
                        <Plus size={18} />
                        إضافة مستخدم
                    </Button>
                ) : null
            }
        >
            {formMode === 'create' ? (
                <AdminUserForm
                    submitLabel="حفظ المستخدم"
                    onSubmit={(values: AdminUserFormValues) => {
                        create(values)
                        closeForm()
                    }}
                    onCancel={closeForm}
                />
            ) : null}

            {formMode === 'edit' && editing ? (
                <AdminUserForm
                    initialValues={editing}
                    submitLabel="تحديث المستخدم"
                    onSubmit={(values) => {
                        update(editing.id, values)
                        closeForm()
                    }}
                    onCancel={closeForm}
                />
            ) : null}

            <DataTable
                data={items}
                columns={getUserColumns({
                    onEdit: (user) => {
                        setEditing(user)
                        setFormMode('edit')
                    },
                    onDelete: (id) => {
                        if (remove(id, 'هل تريد حذف هذا المستخدم؟') && editing?.id === id) closeForm()
                    },
                })}
                getRowKey={(row) => row.id}
                emptyMessage="لا يوجد مستخدمون."
            />
        </DashboardPage>
    )
}
