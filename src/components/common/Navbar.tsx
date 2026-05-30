import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, Search, ShoppingCart, Bell, ChevronDown, ChevronRight, User, LogOut, Heart } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '../ui/dropdown-menu'
import LanguageSwitcher from './LanguageSwitcher'
import { useAuthStore } from '../../store/auth.store'
import { useLogout } from '../../hooks/useLogout'

export default function Navbar() {
    const { t } = useTranslation()
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)

    const { user, token } = useAuthStore()
    const { logout, isPending } = useLogout()
    const isLoggedIn = !!token

    const navLinks = [
        { name: t('nav.home', 'الرئيسية'), path: '/' },
        { name: t('nav.categories', 'الأقسام'), path: '/categories', hasDropdown: true },
    ]

    const orderLinks = [
        { name: t('nav.ordersMadeAndDone', 'المنجزة'), path: '/orders/made-and-done' },
        { name: t('nav.ordersRefund', 'الاسترجاع'), path: '/orders/refund' },
    ]

    const isOrdersActive = orderLinks.some((link) => location.pathname.startsWith(link.path))

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm">

            {/* ROW 1 */}
            <div className="border-b border-slate-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between gap-4 py-3">

                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0 hidden sm:block">
                            <div className="h-14 w-14 overflow-hidden rounded-lg">
                                <img src="/logo1.png" alt="Logo"
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        const t = e.currentTarget as HTMLImageElement
                                        t.style.display = 'none'
                                        const parent = t.parentElement!
                                        parent.innerHTML = `<div class="flex h-full w-full items-center justify-center bg-slate-900 text-white text-lg font-black tracking-tight">3TS</div>`
                                    }}
                                />
                            </div>
                        </Link>

                        {/* Search */}
                        <div className="flex flex-1 max-w-xl">
                            <div className="relative w-full group">
                                <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                                <Input type="text"
                                    placeholder={t('nav.searchPlaceholder', 'ابحث عن المنتجات...')}
                                    className="w-full rounded-full border border-slate-200 bg-slate-50 ps-10 pe-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
                                />
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-4">
                            <LanguageSwitcher />
                            <div className="hidden md:block h-8 w-px bg-slate-200" />

                            {isLoggedIn ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button type="button" className="flex items-center gap-2 rounded-full py-1 px-2 transition-all hover:bg-slate-50 group">
                                            <div className="h-9 w-9 rounded-full bg-red-100 flex items-center justify-center ring-2 ring-red-500 ring-offset-1">
                                                <span className="text-sm font-bold text-red-600">
                                                    {user?.name?.charAt(0) ?? 'U'}
                                                </span>
                                            </div>
                                            <span className="hidden sm:block text-sm font-semibold text-slate-800 group-hover:text-red-600 transition-colors">
                                                {user?.name}
                                            </span>
                                            <ChevronDown size={15} className="hidden sm:block text-slate-400 group-hover:text-red-600 transition-colors" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="min-w-44">
                                        <DropdownMenuItem asChild>
                                            <Link to="/profile" className="cursor-pointer flex items-center gap-2">
                                                <User size={15} />
                                                {t('nav.profile', 'الملف الشخصي')}
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => logout()}
                                            disabled={isPending}
                                            className="cursor-pointer text-red-600 focus:text-red-600 flex items-center gap-2">
                                            <LogOut size={15} />
                                            {isPending ? '...' : t('nav.logout', 'تسجيل الخروج')}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className="hidden md:flex items-center gap-2">
                                    <Button variant="outline" size="sm"
                                        className="border border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-50"
                                        asChild>
                                        <Link to="/login">{t('nav.login', 'تسجيل الدخول')}</Link>
                                    </Button>
                                    <Button size="sm"
                                        className="rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700"
                                        asChild>
                                        <Link to="/signup">{t('nav.signup', 'إنشاء حساب')}</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ROW 2 */}
            <div className="border-b border-slate-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-2">

                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link key={link.path} to={link.path}
                                    className="relative group flex items-center gap-1 px-4 py-2 text-sm font-semibold text-slate-700 rounded-lg transition-all hover:text-red-700 hover:bg-red-50">
                                    {link.name}
                                    {link.hasDropdown && <ChevronDown size={14} className="text-slate-400 group-hover:text-red-600 transition-colors" />}
                                    <span className="absolute bottom-0 end-0 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full rounded-full" />
                                </Link>
                            ))}

                            {isLoggedIn && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button type="button"
                                            className={`relative group flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-lg transition-all hover:text-red-700 hover:bg-red-50 ${isOrdersActive ? 'text-red-700 bg-red-50' : 'text-slate-700'}`}>
                                            {t('nav.orders', 'الطلبات')}
                                            <ChevronDown size={14} className="text-slate-400 group-hover:text-red-600 transition-colors" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="min-w-44">
                                        {orderLinks.map((link) => (
                                            <DropdownMenuItem key={link.path} asChild>
                                                <Link to={link.path} className="cursor-pointer font-semibold">{link.name}</Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {isLoggedIn && (
                                <button type="button"
                                    className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:border-red-400 hover:bg-red-50 hover:text-red-600"
                                    aria-label="Notifications">
                                    <Bell size={19} />
                                </button>
                            )}

                            <Link to="/cart"
                                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:border-red-400 hover:bg-red-50 hover:text-red-600"
                                aria-label="Cart">
                                <ShoppingCart size={19} />
                            </Link>
                            <Link
                                to="/wishlist"
                                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:border-red-400 hover:bg-red-50 hover:text-red-600"
                                aria-label="Wishlist">
                                <Heart size={19} />
                            </Link>
                            <button type="button" onClick={() => setIsOpen(!isOpen)}
                                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-red-600 bg-white text-red-600 transition-all hover:bg-red-50"
                                aria-label="Menu" aria-expanded={isOpen}>
                                {isOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="border-b border-slate-100 bg-white lg:hidden">
                    <div className="flex flex-col px-2 py-2">
                        {navLinks.map((link) => (
                            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-red-50 hover:text-red-700">
                                <span>{link.name}</span>
                                <ChevronRight size={15} className="text-slate-400 rtl:rotate-180" />
                            </Link>
                        ))}

                        {isLoggedIn && (
                            <>
                                <p className="px-4 pt-3 pb-1 text-xs font-bold text-slate-400">{t('nav.orders', 'الطلبات')}</p>
                                {orderLinks.map((link) => (
                                    <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-red-50 hover:text-red-700">
                                        <span>{link.name}</span>
                                        <ChevronRight size={15} className="text-slate-400 rtl:rotate-180" />
                                    </Link>
                                ))}
                            </>
                        )}
                    </div>

                    <div className="border-t border-slate-100 px-4 py-4">
                        {isLoggedIn ? (
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center ring-2 ring-red-500">
                                        <span className="text-sm font-bold text-red-600">{user?.name?.charAt(0) ?? 'U'}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                                        <Link to="/profile" onClick={() => setIsOpen(false)}
                                            className="text-xs text-red-600 font-semibold">
                                            {t('nav.viewProfile', 'عرض الملف الشخصي')}
                                        </Link>
                                    </div>
                                </div>
                                <button onClick={() => { logout(); setIsOpen(false) }} disabled={isPending}
                                    className="w-full rounded-lg border border-red-600 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50">
                                    {isPending ? '...' : t('nav.logout', 'تسجيل الخروج')}
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Button variant="outline" size="sm" className="w-full border border-red-600 text-red-600 rounded-lg" asChild>
                                    <Link to="/login" onClick={() => setIsOpen(false)}>{t('nav.login', 'تسجيل الدخول')}</Link>
                                </Button>
                                <Button size="sm" className="w-full rounded-lg bg-red-600 text-white" asChild>
                                    <Link to="/signup" onClick={() => setIsOpen(false)}>{t('nav.signup', 'إنشاء حساب')}</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}