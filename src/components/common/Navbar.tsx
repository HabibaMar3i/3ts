import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, Search, ShoppingCart, Bell, ChevronDown, MapPin, ChevronRight } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import LanguageSwitcher from './LanguageSwitcher'

// ─── Mock auth state (swap with real store later) ─────────────────────────────
const MOCK_USER = {
    isLoggedIn: true, // toggle to false to see logged-out state
    name: 'عبدالرحمن علي',
    avatar: 'https://i.pravatar.cc/40?img=12',
    cartCount: 2,
    notifCount: 3,
}

export default function Navbar() {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const [searchMobile, setSearchMobile] = useState(false)

    const navLinks = [
        { name: t('nav.home', 'الرئيسية'), path: '/' },
        { name: t('nav.categories', 'الأقسام'), path: '/categories', hasDropdown: true },
        { name: t('nav.orders', 'الطلبات'), path: '/orders' },
        { name: t('nav.offers', 'العروض'), path: '/offers' },
        { name: t('nav.chats', 'المحادثات'), path: '/chats' },
    ]

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm">
            {/* ══════════════════════════════════════════════
          ROW 1 — User / Location / Search / Logo
      ══════════════════════════════════════════════ */}
            <div className="border-b border-slate-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between gap-4 py-3" dir="rtl">

                        {/* Right: Logo */}
                        <Link to="/" className="flex-shrink-0 hidden sm:block">
                            <div className="h-14 w-20 overflow-hidden rounded-lg border border-slate-200 bg-slate-900">
                                <img
                                    src="/logo1.png"
                                    alt="Logo"
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        // Fallback placeholder if logo missing
                                        const t = e.currentTarget as HTMLImageElement
                                        t.style.display = 'none'
                                        const parent = t.parentElement!
                                        parent.innerHTML = `<div class="flex h-full w-full items-center justify-center bg-slate-900 text-white text-lg font-black tracking-tight">3TS</div>`
                                    }}
                                />
                            </div>
                        </Link>

                        {/* Center: Search Bar */}
                        <div className="flex flex-1 max-w-xl">
                            <div className="relative w-full group">
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-600 transition-colors"
                                />
                                <Input
                                    type="text"
                                    placeholder={t('nav.searchPlaceholder', 'ابحث عن المنتجات...')}
                                    className="w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
                                />
                            </div>
                        </div>

                        {/* Left: Location + User/Auth + Language */}
                        <div className="flex items-center gap-4">

                            {/* Location */}
                            <button
                                type="button"
                                className="hidden md:flex items-center gap-1.5 text-right group"
                                aria-label="Change location"
                            >
                                <div className="flex flex-col items-end leading-tight">
                                    <span className="text-xs text-slate-400 font-medium">
                                        {t('nav.location', 'الموقع الجغرافي')}
                                    </span>
                                    <span className="text-sm font-semibold text-slate-700 group-hover:text-red-600 transition-colors">
                                        {t('nav.city', 'الرياض، السعودية')}
                                    </span>
                                </div>
                                <MapPin size={18} className="text-red-500 flex-shrink-0" />
                            </button>

                            {/* Divider */}
                            <div className="hidden md:block h-8 w-px bg-slate-200" />

                            {/* Language Switcher */}
                            <LanguageSwitcher />

                            {/* Divider */}
                            <div className="hidden md:block h-8 w-px bg-slate-200" />

                            {/* User Profile OR Auth Buttons */}
                            {MOCK_USER.isLoggedIn ? (
                                <button
                                    type="button"
                                    className="flex items-center gap-2 rounded-full py-1 px-2 transition-all hover:bg-slate-50 group"
                                >
                                    {/* Avatar */}
                                    <img
                                        src={MOCK_USER.avatar}
                                        alt={MOCK_USER.name}
                                        className="h-9 w-9 rounded-full object-cover ring-2 ring-red-500 ring-offset-1"
                                    />
                                    {/* Name */}
                                    <span className="hidden sm:block text-sm font-semibold text-slate-800 group-hover:text-red-600 transition-colors">
                                        {MOCK_USER.name}
                                    </span>
                                    <ChevronDown
                                        size={15}
                                        className="hidden sm:block text-slate-400 group-hover:text-red-600 transition-colors"
                                    />
                                </button>
                            ) : (
                                <div className="hidden md:flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-all"
                                        asChild
                                    >
                                        <Link to="/login">{t('nav.login', 'تسجيل الدخول')}</Link>
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-all"
                                        asChild
                                    >
                                        <Link to="/signup">{t('nav.signup', 'إنشاء حساب')}</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════════════
          ROW 2 — Nav Links + Cart/Notifications
      ══════════════════════════════════════════════ */}
            <div className="border-b border-slate-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-2" dir="rtl">

                        {/* Right: Nav Links */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="relative group flex items-center gap-1 px-4 py-2 text-sm font-semibold text-slate-700 rounded-lg transition-all hover:text-red-700 hover:bg-red-50"
                                >
                                    {link.name}
                                    {link.hasDropdown && (
                                        <ChevronDown size={14} className="text-slate-400 group-hover:text-red-600 transition-colors" />
                                    )}
                                    <span className="absolute bottom-0 right-0 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full rounded-full" />
                                </Link>
                            ))}
                        </div>

                        {/* Left: Cart + Notifications */}
                        <div className="flex items-center gap-2">
                            {/* Notification Bell */}
                            <button
                                type="button"
                                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:border-red-400 hover:bg-red-50 hover:text-red-600"
                                aria-label="Notifications"
                            >
                                <Bell size={19} />
                                {MOCK_USER.notifCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow shadow-red-400/50">
                                        {MOCK_USER.notifCount}
                                    </span>
                                )}
                            </button>

                            {/* Cart */}
                            <Link
                                to="/cart"
                                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:border-red-400 hover:bg-red-50 hover:text-red-600"
                                aria-label="Cart"
                            >
                                <ShoppingCart size={19} />
                                {MOCK_USER.cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow shadow-red-400/50">
                                        {MOCK_USER.cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* Mobile Menu Toggle */}
                            <button
                                type="button"
                                onClick={() => setIsOpen(!isOpen)}
                                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-red-600 bg-white text-red-600 transition-all hover:bg-red-50"
                                aria-label="Menu"
                                aria-expanded={isOpen}
                            >
                                {isOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>

                            {/* Mobile Search Toggle */}
                            <button
                                type="button"
                                onClick={() => setSearchMobile(!searchMobile)}
                                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:border-red-400 hover:text-red-600"
                                aria-label="Search"
                            >
                                <Search size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════════════
          Mobile Search Dropdown
      ══════════════════════════════════════════════ */}
            {searchMobile && (
                <div className="border-b border-slate-100 bg-white px-4 py-3 lg:hidden">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input
                            type="text"
                            placeholder={t('nav.searchPlaceholder', 'ابحث عن المنتجات...')}
                            className="w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm"
                            autoFocus
                        />
                    </div>
                </div>
            )}

            {/* ══════════════════════════════════════════════
          Mobile Menu
      ══════════════════════════════════════════════ */}
            {isOpen && (
                <div className="border-b border-slate-100 bg-white lg:hidden" dir="rtl">
                    {/* Location row */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 text-sm text-slate-600">
                        <MapPin size={16} className="text-red-500" />
                        <span>{t('nav.city', 'الرياض، السعودية')}</span>
                    </div>

                    {/* Nav Links */}
                    <div className="flex flex-col px-2 py-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-red-50 hover:text-red-700"
                            >
                                <span className="flex items-center gap-2">{link.name}</span>
                                <ChevronRight size={15} className="text-slate-400" />
                            </Link>
                        ))}
                    </div>

                    {/* Auth / Profile */}
                    <div className="border-t border-slate-100 px-4 py-4">
                        {MOCK_USER.isLoggedIn ? (
                            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                                <img
                                    src={MOCK_USER.avatar}
                                    alt={MOCK_USER.name}
                                    className="h-10 w-10 rounded-full object-cover ring-2 ring-red-500"
                                />
                                <div>
                                    <p className="text-sm font-bold text-slate-900">{MOCK_USER.name}</p>
                                    <p className="text-xs text-slate-500">{t('nav.viewProfile', 'عرض الملف الشخصي')}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Button variant="outline" size="sm" className="w-full border border-red-600 text-red-600 rounded-lg" asChild>
                                    <Link to="/login">{t('nav.login', 'تسجيل الدخول')}</Link>
                                </Button>
                                <Button size="sm" className="w-full rounded-lg bg-red-600 text-white" asChild>
                                    <Link to="/signup">{t('nav.signup', 'إنشاء حساب')}</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}