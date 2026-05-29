import { resolveLocale } from '../i18n'

export function formatMoney(amount: number, locale: string): string {
    const resolved = resolveLocale(locale)
    return amount.toLocaleString(resolved === 'ar' ? 'ar-EG' : 'en-EG', {
        style: 'currency',
        currency: 'EGP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })
}
