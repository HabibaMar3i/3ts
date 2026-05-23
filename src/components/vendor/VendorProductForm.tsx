import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
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
        <Card className="border-slate-200">
            <CardHeader>
                <CardTitle className="text-lg">{submitLabel}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                    <Field label="اسم المنتج">
                        <Input
                            value={values.name}
                            onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
                            required
                        />
                    </Field>
                    <Field label="التصنيف">
                        <Input
                            value={values.category}
                            onChange={(e) => setValues((prev) => ({ ...prev, category: e.target.value }))}
                            required
                        />
                    </Field>
                    <Field label="السعر">
                        <Input
                            type="number"
                            min={0}
                            step="0.01"
                            value={values.price}
                            onChange={(e) => setValues((prev) => ({ ...prev, price: Number(e.target.value) }))}
                            required
                        />
                    </Field>
                    <Field label="التقييم">
                        <Input
                            type="number"
                            min={0}
                            max={5}
                            step="0.1"
                            value={values.rating}
                            onChange={(e) => setValues((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                            required
                        />
                    </Field>
                    <Field label="رابط الصورة" className="sm:col-span-2">
                        <Input
                            value={values.image}
                            onChange={(e) => setValues((prev) => ({ ...prev, image: e.target.value }))}
                            required
                        />
                    </Field>
                    <Field label="الوصف" className="sm:col-span-2">
                        <Input
                            value={values.description ?? ''}
                            onChange={(e) => setValues((prev) => ({ ...prev, description: e.target.value }))}
                        />
                    </Field>
                    <Field label="شارة (اختياري)">
                        <Input
                            value={values.badge ?? ''}
                            onChange={(e) => setValues((prev) => ({ ...prev, badge: e.target.value }))}
                            placeholder="جديد / مفضل"
                        />
                    </Field>
                    <div className="flex items-end gap-3 sm:col-span-2">
                        <Button type="submit" className="rounded-full">
                            {submitLabel}
                        </Button>
                        <Button type="button" variant="outline" className="rounded-full" onClick={onCancel}>
                            إلغاء
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

function Field({
    label,
    children,
    className,
}: {
    label: string
    children: ReactNode
    className?: string
}) {
    return (
        <label className={className}>
            <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
            {children}
        </label>
    )
}
