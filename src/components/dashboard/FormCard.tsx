import type { FormEvent, ReactNode } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'

interface FormCardProps {
    title: string
    submitLabel: string
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
    onCancel: () => void
    children: ReactNode
}

export function FormCard({ title, submitLabel, onSubmit, onCancel, children }: FormCardProps) {
    return (
        <Card className="mb-8">
            <form onSubmit={onSubmit}>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">{children}</CardContent>
                <CardFooter className="gap-3 border-t">
                    <Button type="submit">{submitLabel}</Button>
                    <Button type="button" variant="outline" onClick={onCancel}>
                        إلغاء
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
