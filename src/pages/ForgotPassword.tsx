import { useRef, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    forgotPasswordPhoneSchema,
    forgotPasswordOtpSchema,
    resetPasswordSchema,
    type ForgotPasswordPhoneValues,
    type ForgotPasswordOtpValues,
    type ResetPasswordValues,
} from '../schemas/forgotPassword.schema'
import { useForgotPassword } from '../hooks/useForgotPassword'
import { useForgotPasswordStore } from '../store/forgotPassword.store'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

// ─── Step 1: Phone ────────────────────────────────────────────────────────────
function PhoneStep() {
    const { t } = useTranslation()
    const { sendOtp, isSendingOtp, serverError } = useForgotPassword()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordPhoneValues>({
        resolver: zodResolver(forgotPasswordPhoneSchema),
        defaultValues: { phone: '' },
    })

    const onSubmit = (values: ForgotPasswordPhoneValues) => sendOtp(values.phone)

    return (
        <Card className="rounded-3xl border border-slate-200 bg-white p-0 shadow-sm shadow-slate-200/50">
            <CardHeader className="px-6 py-8 sm:px-8">
                <div className="space-y-2">
                    <CardTitle className="text-3xl">{t('auth.forgotPassword.title', 'نسيت كلمة المرور')}</CardTitle>
                    <CardDescription>
                        {t('auth.forgotPassword.phoneDesc', 'لأجل إعادة الدخول المسجل ، لأجل استعادة كلمة المرور')}
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="space-y-5 px-6 pb-6 sm:px-8">
                {serverError && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-900" htmlFor="phone">
                            {t('auth.forgotPassword.phone', 'رقم الجوال')} *
                        </label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder={t('auth.forgotPassword.phonePlaceholder', 'رقم الجوال')}
                            className={`w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 ${errors.phone ? 'border-red-400 focus-visible:ring-red-400' : ''
                                }`}
                            {...register('phone')}
                        />
                        {errors.phone && (
                            <p className="text-xs text-red-600">{errors.phone.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={isSendingOtp}
                        className="w-full rounded-full px-5 py-3 text-base font-semibold disabled:opacity-70"
                    >
                        {isSendingOtp
                            ? t('auth.forgotPassword.sending', 'جارٍ الإرسال…')
                            : t('auth.forgotPassword.confirm', 'تأكيد')}
                    </Button>
                </form>
            </CardContent>

            <CardFooter className="flex flex-col items-center gap-3 border-t border-slate-200 px-6 py-5 sm:px-8">
                <p className="text-sm text-slate-500">
                    {t('auth.forgotPassword.rememberPassword', 'تتذكر كلمة المرور؟')}{' '}
                    <Link to="/login" className="font-semibold text-red-600 hover:text-red-700">
                        {t('auth.forgotPassword.backToLogin', 'تسجيل الدخول')}
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}

// ─── Step 2: OTP ─────────────────────────────────────────────────────────────
function OtpStep() {
    const { t } = useTranslation()
    const { verifyOtp, resendOtp, isVerifyingOtp, serverError, otpTimer, formatTimer, phone } =
        useForgotPassword()

    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const {
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ForgotPasswordOtpValues>({
        resolver: zodResolver(forgotPasswordOtpSchema),
        defaultValues: { otp: '' },
    })

    const otpValue = watch('otp') || ''

    const handleOtpChange = (index: number, char: string) => {
        if (!/^\d?$/.test(char)) return
        const digits = otpValue.split('')
        digits[index] = char
        const newOtp = digits.join('').slice(0, 6)
        setValue('otp', newOtp.padEnd(6, '').trimEnd())
        if (char && index < 5) inputRefs.current[index + 1]?.focus()
    }

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            const digits = otpValue.split('')
            if (!digits[index] && index > 0) {
                digits[index - 1] = ''
                setValue('otp', digits.join('').trimEnd())
                inputRefs.current[index - 1]?.focus()
            } else {
                digits[index] = ''
                setValue('otp', digits.join('').trimEnd())
            }
        }
    }

    const maskedPhone = phone.replace(/(\+?\d{3})\d+(\d{4})/, '$1XXXX$2')

    const onSubmit = (values: ForgotPasswordOtpValues) => verifyOtp(values.otp)

    return (
        <Card className="rounded-3xl border border-slate-200 bg-white p-0 shadow-sm shadow-slate-200/50">
            <CardHeader className="px-6 py-8 sm:px-8">
                <div className="space-y-2">
                    <CardTitle className="text-3xl">{t('auth.forgotPassword.otpTitle', 'إستعادة كلمه المرور')}</CardTitle>
                    <CardDescription>
                        {t('auth.forgotPassword.otpDesc', 'لقد أرسلنا رمز التحقق المكون من 6 أرقام على الرقم')}{' '}
                        <span className="font-semibold text-slate-800" dir="ltr">
                            {maskedPhone}
                        </span>
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="space-y-5 px-6 pb-6 sm:px-8">
                {serverError && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    {/* OTP Inputs */}
                    <div className="flex justify-center gap-3" dir="ltr">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <input
                                key={i}
                                ref={(el) => { inputRefs.current[i] = el }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={otpValue[i] || ''}
                                onChange={(e) => handleOtpChange(i, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                className={`h-12 w-12 rounded-xl border text-center text-lg font-bold outline-none transition-colors
                  ${errors.otp
                                        ? 'border-red-400 bg-red-50 focus:border-red-500'
                                        : 'border-slate-200 bg-slate-50 focus:border-slate-400'
                                    }`}
                            />
                        ))}
                    </div>
                    {errors.otp && (
                        <p className="text-center text-xs text-red-600">{errors.otp.message}</p>
                    )}

                    {/* Timer + Resend */}
                    <div className="flex items-center justify-between text-sm text-slate-500">
                        <span className="font-mono font-semibold text-slate-700" dir="ltr">
                            {formatTimer()}
                        </span>
                        <button
                            type="button"
                            disabled={otpTimer > 0}
                            onClick={resendOtp}
                            className="font-semibold text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {t('auth.forgotPassword.resend', 'لم تستلم الكود؟ أرسل مره أخرى')}
                        </button>
                    </div>

                    <Button
                        type="submit"
                        disabled={isVerifyingOtp || otpValue.length < 6}
                        className="w-full rounded-full px-5 py-3 text-base font-semibold disabled:opacity-70"
                    >
                        {isVerifyingOtp
                            ? t('auth.forgotPassword.verifying', 'جارٍ التحقق…')
                            : t('auth.forgotPassword.confirm', 'تأكيد')}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

// ─── Step 3: Reset Password ───────────────────────────────────────────────────
function ResetPasswordStep() {
    const { t } = useTranslation()
    const { resetPassword, isResettingPassword, serverError } = useForgotPassword()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { newPassword: '', confirmPassword: '' },
    })

    const onSubmit = (values: ResetPasswordValues) => resetPassword(values.newPassword)

    return (
        <Card className="rounded-3xl border border-slate-200 bg-white p-0 shadow-sm shadow-slate-200/50">
            <CardHeader className="px-6 py-8 sm:px-8">
                <div className="space-y-2">
                    <CardTitle className="text-3xl">
                        {t('auth.forgotPassword.resetTitle', 'تعيين كلمة مرور جديدة')}
                    </CardTitle>
                    <CardDescription>
                        {t('auth.forgotPassword.resetDesc', 'قم بتعيين كلمة المرور الجديدة')}
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="space-y-5 px-6 pb-6 sm:px-8">
                {serverError && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-900" htmlFor="newPassword">
                            {t('auth.forgotPassword.newPassword', 'كلمة المرور الجديدة')} *
                        </label>
                        <Input
                            id="newPassword"
                            type="password"
                            placeholder={t('auth.forgotPassword.newPasswordPlaceholder', 'كلمة المرور')}
                            className={`w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 ${errors.newPassword ? 'border-red-400 focus-visible:ring-red-400' : ''
                                }`}
                            {...register('newPassword')}
                        />
                        {errors.newPassword && (
                            <p className="text-xs text-red-600">{errors.newPassword.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-900" htmlFor="confirmPassword">
                            {t('auth.forgotPassword.confirmPassword', 'تأكيد كلمة المرور الجديدة')} *
                        </label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder={t('auth.forgotPassword.confirmPasswordPlaceholder', 'كلمة المرور')}
                            className={`w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 ${errors.confirmPassword ? 'border-red-400 focus-visible:ring-red-400' : ''
                                }`}
                            {...register('confirmPassword')}
                        />
                        {errors.confirmPassword && (
                            <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={isResettingPassword}
                        className="w-full rounded-full px-5 py-3 text-base font-semibold disabled:opacity-70"
                    >
                        {isResettingPassword
                            ? t('auth.forgotPassword.saving', 'جارٍ الحفظ…')
                            : t('auth.forgotPassword.save', 'حفظ')}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

// ─── Step 4: Success ─────────────────────────────────────────────────────────
function SuccessStep() {
    const { t } = useTranslation()
    const { reset } = useForgotPasswordStore()

    return (
        <Card className="rounded-3xl border border-slate-200 bg-white p-0 shadow-sm shadow-slate-200/50">
            <CardHeader className="px-6 py-8 sm:px-8">
                <div className="space-y-4 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <CardTitle className="text-3xl">
                        {t('auth.forgotPassword.successTitle', 'تم تغيير كلمة المرور')}
                    </CardTitle>
                    <CardDescription>
                        {t('auth.forgotPassword.successDesc', 'يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة')}
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="px-6 pb-8 sm:px-8">
                <div className="flex flex-col gap-3">
                    <Link to="/login">
                        <Button className="w-full rounded-full px-5 py-3 text-base font-semibold">
                            {t('auth.forgotPassword.goToLogin', 'تسجيل الدخول')}
                        </Button>
                    </Link>
                    <button
                        type="button"
                        onClick={reset}
                        className="text-sm text-slate-500 hover:text-slate-700"
                    >
                        {t('auth.forgotPassword.tryAgain', 'محاولة مرة أخرى')}
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}

// ─── Hero Panel (mirrors Login hero) ─────────────────────────────────────────
function HeroPanel() {
    const { t } = useTranslation()
    const { step } = useForgotPasswordStore()

    const steps: { key: typeof step; label: string }[] = [
        { key: 'phone', label: t('auth.forgotPassword.step1', 'رقم الجوال') },
        { key: 'otp', label: t('auth.forgotPassword.step2', 'رمز التحقق') },
        { key: 'reset', label: t('auth.forgotPassword.step3', 'كلمة المرور الجديدة') },
    ]

    const stepIndex = steps.findIndex((s) => s.key === step)

    return (
        <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
            <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                {t('auth.forgotPassword.badge', 'استعادة الحساب')}
            </span>
            <div className="space-y-3">
                <h1 className="text-4xl font-bold text-slate-950">
                    {t('auth.forgotPassword.heroTitle', 'نسيت كلمة المرور؟')}
                </h1>
                <p className="max-w-xl text-slate-600">
                    {t('auth.forgotPassword.heroDesc', 'لا تقلق، سنساعدك على استعادة كلمة المرور بخطوات بسيطة وسريعة.')}
                </p>
            </div>

            {/* Step progress */}
            {step !== 'success' && (
                <div className="space-y-3">
                    {steps.map((s, i) => (
                        <div key={s.key} className="flex items-center gap-3">
                            <div
                                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${i < stepIndex
                                    ? 'bg-green-500 text-white'
                                    : i === stepIndex
                                        ? 'bg-red-600 text-white'
                                        : 'bg-slate-100 text-slate-400'
                                    }`}
                            >
                                {i < stepIndex ? (
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    i + 1
                                )}
                            </div>
                            <span
                                className={`text-sm font-medium ${i === stepIndex ? 'text-slate-900' : 'text-slate-400'
                                    }`}
                            >
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
                    <p className="text-sm text-slate-500">{t('auth.forgotPassword.fastRecovery', 'استعادة سريعة')}</p>
                    <p className="mt-2 text-2xl font-bold text-red-600">
                        {t('auth.forgotPassword.easySecure', 'سهل وآمن')}
                    </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
                    <p className="text-sm text-slate-500">{t('auth.forgotPassword.techSupport', 'دعم فني')}</p>
                    <p className="mt-2 text-2xl font-bold text-red-600">24/7</p>
                </div>
            </div>
        </section>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ForgotPassword() {
    const { step } = useForgotPasswordStore()

    return (
        <div className="min-h-screen bg-slate-50 py-16">
            <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
                    <HeroPanel />

                    {step === 'phone' && <PhoneStep />}
                    {step === 'otp' && <OtpStep />}
                    {step === 'reset' && <ResetPasswordStep />}
                    {step === 'success' && <SuccessStep />}
                </div>
            </div>
        </div>
    )
}