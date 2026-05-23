import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getDirection } from '../../i18n'

export default function LocaleSync() {
    const { i18n } = useTranslation()

    useEffect(() => {
        const locale = i18n.language
        const dir = getDirection(locale)

        document.documentElement.lang = locale
        document.documentElement.dir = dir
    }, [i18n.language])

    return null
}
