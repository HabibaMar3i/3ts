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
import type { AdStatus, VendorAd } from '../../types/vendor'

export type VendorAdFormValues = Omit<VendorAd, 'id'>

const emptyValues: VendorAdFormValues = {
    title: '',
    placement: '',
    budget: 0,
    status: 'pending',
    startDate: '',
    endDate: '',
    impressions: 0,
}

interface VendorAdFormProps {
    initialValues?: VendorAdFormValues
    submitLabel: string
    onSubmit: (values: VendorAdFormValues) => void
    onCancel: () => void
}

export function VendorAdForm({ initialValues, submitLabel, onSubmit, onCancel }: VendorAdFormProps) {
    const [values, setValues] = useState<VendorAdFormValues>(initialValues ?? emptyValues)

    useEffect(() => {
        setValues(initialValues ?? emptyValues)
    }, [initialValues])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!values.title.trim() || !values.placement.trim()) return

        onSubmit({
            ...values,
            title: values.title.trim(),
            placement: values.placement.trim(),
            budget: Number(values.budget) || 0,
            impressions: Number(values.impressions) || 0,
        })
    }

    return (
        <FormCard title={submitLabel} submitLabel={submitLabel} onSubmit={handleSubmit} onCancel={onCancel}>
            <FormField label="عنوان الحملة">
                <Input
                    value={values.title}
                    onChange={(e) => setValues((prev) => ({ ...prev, title: e.target.value }))}
                    required
                />
            </FormField>
            <FormField label="مكان العرض">
                <Input
                    value={values.placement}
                    onChange={(e) => setValues((prev) => ({ ...prev, placement: e.target.value }))}
                    required
                />
            </FormField>
            <FormField label="الميزانية">
                <Input
                    type="number"
                    min={0}
                    value={values.budget}
                    onChange={(e) => setValues((prev) => ({ ...prev, budget: Number(e.target.value) }))}
                    required
                />
            </FormField>
            <FormField label="الحالة">
                <Select
                    value={values.status}
                    onValueChange={(status) =>
                        setValues((prev) => ({ ...prev, status: status as AdStatus }))
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="اختر الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pending">قيد الانتظار</SelectItem>
                        <SelectItem value="active">نشط</SelectItem>
                        <SelectItem value="paused">متوقف</SelectItem>
                    </SelectContent>
                </Select>
            </FormField>
            <FormField label="تاريخ البداية">
                <Input
                    type="date"
                    value={values.startDate}
                    onChange={(e) => setValues((prev) => ({ ...prev, startDate: e.target.value }))}
                    required
                />
            </FormField>
            <FormField label="تاريخ النهاية">
                <Input
                    type="date"
                    value={values.endDate}
                    onChange={(e) => setValues((prev) => ({ ...prev, endDate: e.target.value }))}
                    required
                />
            </FormField>
        </FormCard>
    )
}
