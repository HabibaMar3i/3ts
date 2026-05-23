import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, CreditCard, Truck, Shield, HelpCircle } from 'lucide-react'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-slate-950 text-slate-100" dir="rtl">
            {/* Top accent bar matching navbar */}
            <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>

            {/* Main Footer Content */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <img src="/logo1.png" alt="3TS Logo" className="h-10 w-10 object-contain" />
                            <div className="flex flex-col">
                                <p className="text-sm font-bold text-white">3TS</p>
                                <p className="text-xs text-slate-400">ألعاب أصلية</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed mb-6">
                            متجرك الموثوق للألعاب الأصلية والعالية الجودة لجميع الأعمار.
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            <a
                                href="#"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-600/30 text-slate-300 transition-all duration-200 hover:border-red-600 hover:bg-red-600/10 hover:text-red-500"
                                aria-label="Facebook"
                            >
                                <i className="fab fa-facebook-f text-sm"></i>
                            </a>
                            <a
                                href="#"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-600/30 text-slate-300 transition-all duration-200 hover:border-red-600 hover:bg-red-600/10 hover:text-red-500"
                                aria-label="Twitter"
                            >
                                <i className="fab fa-twitter text-sm"></i>
                            </a>
                            <a
                                href="#"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-600/30 text-slate-300 transition-all duration-200 hover:border-red-600 hover:bg-red-600/10 hover:text-red-500"
                                aria-label="Instagram"
                            >
                                <i className="fab fa-instagram text-sm"></i>
                            </a>
                            <a
                                href="#"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-600/30 text-slate-300 transition-all duration-200 hover:border-red-600 hover:bg-red-600/10 hover:text-red-500"
                                aria-label="YouTube"
                            >
                                <i className="fab fa-youtube text-sm"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                            <span className="inline-block w-1 h-5 bg-red-600 rounded"></span>
                            روابط سريعة
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-sm text-slate-400 transition-colors hover:text-red-500">
                                    الرئيسية
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-sm text-slate-400 transition-colors hover:text-red-500">
                                    المنتجات
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-sm text-slate-400 transition-colors hover:text-red-500">
                                    عن الشركة
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-sm text-slate-400 transition-colors hover:text-red-500">
                                    الخدمات
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-sm text-slate-400 transition-colors hover:text-red-500">
                                    التواصل
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                            <span className="inline-block w-1 h-5 bg-red-600 rounded"></span>
                            خدمة العملاء
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/orders" className="text-sm text-slate-400 transition-colors hover:text-red-500">
                                    طلباتي
                                </Link>
                            </li>
                            <li>
                                <Link to="/wishlist" className="text-sm text-slate-400 transition-colors hover:text-red-500">
                                    قائمة الرغبات
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-sm text-slate-400 transition-colors hover:text-red-500">
                                    تواصل معنا
                                </Link>
                            </li>
                            <li>
                                <Link to="/feedback" className="text-sm text-slate-400 transition-colors hover:text-red-500">
                                    تقييمك مهم
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="text-sm text-slate-400 transition-colors hover:text-red-500">
                                    الأسئلة الشائعة
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal & Policies */}
                    <div>
                        <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                            <span className="inline-block w-1 h-5 bg-red-600 rounded"></span>
                            القانوني
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/privacy-policy" className="text-sm text-slate-400 transition-colors hover:text-red-500">
                                    سياسة الخصوصية
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms-of-service" className="text-sm text-slate-400 transition-colors hover:text-red-500">
                                    شروط الخدمة
                                </Link>
                            </li>
                            <li>
                                <Link to="/return-policy" className="text-sm text-slate-400 transition-colors hover:text-red-500">
                                    سياسة الاسترجاع
                                </Link>
                            </li>
                            <li>
                                <Link to="/shipping-policy" className="text-sm text-slate-400 transition-colors hover:text-red-500">
                                    سياسة الشحن
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                            <span className="inline-block w-1 h-5 bg-red-600 rounded"></span>
                            اتصل بنا
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Phone size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-slate-400">
                                    +20 (123) 456-7890
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
                                <a href="mailto:support@3ts.com" className="text-sm text-slate-400 hover:text-red-500 transition-colors">
                                    support@3ts.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-slate-400">
                                    القاهرة، مصر
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-8"></div>

                {/* Trust Badges Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="flex items-center gap-3 p-4 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-red-600/30 transition-colors">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-600/10">
                            <Truck size={24} className="text-red-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-white">شحن سريع</p>
                            <p className="text-xs text-slate-400">توصيل في 24-48 ساعة</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-red-600/30 transition-colors">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-600/10">
                            <CreditCard size={24} className="text-red-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-white">دفع آمن</p>
                            <p className="text-xs text-slate-400">طرق دفع موثوقة</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-red-600/30 transition-colors">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-600/10">
                            <Shield size={24} className="text-red-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-white">حماية المشتري</p>
                            <p className="text-xs text-slate-400">100% ضمان رضاك</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-red-600/30 transition-colors">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-600/10">
                            <HelpCircle size={24} className="text-red-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-white">دعم 24/7</p>
                            <p className="text-xs text-slate-400">فريق جاهز دائماً</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Copyright & Info */}
                <div className="border-t border-slate-800 pt-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                        <div>
                            <p className="text-xs text-slate-400">
                                © {currentYear} 3TS - ألعاب أصلية. جميع الحقوق محفوظة.
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <p className="text-xs text-slate-400">
                                تم التطوير بواسطة <span className="text-red-600 font-semibold">HabibaDev</span>
                            </p>
                        </div>
                        <div className="flex justify-end gap-2">
                            <span className="text-xs text-slate-500">طرق الدفع:</span>
                            <div className="flex gap-2">
                                <div className="h-5 w-8 rounded border border-slate-700 bg-slate-800 flex items-center justify-center text-[8px] text-slate-400">VISA</div>
                                <div className="h-5 w-8 rounded border border-slate-700 bg-slate-800 flex items-center justify-center text-[8px] text-slate-400">MC</div>
                                <div className="h-5 w-8 rounded border border-slate-700 bg-slate-800 flex items-center justify-center text-[8px] text-slate-400">COD</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}