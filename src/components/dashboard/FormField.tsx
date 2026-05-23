import type { ReactNode } from 'react'
import { Label } from '../ui/label'
import { cn } from '#lib/utils'

interface FormFieldProps {
    label: string
    children: ReactNode
    className?: string
    htmlFor?: string
}

export function FormField({ label, children, className, htmlFor }: FormFieldProps) {
    return (
        <div className={cn('space-y-2', className)}>
            <Label htmlFor={htmlFor}>{label}</Label>
            {children}
        </div>
    )
}
