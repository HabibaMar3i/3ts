import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema, type SignupFormValues } from '../schemas/auth.schema'
import { useSignup } from '../hooks/useSignup'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

export default function SignUp() {
    const { t, i18n } = useTranslation()
    const lang = i18n.language?.startsWith('en') ? 'en' : 'ar'
    const { signup, isPending, isSuccess, serverError, cities, citiesLoading, coords, geoError, getLocation } = useSignup()

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: { name: '', phone: '', email: '', password: '', confirm: '', map_desc: '' },
    })

    useEffect(() => {
        if (isSuccess) reset()
    }, [isSuccess, reset])

    const handleSignupSubmit = (values: SignupFormValues) => signup({ ...values, lang })

    const fc = (hasError: boolean) =>
        `w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${hasError ? 'border-red-400' : ''}`

    return (
        <div className="min-h-screen bg-slate-50 py-16">
            <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">

                    {/* Hero panel — keep yours exactly as is */}
                    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                            {t('auth.signup.joinUs')}
                        </span>
                        <div className="space-y-3">
                            <h1 className="text-4xl font-bold text-slate-950">{t('auth.signup.title')}</h1>
                            <p className="max-w-xl text-slate-600">{t('auth.signup.heroDesc')}</p>
                        </div>
                    </section>

                    <Card className="rounded-3xl border border-slate-200 bg-white p-0 shadow-sm">
                        <CardHeader className="px-6 py-8 sm:px-8">
                            <CardTitle className="text-3xl">{t('auth.signup.formTitle')}</CardTitle>
                            <CardDescription>{t('auth.signup.formDesc')}</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4 px-6 pb-6 sm:px-8">
                            {isSuccess && (
                                <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                                    {t('auth.signup.success')}
                                </div>
                            )}
                            {serverError && (
                                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                                    {serverError}
                                </div>
                            )}

                            <form onSubmit={handleSubmit(handleSignupSubmit)} className="space-y-4" noValidate>

                                {/* Profile Image */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900">{t('auth.signup.profileImageOptional')}</label>
                                    <input type="file" accept="image/*"
                                        onChange={(e) => { if (e.target.files?.[0]) setValue('image', e.target.files[0]) }}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm" />
                                </div>

                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900" htmlFor="name">{t('auth.signup.fullName')}</label>
                                    <Input id="name" type="text" placeholder={t('auth.signup.fullNamePlaceholder')}
                                        className={fc(!!errors.name)} {...register('name')} />
                                    {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
                                </div>

                                {/* Phone — 9 digits, backend adds country code */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900" htmlFor="phone">{t('auth.signup.phoneNumber')}</label>
                                    <div className="flex gap-2">
                                        <span className="flex items-center rounded-xl border border-slate-200 bg-slate-100 px-3 text-sm text-slate-500">+966</span>
                                        <Input id="phone" type="tel" placeholder={t('auth.signup.phonePlaceholder', '512345678')}
                                            className={fc(!!errors.phone)} {...register('phone')} />
                                    </div>
                                    {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900" htmlFor="email">{t('auth.signup.emailOptional')}</label>
                                    <Input id="email" type="email" placeholder={t('auth.signup.emailPlaceholder', 'example@email.com')}
                                        className={fc(!!errors.email)} {...register('email')} />
                                    {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
                                </div>

                                {/* City */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900" htmlFor="city_id">{t('auth.signup.city')}</label>
                                    <select id="city_id" className={fc(!!errors.city_id)}
                                        {...register('city_id', { valueAsNumber: true })}>
                                        <option value="">{citiesLoading ? t('auth.signup.loadingCities', 'Loading cities...') : t('auth.signup.selectCity')}</option>
                                        {cities.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                    {errors.city_id && <p className="text-xs text-red-600">{errors.city_id.message}</p>}
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900">{t('auth.signup.yourLocation')}</label>
                                    <Button type="button" onClick={getLocation}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100">
                                        {coords ? `📍 ${t('auth.signup.locationCaptured')}` : t('auth.signup.getLocation')}
                                    </Button>
                                    {geoError && <p className="text-xs text-red-600">{geoError}</p>}
                                </div>

                                {/* Map description */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900" htmlFor="map_desc">{t('auth.signup.addressDescription')}</label>
                                    <Input id="map_desc" type="text" placeholder={t('auth.signup.addressDescriptionPlaceholder', 'e.g. Riyadh, Al Olaya district')}
                                        className={fc(!!errors.map_desc)} {...register('map_desc')} />
                                    {errors.map_desc && <p className="text-xs text-red-600">{errors.map_desc.message}</p>}
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900" htmlFor="password">{t('auth.signup.password')}</label>
                                    <Input id="password" type="password" placeholder={t('auth.signup.passwordPlaceholder')}
                                        className={fc(!!errors.password)} {...register('password')} />
                                    {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900" htmlFor="confirm">{t('auth.signup.confirmPassword')}</label>
                                    <Input id="confirm" type="password" placeholder={t('auth.signup.confirmPasswordPlaceholder')}
                                        className={fc(!!errors.confirm)} {...register('confirm')} />
                                    {errors.confirm && <p className="text-xs text-red-600">{errors.confirm.message}</p>}
                                </div>

                                <Button type="submit" disabled={isPending}
                                    className="w-full rounded-full px-5 py-3 text-base font-semibold disabled:opacity-70">
                                    {isPending ? t('auth.signup.creatingAccount', 'Creating account…') : t('auth.signup.submit')}
                                </Button>
                            </form>
                        </CardContent>

                        <CardFooter className="flex flex-col items-center gap-3 border-t border-slate-200 px-6 py-5 sm:px-8">
                            <p className="text-sm text-slate-500">
                                {t('auth.signup.hasAccount')}{' '}
                                <Link to="/login" className="font-semibold text-red-600 hover:text-red-700">
                                    {t('auth.signup.login')}
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}