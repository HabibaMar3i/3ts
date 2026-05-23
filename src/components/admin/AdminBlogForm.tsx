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
import type { AdminBlog, BlogStatus } from '../../types/admin'

export type AdminBlogFormValues = Omit<AdminBlog, 'id'>

const emptyValues: AdminBlogFormValues = {
    title: '',
    author: '',
    category: '',
    publishedAt: new Date().toISOString().slice(0, 10),
    status: 'draft',
}

interface AdminBlogFormProps {
    initialValues?: AdminBlogFormValues
    submitLabel: string
    onSubmit: (values: AdminBlogFormValues) => void
    onCancel: () => void
}

export function AdminBlogForm({ initialValues, submitLabel, onSubmit, onCancel }: AdminBlogFormProps) {
    const [values, setValues] = useState<AdminBlogFormValues>(initialValues ?? emptyValues)

    useEffect(() => {
        setValues(initialValues ?? emptyValues)
    }, [initialValues])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!values.title.trim() || !values.author.trim()) return
        onSubmit({
            ...values,
            title: values.title.trim(),
            author: values.author.trim(),
            category: values.category.trim(),
        })
    }

    return (
        <FormCard title={submitLabel} submitLabel={submitLabel} onSubmit={handleSubmit} onCancel={onCancel}>
            <FormField label="العنوان" className="sm:col-span-2">
                <Input
                    value={values.title}
                    onChange={(e) => setValues((prev) => ({ ...prev, title: e.target.value }))}
                    required
                />
            </FormField>
            <FormField label="الكاتب">
                <Input
                    value={values.author}
                    onChange={(e) => setValues((prev) => ({ ...prev, author: e.target.value }))}
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
            <FormField label="تاريخ النشر">
                <Input
                    type="date"
                    value={values.publishedAt}
                    onChange={(e) => setValues((prev) => ({ ...prev, publishedAt: e.target.value }))}
                    required
                />
            </FormField>
            <FormField label="الحالة">
                <Select
                    value={values.status}
                    onValueChange={(status) =>
                        setValues((prev) => ({ ...prev, status: status as BlogStatus }))
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="draft">مسودة</SelectItem>
                        <SelectItem value="published">منشور</SelectItem>
                    </SelectContent>
                </Select>
            </FormField>
        </FormCard>
    )
}
