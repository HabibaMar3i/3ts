import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormValues } from '../schemas/auth.schema'
import { useLogin } from '../hooks/useLogin'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

export default function Login() {
  const { t } = useTranslation()
  const { login, isPending, isSuccess, serverError } = useLogin()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone: '', password: '' },
  })

  const onSubmit = (values: LoginFormValues) => {
    login(values)
    reset()
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">

          <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
            <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
              {t('auth.login.welcomeBack')}
            </span>
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-slate-950">{t('auth.login.title')}</h1>
              <p className="max-w-xl text-slate-600">{t('auth.login.heroDesc')}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
                <p className="text-sm text-slate-500">{t('auth.login.fastShopping')}</p>
                <p className="mt-2 text-2xl font-bold text-red-600">{t('auth.login.easySecure')}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
                <p className="text-sm text-slate-500">{t('auth.login.techSupport')}</p>
                <p className="mt-2 text-2xl font-bold text-red-600">24/7</p>
              </div>
            </div>
          </section>

          <Card className="rounded-3xl border border-slate-200 bg-white p-0 shadow-sm shadow-slate-200/50">
            <CardHeader className="px-6 py-8 sm:px-8">
              <div className="space-y-2">
                <CardTitle className="text-3xl">{t('auth.login.title')}</CardTitle>
                <CardDescription>{t('auth.login.formDesc')}</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-5 px-6 pb-6 sm:px-8">
              {isSuccess && (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                  {t('auth.login.success')}
                </div>
              )}
              {serverError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900" htmlFor="phone">
                    {t('auth.login.phone', 'Phone Number')}
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+20 100 000 0000"
                    className={`w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 ${
                      errors.phone ? 'border-red-400 focus-visible:ring-red-400' : ''
                    }`}
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900" htmlFor="password">
                    {t('auth.login.password')}
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={t('auth.login.passwordPlaceholder')}
                    className={`w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 ${
                      errors.password ? 'border-red-400 focus-visible:ring-red-400' : ''
                    }`}
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className="text-xs text-red-600">{errors.password.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-600"
                    />
                    {t('auth.login.rememberMe')}
                  </label>
                  <Link to="/forget-password" className="text-sm font-semibold text-red-600 hover:text-red-700">
                    {t('auth.login.forgotPassword')}
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full rounded-full px-5 py-3 text-base font-semibold disabled:opacity-70"
                >
                  {isPending ? t('auth.login.loading', 'Signing in…') : t('auth.login.submit')}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col items-center gap-3 border-t border-slate-200 px-6 py-5 sm:px-8">
              <p className="text-sm text-slate-500">
                {t('auth.login.noAccount')}{' '}
                <Link to="/signup" className="font-semibold text-red-600 hover:text-red-700">
                  {t('auth.login.createAccount')}
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}