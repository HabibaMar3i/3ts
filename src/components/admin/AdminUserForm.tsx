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
import type { AdminUser, UserRole, UserStatus } from '../../types/admin'

export type AdminUserFormValues = Omit<AdminUser, 'id'>

const emptyValues: AdminUserFormValues = {
    name: '',
    email: '',
    role: 'customer',
    status: 'active',
    joinedAt: new Date().toISOString().slice(0, 10),
}

interface AdminUserFormProps {
    initialValues?: AdminUserFormValues
    submitLabel: string
    onSubmit: (values: AdminUserFormValues) => void
    onCancel: () => void
}

export function AdminUserForm({ initialValues, submitLabel, onSubmit, onCancel }: AdminUserFormProps) {
    const [values, setValues] = useState<AdminUserFormValues>(initialValues ?? emptyValues)

    useEffect(() => {
        setValues(initialValues ?? emptyValues)
    }, [initialValues])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!values.name.trim() || !values.email.trim()) return
        onSubmit({
            ...values,
            name: values.name.trim(),
            email: values.email.trim(),
        })
    }

    return (
        <FormCard title={submitLabel} submitLabel={submitLabel} onSubmit={handleSubmit} onCancel={onCancel}>
            <FormField label="الاسم">
                <Input
                    value={values.name}
                    onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
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
            <FormField label="الدور">
                <Select
                    value={values.role}
                    onValueChange={(role) => setValues((prev) => ({ ...prev, role: role as UserRole }))}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="customer">عميل</SelectItem>
                        <SelectItem value="vendor">بائع</SelectItem>
                        <SelectItem value="admin">مدير</SelectItem>
                    </SelectContent>
                </Select>
            </FormField>
            <FormField label="الحالة">
                <Select
                    value={values.status}
                    onValueChange={(status) =>
                        setValues((prev) => ({ ...prev, status: status as UserStatus }))
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">نشط</SelectItem>
                        <SelectItem value="blocked">محظور</SelectItem>
                    </SelectContent>
                </Select>
            </FormField>
            <FormField label="تاريخ الانضمام">
                <Input
                    type="date"
                    value={values.joinedAt}
                    onChange={(e) => setValues((prev) => ({ ...prev, joinedAt: e.target.value }))}
                    required
                />
            </FormField>
        </FormCard>
    )
}
