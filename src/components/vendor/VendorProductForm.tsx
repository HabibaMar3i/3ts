import { useEffect, useState, type FormEvent } from 'react'
import { FormCard } from '../dashboard/FormCard'
import { FormField } from '../dashboard/FormField'
import { Input } from '../ui/input'
import type { Product } from '../products/types'

export type VendorProductFormValues = Omit<Product, 'id'>

const emptyValues: VendorProductFormValues = {
    name: '',
    category: '',
    price: 0,
    rating: 5,
    image: '',
    description: '',
    badge: '',
}

interface VendorProductFormProps {
    initialValues?: VendorProductFormValues
    submitLabel: string
    onSubmit: (values: VendorProductFormValues) => void
    onCancel: () => void
}

export function VendorProductForm({
    initialValues,
    submitLabel,
    onSubmit,
    onCancel,
}: VendorProductFormProps) {
    const [values, setValues] = useState<VendorProductFormValues>(initialValues ?? emptyValues)

    useEffect(() => {
        setValues(initialValues ?? emptyValues)
    }, [initialValues])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!values.name.trim() || !values.category.trim() || !values.image.trim()) return

        onSubmit({
            ...values,
            name: values.name.trim(),
            category: values.category.trim(),
            image: values.image.trim(),
            description: values.description?.trim() || undefined,
            badge: values.badge?.trim() || undefined,
            price: Number(values.price) || 0,
            rating: Math.min(5, Math.max(0, Number(values.rating) || 0)),
        })
    }

    return (
        <FormCard title={submitLabel} submitLabel={submitLabel} onSubmit={handleSubmit} onCancel={onCancel}>
            <FormField label="اسم المنتج">
                <Input
                    value={values.name}
                    onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
                    required
                />
            </FormField>
            <FormField label="التصنيف">
                <Input
                    value={values.category}
                    onChange={(e) => setValues((prev) => ({ ...prev, category: e.target.value }))}
                    required
                />
            </FormField>
            <FormField label="السعر">
                <Input
                    type="number"
                    min={0}
                    step="0.01"
                    value={values.price}
                    onChange={(e) => setValues((prev) => ({ ...prev, price: Number(e.target.value) }))}
                    required
                />
            </FormField>
            <FormField label="التقييم">
                <Input
                    type="number"
                    min={0}
                    max={5}
                    step="0.1"
                    value={values.rating}
                    onChange={(e) => setValues((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                    required
                />
            </FormField>
            <FormField label="رابط الصورة" className="sm:col-span-2">
                <Input
                    value={values.image}
                    onChange={(e) => setValues((prev) => ({ ...prev, image: e.target.value }))}
                    required
                />
            </FormField>
            <FormField label="الوصف" className="sm:col-span-2">
                <Input
                    value={values.description ?? ''}
                    onChange={(e) => setValues((prev) => ({ ...prev, description: e.target.value }))}
                />
            </FormField>
            <FormField label="شارة (اختياري)">
                <Input
                    value={values.badge ?? ''}
                    onChange={(e) => setValues((prev) => ({ ...prev, badge: e.target.value }))}
                    placeholder="جديد / مفضل"
                />
            </FormField>
        </FormCard>
    )
}
