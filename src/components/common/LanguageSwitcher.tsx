import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { resolveLocale, type SupportedLocale } from '../../i18n'
import { cn } from '#lib/utils'

interface LanguageSwitcherProps {
    className?: string
}

const localeLabels: Record<SupportedLocale, string> = {
    ar: 'EN',
    en: 'العربية',
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
    const { i18n, t } = useTranslation()

    const currentLocale = resolveLocale(i18n.language)

    const toggleLocale = () => {
        const nextLocale = currentLocale === 'ar' ? 'en' : 'ar'
        void i18n.changeLanguage(nextLocale)
    }

    return (
        <button
            type="button"
            onClick={toggleLocale}
            className={cn(
                'inline-flex h-10 items-center gap-1.5 rounded-lg border-2 border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-red-500 hover:bg-red-50 hover:text-red-600',
                className
            )}
            aria-label={t('common.language')}
            title={t('common.language')}
        >
            <Globe size={16} />
            <span>{localeLabels[currentLocale]}</span>
        </button>
    )
}
