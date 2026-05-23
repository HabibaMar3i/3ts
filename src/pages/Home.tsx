import { useTranslation } from 'react-i18next'

export default function Home() {
    const { t } = useTranslation()

    return (
        <div>
            <h1>{t('pages.home')}</h1>
        </div>
    )
}
