import { useTranslation } from 'react-i18next'
import type { UseFormRegister } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import type { CheckoutFormValues } from '../../schemas/checkout.schema'

interface CheckoutNotesSectionProps {
    register: UseFormRegister<CheckoutFormValues>
}

export function CheckoutNotesSection({ register }: CheckoutNotesSectionProps) {
    const { t } = useTranslation()

    return (
        <Card className="border-slate-200 bg-white">
            <CardHeader className="pb-4">
                <CardTitle className="text-base font-bold text-slate-950">
                    {t('checkout.notes.title')}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <textarea
                    id="notes"
                    rows={4}
                    placeholder={t('checkout.notes.placeholder')}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-red-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-100"
                    {...register('notes')}
                />
            </CardContent>
        </Card>
    )
}
