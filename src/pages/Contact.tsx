import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    })

    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        // Validation
        if (!formData.name || !formData.email || !formData.message) {
            setError('الرجاء ملء جميع الحقول المطلوبة')
            setLoading(false)
            return
        }

        // Email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            setError('الرجاء إدخال بريد إلكتروني صحيح')
            setLoading(false)
            return
        }

        // Simulate API call
        setTimeout(() => {
            setSubmitted(true)
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            })
            setLoading(false)

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitted(false), 5000)
        }, 1500)
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section with Red Gradient */}
            <div className="relative overflow-hidden bg-white pt-20 pb-16">
                {/* Decorative red gradient in middle */}
                <div className="absolute inset-0 h-96 bg-gradient-to-b from-transparent via-red-600/10 to-transparent opacity-60"></div>

                {/* Content */}
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-16">
                    <div className="inline-block mb-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                            <i className="fas fa-envelope text-red-600"></i>
                            تواصل معنا
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-950 mb-4 leading-tight">
                        نحن هنا <span className="text-red-600">لمساعدتك</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        هل لديك أسئلة أو تحتاج إلى مساعدة؟ تواصل معنا وسنرد عليك في أسرع وقت
                    </p>
                </div>

                {/* Contact Info Cards */}
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="group rounded-lg border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-red-600 hover:shadow-lg hover:shadow-red-600/10">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-600/10 mb-4 group-hover:bg-red-600 transition-colors duration-300">
                            <Phone size={24} className="text-red-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-950 mb-2">الهاتف</h3>
                        <p className="text-sm text-slate-600">+20 (123) 456-7890</p>
                        <p className="text-xs text-slate-500 mt-1">متوفر 24/7</p>
                    </div>

                    <div className="group rounded-lg border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-red-600 hover:shadow-lg hover:shadow-red-600/10">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-600/10 mb-4 group-hover:bg-red-600 transition-colors duration-300">
                            <Mail size={24} className="text-red-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-950 mb-2">البريد الإلكتروني</h3>
                        <p className="text-sm text-slate-600">support@3ts.com</p>
                        <p className="text-xs text-slate-500 mt-1">نرد خلال ساعة واحدة</p>
                    </div>

                    <div className="group rounded-lg border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-red-600 hover:shadow-lg hover:shadow-red-600/10">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-600/10 mb-4 group-hover:bg-red-600 transition-colors duration-300">
                            <MapPin size={24} className="text-red-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-950 mb-2">العنوان</h3>
                        <p className="text-sm text-slate-600">القاهرة، مصر</p>
                        <p className="text-xs text-slate-500 mt-1">زرنا في المتجر</p>
                    </div>
                </div>
            </div>

            {/* Form Section with Red Gradient Background */}
            <div className="relative bg-white py-20">
                {/* Red gradient accent in background */}
                <div className="absolute inset-0 h-full bg-gradient-to-b from-red-600/5 via-red-600/10 to-red-600/5"></div>

                <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Success Message */}
                        {submitted && (
                            <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 animate-in fade-in slide-in-from-top">
                                <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-semibold text-green-900">تم إرسال الرسالة بنجاح!</p>
                                    <p className="text-xs text-green-700">سنتواصل معك قريباً</p>
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 animate-in fade-in slide-in-from-top">
                                <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        {/* Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name Field */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    الاسم الكامل <span className="text-red-600">*</span>
                                </label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="أدخل اسمك"
                                    className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-100"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    البريد الإلكتروني <span className="text-red-600">*</span>
                                </label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-100"
                                />
                            </div>

                            {/* Phone Field */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    رقم الهاتف
                                </label>
                                <Input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+20 123 456 7890"
                                    className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-100"
                                />
                            </div>

                            {/* Subject Field */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    الموضوع
                                </label>
                                <Input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="موضوع الرسالة"
                                    className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-100"
                                />
                            </div>
                        </div>

                        {/* Message Field - Full Width */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                                الرسالة <span className="text-red-600">*</span>
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="اكتب رسالتك هنا..."
                                rows={6}
                                className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-100 resize-none"
                            ></textarea>
                            <p className="text-xs text-slate-500 mt-2">الأحرف المتبقية: {5000 - formData.message.length}</p>
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-center pt-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full md:w-auto rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-8 py-3 text-white font-semibold shadow-lg shadow-red-600/30 transition-all duration-200 hover:shadow-lg hover:shadow-red-600/50 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                        جاري الإرسال...
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        إرسال الرسالة
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Privacy Notice */}
                        <p className="text-center text-xs text-slate-500">
                            بإرسالك الرسالة، فأنت توافق على سياسة الخصوصية الخاصة بنا
                        </p>
                    </form>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white py-16 border-t border-slate-100">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-slate-950 mb-12 text-center">
                        أسئلة شائعة
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-lg border border-slate-200 hover:border-red-600 transition-colors">
                            <h3 className="font-bold text-slate-950 mb-2 flex items-center gap-2">
                                <span className="inline-block w-1 h-4 bg-red-600 rounded"></span>
                                كم وقت استجابتكم؟
                            </h3>
                            <p className="text-sm text-slate-600">
                                نرد على جميع الاستفسارات خلال ساعة واحدة من وقت الاستقبال
                            </p>
                        </div>

                        <div className="p-6 rounded-lg border border-slate-200 hover:border-red-600 transition-colors">
                            <h3 className="font-bold text-slate-950 mb-2 flex items-center gap-2">
                                <span className="inline-block w-1 h-4 bg-red-600 rounded"></span>
                                هل يمكنني الاتصال بكم هاتفياً؟
                            </h3>
                            <p className="text-sm text-slate-600">
                                نعم، يمكنك الاتصال بنا على الرقم +20 (123) 456-7890 طوال اليوم
                            </p>
                        </div>

                        <div className="p-6 rounded-lg border border-slate-200 hover:border-red-600 transition-colors">
                            <h3 className="font-bold text-slate-950 mb-2 flex items-center gap-2">
                                <span className="inline-block w-1 h-4 bg-red-600 rounded"></span>
                                هل تتقبلون اقتراحات العملاء؟
                            </h3>
                            <p className="text-sm text-slate-600">
                                بالتأكيد! نقدّر جميع الاقتراحات والملاحظات من عملائنا الكرام
                            </p>
                        </div>

                        <div className="p-6 rounded-lg border border-slate-200 hover:border-red-600 transition-colors">
                            <h3 className="font-bold text-slate-950 mb-2 flex items-center gap-2">
                                <span className="inline-block w-1 h-4 bg-red-600 rounded"></span>
                                هل بياناتي آمنة؟
                            </h3>
                            <p className="text-sm text-slate-600">
                                نعم، نستخدم تشفير SSL لحماية جميع بيانات العملاء الشخصية
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}