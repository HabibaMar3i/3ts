import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function BackToTop() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-950/90 text-white shadow-2xl shadow-slate-950/40 transition hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-red-400"
      aria-label={t('backToTop.label')}
    >
      <span className="text-xl">↑</span>
    </button>
  )
}