import { useEffect, useState, type FormEvent } from 'react'
import { FormCard } from '../dashboard/FormCard'
import { FormField } from '../dashboard/FormField'
import { Input } from '../ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import type { AdminVendor, VendorAccountStatus } from '../../types/admin'

export type AdminVendorFormValues = Omit<AdminVendor, 'id'>

const emptyValues: AdminVendorFormValues = {
    storeName: '',
    owner: '',
    email: '',
    productsCount: 0,
    status: 'pending',
}

interface AdminVendorFormProps {
    initialValues?: AdminVendorFormValues
    submitLabel: string
    onSubmit: (values: AdminVendorFormValues) => void
    onCancel: () => void
}

export function AdminVendorForm({
    initialValues,
    submitLabel,
    onSubmit,
    onCancel,
}: AdminVendorFormProps) {
    const [values, setValues] = useState<AdminVendorFormValues>(initialValues ?? emptyValues)

    useEffect(() => {
        setValues(initialValues ?? emptyValues)
    }, [initialValues])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!values.storeName.trim() || !values.owner.trim() || !values.email.trim()) return
        onSubmit({
            ...values,
            storeName: values.storeName.trim(),
            owner: values.owner.trim(),
            email: values.email.trim(),
            productsCount: Number(values.productsCount) || 0,
        })
    }

    return (
        <FormCard title={submitLabel} submitLabel={submitLabel} onSubmit={handleSubmit} onCancel={onCancel}>
            <FormField label="اسم المتجر">
                <Input
                    value={values.storeName}
                    onChange={(e) => setValues((prev) => ({ ...prev, storeName: e.target.value }))}
                    required
                />
            </FormField>
            <FormField label="المالك">
                <Input
                    value={values.owner}
                    onChange={(e) => setValues((prev) => ({ ...prev, owner: e.target.value }))}
                    required
                />
            </FormField>
            <FormField label="البريد الإلكتروني">
                <Input
                    type="email"
                    value={values.email}
                    onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
                    required
                />
            </FormField>
            <FormField label="عدد المنتجات">
                <Input
                    type="number"
                    min={0}
                    value={values.productsCount}
                    onChange={(e) =>
                        setValues((prev) => ({ ...prev, productsCount: Number(e.target.value) }))
                    }
                />
            </FormField>
            <FormField label="الحالة">
                <Select
                    value={values.status}
                    onValueChange={(status) =>
                        setValues((prev) => ({ ...prev, status: status as VendorAccountStatus }))
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pending">قيد الانتظار</SelectItem>
                        <SelectItem value="active">نشط</SelectItem>
                        <SelectItem value="suspended">موقوف</SelectItem>
                    </SelectContent>
                </Select>
            </FormField>
        </FormCard>
    )
}
