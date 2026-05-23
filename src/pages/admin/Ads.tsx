import { useState } from 'react'
import { Plus } from 'lucide-react'
import { DashboardPage } from '../../components/dashboard/DashboardPage'
import { DataTable } from '../../components/dashboard/DataTable'
import { getAdColumns } from '../../components/dashboard/tables/adColumns'
import { VendorAdForm, type VendorAdFormValues } from '../../components/vendor/VendorAdForm'
import { Button } from '../../components/ui/button'
import { initialVendorAds } from '../../data/vendor/ads'
import { useLocalCrud } from '../../hooks/useLocalCrud'
import type { VendorAd } from '../../types/vendor'

type FormMode = 'closed' | 'create' | 'edit'

export default function AdminAds() {
    const { items, create, update, remove } = useLocalCrud<VendorAd>([...initialVendorAds])
    const [formMode, setFormMode] = useState<FormMode>('closed')
    const [editing, setEditing] = useState<VendorAd | null>(null)

    const closeForm = () => {
        setFormMode('closed')
        setEditing(null)
    }

    return (
        <DashboardPage
            title="الإعلانات"
            description="إدارة حملات الإعلانات."
            action={
                formMode === 'closed' ? (
                    <Button type="button" className="gap-2" onClick={() => setFormMode('create')}>
                        <Plus size={18} />
                        إضافة إعلان
                    </Button>
                ) : null
            }
        >
            {formMode === 'create' ? (
                <VendorAdForm
                    submitLabel="حفظ الإعلان"
                    onSubmit={(values: VendorAdFormValues) => {
                        create(values)
                        closeForm()
                    }}
                    onCancel={closeForm}
                />
            ) : null}

            {formMode === 'edit' && editing ? (
                <VendorAdForm
                    initialValues={editing}
                    submitLabel="تحديث الإعلان"
                    onSubmit={(values) => {
                        update(editing.id, values)
                        closeForm()
                    }}
                    onCancel={closeForm}
                />
            ) : null}

            <DataTable
                data={items}
                columns={getAdColumns({
                    onEdit: (ad) => {
                        setEditing(ad)
                        setFormMode('edit')
                    },
                    onDelete: (id) => {
                        if (remove(id, 'هل تريد حذف هذا الإعلان؟') && editing?.id === id) closeForm()
                    },
                })}
                getRowKey={(row) => row.id}
                emptyMessage="لا توجد إعلانات."
                minWidth="900px"
            />
        </DashboardPage>
    )
}
