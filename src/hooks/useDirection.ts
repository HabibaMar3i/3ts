import { useTranslation } from 'react-i18next'
import { getDirection, resolveLocale } from '../i18n'

export function useDirection() {
    const { i18n } = useTranslation()
    const locale = resolveLocale(i18n.language)
    const dir = getDirection(locale)
    const isRtl = dir === 'rtl'

    return { locale, dir, isRtl }
}
