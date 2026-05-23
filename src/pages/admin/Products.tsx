import { useState } from 'react'
import { Plus } from 'lucide-react'
import { DashboardPage } from '../../components/dashboard/DashboardPage'
import { DataTable } from '../../components/dashboard/DataTable'
import { getProductColumns } from '../../components/dashboard/tables/productColumns'
import { VendorProductForm, type VendorProductFormValues } from '../../components/vendor/VendorProductForm'
import { Button } from '../../components/ui/button'
import { products as initialProducts } from '../../data/products'
import { useLocalCrud } from '../../hooks/useLocalCrud'
import type { Product } from '../../components/products/types'

type FormMode = 'closed' | 'create' | 'edit'

export default function AdminProducts() {
    const { items, create, update, remove } = useLocalCrud<Product>([...initialProducts])
    const [formMode, setFormMode] = useState<FormMode>('closed')
    const [editing, setEditing] = useState<Product | null>(null)

    const closeForm = () => {
        setFormMode('closed')
        setEditing(null)
    }

    return (
        <DashboardPage
            title="إدارة المنتجات"
            description="إدارة جميع منتجات المتجر."
            action={
                formMode === 'closed' ? (
                    <Button type="button" className="gap-2" onClick={() => setFormMode('create')}>
                        <Plus size={18} />
                        إضافة منتج
                    </Button>
                ) : null
            }
        >
            {formMode === 'create' ? (
                <VendorProductForm
                    submitLabel="حفظ المنتج"
                    onSubmit={(values: VendorProductFormValues) => {
                        create(values)
                        closeForm()
                    }}
                    onCancel={closeForm}
                />
            ) : null}

            {formMode === 'edit' && editing ? (
                <VendorProductForm
                    initialValues={editing}
                    submitLabel="تحديث المنتج"
                    onSubmit={(values) => {
                        update(editing.id, values)
                        closeForm()
                    }}
                    onCancel={closeForm}
                />
            ) : null}

            <DataTable
                data={items}
                columns={getProductColumns({
                    onEdit: (product) => {
                        setEditing(product)
                        setFormMode('edit')
                    },
                    onDelete: (id) => {
                        if (remove(id, 'هل تريد حذف هذا المنتج؟') && editing?.id === id) closeForm()
                    },
                })}
                getRowKey={(row) => row.id}
                emptyMessage="لا توجد منتجات."
            />
        </DashboardPage>
    )
}
