import { useState } from 'react'
import { Plus } from 'lucide-react'
import { DashboardPage } from '../../components/dashboard/DashboardPage'
import { DataTable } from '../../components/dashboard/DataTable'
import { VendorAdForm, type VendorAdFormValues } from '../../components/vendor/VendorAdForm'
import { getAdColumns } from '../../components/dashboard/tables/adColumns'
import { Button } from '../../components/ui/button'
import { initialVendorAds } from '../../data/vendor/ads'
import { useLocalCrud } from '../../hooks/useLocalCrud'
import type { VendorAd } from '../../types/vendor'

type FormMode = 'closed' | 'create' | 'edit'

export default function VendorAds() {
    const { items: ads, create, update, remove } = useLocalCrud<VendorAd>(initialVendorAds)
    const [formMode, setFormMode] = useState<FormMode>('closed')
    const [editingAd, setEditingAd] = useState<VendorAd | null>(null)

    const closeForm = () => {
        setFormMode('closed')
        setEditingAd(null)
    }

    const handleCreate = (values: VendorAdFormValues) => {
        create(values)
        closeForm()
    }

    const handleUpdate = (values: VendorAdFormValues) => {
        if (!editingAd) return
        update(editingAd.id, values)
        closeForm()
    }

    const handleDelete = (id: number) => {
        if (!remove(id, 'هل تريد حذف هذا الإعلان؟')) return
        if (editingAd?.id === id) closeForm()
    }

    return (
        <DashboardPage
            title="إدارة الإعلانات"
            description="أنشئ حملاتك الإعلانية وتابع أداءها."
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
                <VendorAdForm submitLabel="حفظ الإعلان" onSubmit={handleCreate} onCancel={closeForm} />
            ) : null}

            {formMode === 'edit' && editingAd ? (
                <VendorAdForm
                    initialValues={editingAd}
                    submitLabel="تحديث الإعلان"
                    onSubmit={handleUpdate}
                    onCancel={closeForm}
                />
            ) : null}

            <DataTable
                data={ads}
                columns={getAdColumns({
                    onEdit: (ad) => {
                        setEditingAd(ad)
                        setFormMode('edit')
                    },
                    onDelete: handleDelete,
                })}
                getRowKey={(row) => row.id}
                emptyMessage="لا توجد إعلانات بعد."
                minWidth="900px"
            />
        </DashboardPage>
    )
}
