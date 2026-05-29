import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema, type SignupFormValues } from '../schemas/auth.schema'
import { useSignup } from '../hooks/useSignup'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

const LOCATIONS = ['Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan']
const CITIES: Record<string, string[]> = {
    Cairo: ['Nasr City', 'Maadi', 'Heliopolis', 'New Cairo'],
    Alexandria: ['Smouha', 'Montazah', 'Agami'],
    Giza: ['6th of October', 'Sheikh Zayed', 'Dokki'],
    Luxor: ['East Bank', 'West Bank'],
    Aswan: ['Aswan City', 'Kom Ombo'],
}

export default function SignUp() {
    const { t } = useTranslation()
    const { signup, isPending, isSuccess, serverError } = useSignup()

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            location: '',
            city: '',
            password: '',
            confirm: '',
        },
    })

    const selectedLocation = watch('location')

    const onSubmit = (values: SignupFormValues) => {
        signup(values)
        reset()
    }

    const fieldClass = (hasError: boolean) =>
        `w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 ${hasError ? 'border-red-400 focus-visible:ring-red-400' : ''
        }`

    return (
        <div className="min-h-screen bg-slate-50 py-16">
            <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">

                    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
                        <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                            {t('auth.signup.joinUs')}
                        </span>
                        <div className="space-y-3">
                            <h1 className="text-4xl font-bold text-slate-950">{t('auth.signup.title')}</h1>
                            <p className="max-w-xl text-slate-600">{t('auth.signup.heroDesc')}</p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
                                <p className="text-sm text-slate-500">{t('auth.signup.fasterSignup')}</p>
                                <p className="mt-2 text-2xl font-bold text-red-600">{t('auth.signup.effortless')}</p>
                            </div>
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
                                <p className="text-sm text-slate-500">{t('auth.signup.accountProtection')}</p>
                                <p className="mt-2 text-2xl font-bold text-red-600">{t('auth.signup.safeFast')}</p>
                            </div>
                        </div>
                    </section>

                    <Card className="rounded-3xl border border-slate-200 bg-white p-0 shadow-sm shadow-slate-200/50">
                        <CardHeader className="px-6 py-8 sm:px-8">
                            <div className="space-y-2">
                                <CardTitle className="text-3xl">{t('auth.signup.formTitle')}</CardTitle>
                                <CardDescription>{t('auth.signup.formDesc')}</CardDescription>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-5 px-6 pb-6 sm:px-8">
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

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>

                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900" htmlFor="name">
                                        {t('auth.signup.fullName')}
                                    </label>
                                    <Input id="name" type="text" placeholder={t('auth.signup.fullNamePlaceholder')}
                                        className={fieldClass(!!errors.name)} {...register('name')} />
                                    {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900" htmlFor="phone">
                                        {t('auth.signup.phone', 'Phone Number')}
                                    </label>
                                    <Input id="phone" type="tel" placeholder="+20 100 000 0000"
                                        className={fieldClass(!!errors.phone)} {...register('phone')} />
                                    {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900" htmlFor="email">
                                        {t('auth.signup.email')}
                                    </label>
                                    <Input id="email" type="email" placeholder="example@3ts.com"
                                        className={fieldClass(!!errors.email)} {...register('email')} />
                                    {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900" htmlFor="location">
                                        {t('auth.signup.location', 'Location')}
                                    </label>
                                    <select id="location"
                                        className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.location ? 'border-red-400' : ''}`}
                                        {...register('location')}>
                                        <option value="">{t('auth.signup.selectLocation', 'Select location')}</option>
                                        {LOCATIONS.map((loc) => (
                                            <option key={loc} value={loc}>{loc}</option>
                                        ))}
                                    </select>
                                    {errors.location && <p className="text-xs text-red-600">{errors.location.message}</p>}
                                </div>

                                {/* City */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900" htmlFor="city">
                                        {t('auth.signup.city', 'City')}
                                    </label>
                                    <select id="city"
                                        className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.city ? 'border-red-400' : ''}`}
                                        {...register('city')}>
                                        <option value="">{t('auth.signup.selectCity', 'Select city')}</option>
                                        {(CITIES[selectedLocation] ?? []).map((city) => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                    {errors.city && <p className="text-xs text-red-600">{errors.city.message}</p>}
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900" htmlFor="password">
                                        {t('auth.signup.password')}
                                    </label>
                                    <Input id="password" type="password" placeholder={t('auth.signup.passwordPlaceholder')}
                                        className={fieldClass(!!errors.password)} {...register('password')} />
                                    {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900" htmlFor="confirm">
                                        {t('auth.signup.confirmPassword')}
                                    </label>
                                    <Input id="confirm" type="password" placeholder={t('auth.signup.confirmPasswordPlaceholder')}
                                        className={fieldClass(!!errors.confirm)} {...register('confirm')} />
                                    {errors.confirm && <p className="text-xs text-red-600">{errors.confirm.message}</p>}
                                </div>

                                <Button type="submit" disabled={isPending}
                                    className="w-full rounded-full px-5 py-3 text-base font-semibold disabled:opacity-70">
                                    {isPending ? t('auth.signup.loading', 'Creating account…') : t('auth.signup.submit')}
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