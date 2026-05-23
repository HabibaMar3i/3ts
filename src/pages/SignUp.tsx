import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

export default function SignUp() {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        setError('')
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!form.name || !form.email || !form.password || !form.confirm) {
            setError('الرجاء ملء جميع الحقول المطلوبة')
            return
        }

        if (form.password !== form.confirm) {
            setError('كلمة المرور وتأكيدها غير متطابقين')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(form.email)) {
            setError('الرجاء إدخال بريد إلكتروني صالح')
            return
        }

        setSubmitted(true)
        setForm({ name: '', email: '', password: '', confirm: '' })
        setTimeout(() => setSubmitted(false), 4000)
    }

    return (
        <div className="min-h-screen bg-slate-50 py-16" dir="rtl">
            <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
                    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
                        <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                            انضم إلى 3TS
                        </span>
                        <div className="space-y-3">
                            <h1 className="text-4xl font-bold text-slate-950">إنشاء حساب جديد</h1>
                            <p className="max-w-xl text-slate-600">
                                أنشئ حسابك الآن لتبدأ التسوق واستفيد من عروض الألعاب الأصلية والإشعارات الخاصة.
                            </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
                                <p className="text-sm text-slate-500">تسجيل أسرع</p>
                                <p className="mt-2 text-2xl font-bold text-red-600">بدون مجهود</p>
                            </div>
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
                                <p className="text-sm text-slate-500">حماية الحساب</p>
                                <p className="mt-2 text-2xl font-bold text-red-600">آمنة وسريعة</p>
                            </div>
                        </div>
                    </section>

                    <Card className="rounded-3xl border border-slate-200 bg-white p-0 shadow-sm shadow-slate-200/50">
                        <CardHeader className="px-6 py-8 sm:px-8">
                            <div className="space-y-2">
                                <CardTitle className="text-3xl">إنشاء حساب</CardTitle>
                                <CardDescription>سجل بياناتك لبدء التسوق على 3TS.</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5 px-6 pb-6 sm:px-8">
                            {submitted && (
                                <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                                    تم إنشاء الحساب بنجاح.
                                </div>
                            )}
                            {error && (
                                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900" htmlFor="name">
                                        الاسم الكامل
                                    </label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="أدخل اسمك الكامل"
                                        className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3"
                                    />
                                </div>
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
                                        placeholder="أنشئ كلمة مرور"
                                        className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900" htmlFor="confirm">
                                        تأكيد كلمة المرور
                                    </label>
                                    <Input
                                        id="confirm"
                                        name="confirm"
                                        type="password"
                                        value={form.confirm}
                                        onChange={handleChange}
                                        placeholder="أعد كتابة كلمة المرور"
                                        className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3"
                                    />
                                </div>
                                <Button type="submit" className="w-full rounded-full px-5 py-3 text-base font-semibold">
                                    إنشاء حساب
                                </Button>
                            </form>
                        </CardContent>
                        <CardFooter className="flex flex-col items-center gap-3 border-t border-slate-200 px-6 py-5 sm:px-8">
                            <p className="text-sm text-slate-500">
                                لديك حساب بالفعل؟{' '}
                                <Link to="/login" className="font-semibold text-red-600 hover:text-red-700">
                                    تسجيل الدخول
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
