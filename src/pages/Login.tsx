import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('الرجاء ملء جميع الحقول المطلوبة')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setError('الرجاء إدخال بريد إلكتروني صالح')
      return
    }

    setSubmitted(true)
    setForm({ email: '', password: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16" dir="rtl">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
            <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
              مرحباً بعودتك
            </span>
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-slate-950">تسجيل الدخول</h1>
              <p className="max-w-xl text-slate-600">
                سجّل الدخول إلى حسابك لتكمل طلباتك بسرعة، تتابع مشترياتك، وتستفيد من عروضنا المميزة.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
                <p className="text-sm text-slate-500">تسوق سريع</p>
                <p className="mt-2 text-2xl font-bold text-red-600">سهل وآمن</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
                <p className="text-sm text-slate-500">دعم فني</p>
                <p className="mt-2 text-2xl font-bold text-red-600">24/7</p>
              </div>
            </div>
          </section>

          <Card className="rounded-3xl border border-slate-200 bg-white p-0 shadow-sm shadow-slate-200/50">
            <CardHeader className="px-6 py-8 sm:px-8">
              <div className="space-y-2">
                <CardTitle className="text-3xl">تسجيل الدخول</CardTitle>
                <CardDescription>
                  أدخل بريدك وكلمة المرور للمتابعة إلى حسابك.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 px-6 pb-6 sm:px-8">
              {submitted && (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                  تم تسجيل الدخول بنجاح.
                </div>
              )}
              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900" htmlFor="email">
                    البريد الإلكتروني
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="example@3ts.com"
                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900" htmlFor="password">
                    كلمة المرور
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="أدخل كلمة المرور"
                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-600" />
                    تذكرني
                  </label>
                  <Link to="/" className="text-sm font-semibold text-red-600 hover:text-red-700">
                    نسيت كلمة المرور؟
                  </Link>
                </div>
                <Button type="submit" className="w-full rounded-full px-5 py-3 text-base font-semibold">
                  دخول
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-3 border-t border-slate-200 px-6 py-5 sm:px-8">
              <p className="text-sm text-slate-500">
                ليس لديك حساب؟{' '}
                <Link to="/signup" className="font-semibold text-red-600 hover:text-red-700">
                  إنشاء حساب
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
