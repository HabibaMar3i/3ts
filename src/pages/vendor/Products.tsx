import { useState } from 'react'
import { Plus } from 'lucide-react'
import { DashboardPageHeader } from '../../components/dashboard/DashboardPageHeader'
import { VendorProductForm, type VendorProductFormValues } from '../../components/vendor/VendorProductForm'
import { VendorProductTable } from '../../components/vendor/VendorProductTable'
import { Button } from '../../components/ui/button'
import { initialVendorProducts } from '../../data/vendorProducts'
import type { Product } from '../../components/products/types'

type FormMode = 'closed' | 'create' | 'edit'

export default function VendorProducts() {
    const [products, setProducts] = useState<Product[]>(initialVendorProducts)
    const [formMode, setFormMode] = useState<FormMode>('closed')
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)

    const nextId = () => Math.max(0, ...products.map((product) => product.id)) + 1

    const closeForm = () => {
        setFormMode('closed')
        setEditingProduct(null)
    }

    const handleCreate = (values: VendorProductFormValues) => {
        setProducts((prev) => [...prev, { id: nextId(), ...values }])
        closeForm()
    }

    const handleUpdate = (values: VendorProductFormValues) => {
        if (!editingProduct) return
        setProducts((prev) =>
            prev.map((product) => (product.id === editingProduct.id ? { ...product, ...values } : product))
        )
        closeForm()
    }

    const handleDelete = (id: number) => {
        if (!window.confirm('هل تريد حذف هذا المنتج؟')) return
        setProducts((prev) => prev.filter((product) => product.id !== id))
        if (editingProduct?.id === id) closeForm()
    }

    const startEdit = (product: Product) => {
        setEditingProduct(product)
        setFormMode('edit')
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <DashboardPageHeader
                title="إدارة المنتجات"
                description="أضف منتجاتك وعدّلها أو احذفها من هنا."
                action={
                    formMode === 'closed' ? (
                        <Button
                            type="button"
                            className="gap-2 rounded-full"
                            onClick={() => setFormMode('create')}
                        >
                            <Plus size={18} />
                            إضافة منتج
                        </Button>
                    ) : null
                }
            />

            {formMode === 'create' ? (
                <div className="mb-8">
                    <VendorProductForm
                        submitLabel="حفظ المنتج"
                        onSubmit={handleCreate}
                        onCancel={closeForm}
                    />
                </div>
            ) : null}

            {formMode === 'edit' && editingProduct ? (
                <div className="mb-8">
                    <VendorProductForm
                        initialValues={editingProduct}
                        submitLabel="تحديث المنتج"
                        onSubmit={handleUpdate}
                        onCancel={closeForm}
                    />
                </div>
            ) : null}

            <VendorProductTable products={products} onEdit={startEdit} onDelete={handleDelete} />
        </div>
    )
}
