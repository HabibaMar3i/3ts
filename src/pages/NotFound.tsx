import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
    const { t } = useTranslation()

    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
            <h1 className="text-4xl font-bold text-slate-950">{t('pages.notFound')}</h1>
            <p className="text-slate-600">{t('pages.notFoundDesc')}</p>
            <Link to="/" className="font-semibold text-red-600 hover:text-red-700">
                {t('nav.home')}
            </Link>
        </div>
    )
}
