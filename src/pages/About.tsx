import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'

export default function About() {
    return (
        <div className="min-h-screen bg-white" dir="rtl">
            {/* Hero Section with Red Gradient */}
            <section className="relative overflow-hidden bg-white py-20">
                {/* Decorative red gradient background */}
                <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-red-600/15 via-red-600/5 to-transparent"></div>

                {/* Top accent bar */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                        {/* Left Content */}
                        <div className="space-y-6">
                            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 border border-red-200">
                                <i className="fas fa-info-circle"></i>
                                من نحن
                            </span>
                            <h1 className="text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl leading-tight">
                                3TS هي وجهتك <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700">الموثوقة</span>
                            </h1>
                            <p className="max-w-2xl text-lg leading-8 text-slate-600">
                                نسعى لتقديم أفضل تجربة تسوق إلكتروني لمحبي الألعاب في مصر والعالم العربي، مع تركيز على الجودة الأصلية، العروض المميزة، وخدمة عملاء سريعة وداعمة.
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <Button asChild className="rounded-full px-8 py-3 text-base font-semibold bg-gradient-to-r from-red-600 to-red-700 hover:shadow-lg hover:shadow-red-600/40 transition-all hover:scale-105">
                                    <Link to="/products" className="flex items-center gap-2">
                                        <i className="fas fa-shopping-bag"></i>
                                        تسوق الآن
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild className="rounded-full px-8 py-3 text-base font-semibold border-2 border-red-600 text-red-600 hover:bg-red-50">
                                    <Link to="/contact" className="flex items-center gap-2">
                                        <i className="fas fa-envelope"></i>
                                        تواصل معنا
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Right Stats Cards */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Card className="rounded-3xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-white p-8 text-center shadow-lg shadow-red-600/10 hover:shadow-lg hover:shadow-red-600/20 transition-all duration-300 hover:border-red-600">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-600/10 mb-4">
                                    <i className="fas fa-users text-xl text-red-600"></i>
                                </div>
                                <p className="text-sm font-semibold text-slate-600">عملاء راضون</p>
                                <p className="mt-4 text-4xl font-bold text-red-600">10K+</p>
                            </Card>

                            <Card className="rounded-3xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-white p-8 text-center shadow-lg shadow-red-600/10 hover:shadow-lg hover:shadow-red-600/20 transition-all duration-300 hover:border-red-600">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-600/10 mb-4">
                                    <i className="fas fa-certificate text-xl text-red-600"></i>
                                </div>
                                <p className="text-sm font-semibold text-slate-600">منتج أصلي</p>
                                <p className="mt-4 text-4xl font-bold text-red-600">100%</p>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision, Mission, Values Section */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Vision Card */}
                    <Card className="rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-lg hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/10 transition-all duration-300 group">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-red-600/10 mb-6 group-hover:bg-red-600 transition-all duration-300">
                            <i className="fas fa-eye text-2xl text-red-600 group-hover:text-white transition-all"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-950 mb-4">رؤيتنا</h2>
                        <p className="text-slate-600 leading-7">
                            بناء مجتمع يستمتع بالألعاب الأصلية الموثوقة، مع توفير عروض فريدة وتجربة تسوق سلسة لكل أسرة.
                        </p>
                        <div className="mt-6 h-1 w-12 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
                    </Card>

                    {/* Mission Card */}
                    <Card className="rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-lg hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/10 transition-all duration-300 group">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-red-600/10 mb-6 group-hover:bg-red-600 transition-all duration-300">
                            <i className="fas fa-rocket text-2xl text-red-600 group-hover:text-white transition-all"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-950 mb-4">مهمتنا</h2>
                        <p className="text-slate-600 leading-7">
                            توفير منتجات عالية الجودة وسهولة الوصول إليها مع دعم فني متجاوب وخدمة توصيل موثوقة.
                        </p>
                        <div className="mt-6 h-1 w-12 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
                    </Card>

                    {/* Values Card */}
                    <Card className="rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-lg hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/10 transition-all duration-300 group">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-red-600/10 mb-6 group-hover:bg-red-600 transition-all duration-300">
                            <i className="fas fa-heart text-2xl text-red-600 group-hover:text-white transition-all"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-950 mb-4">قيمنا</h2>
                        <ul className="space-y-3 text-slate-600">
                            <li className="flex items-center gap-3">
                                <span className="inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                                الجودة الأصلية
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                                الشفافية
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                                دعم العملاء
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                                السرعة والموثوقية
                            </li>
                        </ul>
                        <div className="mt-6 h-1 w-12 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
                    </Card>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="relative bg-gradient-to-b from-white via-red-50/30 to-white py-20">
                {/* Decorative accent */}
                <div className="absolute inset-x-0 top-1/2 h-64 bg-gradient-to-b from-red-600/5 via-red-600/10 to-transparent pointer-events-none"></div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 border border-red-200">
                            <i className="fas fa-star"></i>
                            لماذا نحن
                        </span>
                        <h2 className="mt-6 text-4xl font-bold text-slate-950 sm:text-5xl">
                            نقدم لك <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700">تجربة تسوق مختلفة</span> للألعاب
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-slate-600 leading-7">
                            مع فريق من المختصين وخدمة دعم مميزة، نضمن لك تجربة سهلة، آمنة، وخدمة سريعة لكل طلب.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-8 md:grid-cols-3">
                        {/* Fast Shipping Card */}
                        <Card className="rounded-3xl border-2 border-red-200 bg-gradient-to-br from-red-50/50 to-white p-8 shadow-lg hover:shadow-lg hover:shadow-red-600/20 transition-all duration-300 hover:border-red-600 group">
                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/10 mb-6 group-hover:bg-red-600 transition-all duration-300">
                                <i className="fas fa-truck text-3xl text-red-600 group-hover:text-white transition-all"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-950 mb-4">شحن سريع</h3>
                            <p className="text-slate-600 leading-7">
                                نوفر توصيل سريع وآمن داخل مصر مع تتبع كامل لكل طلب في أي وقت.
                            </p>
                            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-red-600 group-hover:gap-3 transition-all">
                                اعرف أكثر
                                <i className="fas fa-arrow-left"></i>
                            </div>
                        </Card>

                        {/* Original Products Card */}
                        <Card className="rounded-3xl border-2 border-red-200 bg-gradient-to-br from-red-50/50 to-white p-8 shadow-lg hover:shadow-lg hover:shadow-red-600/20 transition-all duration-300 hover:border-red-600 group">
                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/10 mb-6 group-hover:bg-red-600 transition-all duration-300">
                                <i className="fas fa-check-circle text-3xl text-red-600 group-hover:text-white transition-all"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-950 mb-4">منتجات أصلية</h3>
                            <p className="text-slate-600 leading-7">
                                نحرص على توفير ألعاب أصلية فقط من الموردين المعتمدين والموثوقين عالمياً.
                            </p>
                            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-red-600 group-hover:gap-3 transition-all">
                                اعرف أكثر
                                <i className="fas fa-arrow-left"></i>
                            </div>
                        </Card>

                        {/* Reliable Support Card */}
                        <Card className="rounded-3xl border-2 border-red-200 bg-gradient-to-br from-red-50/50 to-white p-8 shadow-lg hover:shadow-lg hover:shadow-red-600/20 transition-all duration-300 hover:border-red-600 group">
                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/10 mb-6 group-hover:bg-red-600 transition-all duration-300">
                                <i className="fas fa-headset text-3xl text-red-600 group-hover:text-white transition-all"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-950 mb-4">دعم موثوق</h3>
                            <p className="text-slate-600 leading-7">
                                فريقنا دائمًا جاهز للرد على أسئلتك عبر الدردشة أو البريد الإلكتروني 24/7.
                            </p>
                            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-red-600 group-hover:gap-3 transition-all">
                                اعرف أكثر
                                <i className="fas fa-arrow-left"></i>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="group">
                            <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">5+</div>
                            <p className="text-red-100">سنوات خبرة</p>
                        </div>
                        <div className="group">
                            <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">50K+</div>
                            <p className="text-red-100">طلب منجز</p>
                        </div>
                        <div className="group">
                            <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">500+</div>
                            <p className="text-red-100">منتج متاح</p>
                        </div>
                        <div className="group">
                            <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">24/7</div>
                            <p className="text-red-100">دعم متاح</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-red-600/5 to-transparent"></div>

                <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-slate-950 mb-6">
                        مستعد لبدء التسوق؟
                    </h2>
                    <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                        انضم إلى آلاف العملاء الراضين واستمتع بأفضل تجربة تسوق للألعاب الأصلية.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild className="rounded-full px-8 py-3 text-base font-semibold bg-gradient-to-r from-red-600 to-red-700 hover:shadow-lg hover:shadow-red-600/40 transition-all hover:scale-105">
                            <Link to="/products" className="flex items-center gap-2">
                                <i className="fas fa-play"></i>
                                ابدأ التسوق الآن
                            </Link>
                        </Button>
                        <Button variant="outline" asChild className="rounded-full px-8 py-3 text-base font-semibold border-2 border-red-600 text-red-600 hover:bg-red-50">
                            <Link to="/contact" className="flex items-center gap-2">
                                <i className="fas fa-question-circle"></i>
                                لديك أسئلة؟
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}