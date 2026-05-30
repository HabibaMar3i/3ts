import { useState, useRef } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useOtp } from '../hooks/useOtp'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'

export default function VerifyOtp() {
    const location = useLocation()
    const { t, i18n } = useTranslation()
    const phone = location.state?.phone as string | undefined
    const lang = i18n.language?.startsWith('en') ? 'en' : 'ar'

    if (!phone) return <Navigate to="/login" replace />

    const { activate, isPending, resend, isResending, serverError, resendMsg } = useOtp(phone, lang)
    const [digits, setDigits] = useState(['', '', '', ''])
    const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return
        const updated = [...digits]
        updated[index] = value
        setDigits(updated)
        if (value && index < 3) refs[index + 1].current?.focus()
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !digits[index] && index > 0) {
            refs[index - 1].current?.focus()
        }
    }

    const handleSubmit = () => {
        const code = digits.join('')
        if (code.length < 4) return
        activate(code)
    }

    return (
        <div className="min-h-screen bg-slate-50 py-16">
            <div className="mx-auto max-w-md px-4">
                <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <CardHeader className="px-6 py-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                            <span className="text-3xl">📱</span>
                        </div>
                        <CardTitle className="text-2xl">{t('auth.verifyOtp.title')}</CardTitle>
                        <CardDescription>
                            {t('auth.verifyOtp.description', { phone })}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6 px-6 pb-8">
                        {serverError && (
                            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-700">
                                {serverError}
                            </div>
                        )}
                        {resendMsg && (
                            <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-center text-sm text-green-700">
                                {resendMsg}
                            </div>
                        )}

                        {/* OTP inputs */}
                        <div className="flex justify-center gap-3">
                            {digits.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={refs[i]}
                                    type="tel"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(i, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(i, e)}
                                    className="h-14 w-14 rounded-xl border border-slate-200 bg-slate-50 text-center text-xl font-bold text-slate-900 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            ))}
                        </div>

                        <Button
                            onClick={handleSubmit}
                            disabled={isPending || digits.join('').length < 4}
                            className="w-full rounded-full py-3 text-base font-semibold disabled:opacity-70">
                            {isPending ? t('auth.verifyOtp.verifying', 'Verifying…') : t('auth.verifyOtp.verify', 'Verify')}
                        </Button>

                        <p className="text-center text-sm text-slate-500">
                            {t('auth.verifyOtp.didntReceive', "Didn't receive the code?")}{' '}
                            <button
                                onClick={() => resend()}
                                disabled={isResending}
                                className="font-semibold text-red-600 hover:text-red-700 disabled:opacity-50">
                                {isResending ? t('auth.verifyOtp.sending', 'Sending…') : t('auth.verifyOtp.resend', 'Resend')}
                            </button>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}