import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import ar from './locales/ar.json'
import en from './locales/en.json'

export const defaultLocale = 'ar' as const
export const supportedLocales = ['ar', 'en'] as const
export type SupportedLocale = (typeof supportedLocales)[number]

export function resolveLocale(locale: string): SupportedLocale {
    const base = locale.split('-')[0]
    if (supportedLocales.includes(base as SupportedLocale)) {
        return base as SupportedLocale
    }
    return defaultLocale
}

export function getDirection(locale: string): 'rtl' | 'ltr' {
    return resolveLocale(locale) === 'ar' ? 'rtl' : 'ltr'
}

void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            ar: { translation: ar },
            en: { translation: en },
        },
        fallbackLng: defaultLocale,
        lng: defaultLocale,
        supportedLngs: [...supportedLocales],
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage'],
            caches: ['localStorage'],
            lookupLocalStorage: '3ts-locale',
        },
    })

export default i18n
