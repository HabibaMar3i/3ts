import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getDirection, resolveLocale } from '../../i18n'

export default function LocaleSync() {
    const { i18n } = useTranslation()

    useEffect(() => {
        const locale = resolveLocale(i18n.language)
        const dir = getDirection(locale)

        document.documentElement.lang = locale
        document.documentElement.dir = dir
        document.documentElement.classList.toggle('rtl', dir === 'rtl')
        document.documentElement.classList.toggle('ltr', dir === 'ltr')
    }, [i18n.language])

    return null
}
