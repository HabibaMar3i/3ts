import { useState } from 'react'
import { Plus } from 'lucide-react'
import { DashboardPage } from '../../components/dashboard/DashboardPage'
import { DataTable } from '../../components/dashboard/DataTable'
import { VendorProductForm, type VendorProductFormValues } from '../../components/vendor/VendorProductForm'
import { getProductColumns } from '../../components/dashboard/tables/productColumns'
import { Button } from '../../components/ui/button'
import { initialVendorProducts } from '../../data/vendorProducts'
import { useLocalCrud } from '../../hooks/useLocalCrud'
import type { Product } from '../../components/products/types'

type FormMode = 'closed' | 'create' | 'edit'

export default function VendorProducts() {
    const { items: products, create, update, remove } = useLocalCrud<Product>(initialVendorProducts)
    const [formMode, setFormMode] = useState<FormMode>('closed')
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)

    const closeForm = () => {
        setFormMode('closed')
        setEditingProduct(null)
    }

    const handleCreate = (values: VendorProductFormValues) => {
        create(values)
        closeForm()
    }

    const handleUpdate = (values: VendorProductFormValues) => {
        if (!editingProduct) return
        update(editingProduct.id, values)
        closeForm()
    }

    const handleDelete = (id: number) => {
        if (!remove(id, 'هل تريد حذف هذا المنتج؟')) return
        if (editingProduct?.id === id) closeForm()
    }

    return (
        <DashboardPage
            title="إدارة المنتجات"
            description="أضف منتجاتك وعدّلها أو احذفها من هنا."
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
                <VendorProductForm submitLabel="حفظ المنتج" onSubmit={handleCreate} onCancel={closeForm} />
            ) : null}

            {formMode === 'edit' && editingProduct ? (
                <VendorProductForm
                    initialValues={editingProduct}
                    submitLabel="تحديث المنتج"
                    onSubmit={handleUpdate}
                    onCancel={closeForm}
                />
            ) : null}

            <DataTable
                data={products}
                columns={getProductColumns({
                    onEdit: (product) => {
                        setEditingProduct(product)
                        setFormMode('edit')
                    },
                    onDelete: handleDelete,
                })}
                getRowKey={(row) => row.id}
                emptyMessage="لا توجد منتجات بعد. أضف أول منتج من الزر أعلاه."
            />
        </DashboardPage>
    )
}
