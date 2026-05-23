import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Search, ShoppingCart, Heart, Bell, ChevronDown } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'

const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'المنتجات', path: '/products', badge: 'جديد' },
    { name: 'عن الشركة', path: '/about' },
    { name: 'الخدمات', path: '/services' },
    { name: 'التواصل', path: '/contact' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [searchMobile, setSearchMobile] = useState(false)

    return (
        <nav className="sticky top-0 z-50 bg-white" dir="rtl">
            {/* Top Bar - Red accent strip */}
            <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>

            {/* Main Navbar Container */}
            <div className="border-b border-slate-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between gap-8 py-4">
                        
                        {/* Logo Section */}
                        <Link to="/" className="flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30 transition-transform duration-300 hover:scale-105 hover:-translate-y-1">
                                        <span className="text-lg font-bold tracking-tight">3TS</span>
                                    </div>
                                </div>
                                <div className="hidden sm:flex flex-col">
                                    <p className="text-sm font-bold text-slate-950">3TS</p>
                                    <p className="text-xs font-medium text-red-600">ألعاب أصلية</p>
                                </div>
                            </div>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="relative group px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 rounded-lg hover:text-red-700 hover:bg-red-50"
                                >
                                    <span className="flex items-center gap-1.5">
                                        {link.name}
                                        {link.badge && (
                                            <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-red-600 rounded-full">
                                                {link.badge}
                                            </span>
                                        )}
                                    </span>
                                    <span className="absolute bottom-0 right-0 h-0.5 w-0 bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Search Bar */}
                        <div className="hidden xl:flex flex-1 max-w-md">
                            <div className="relative w-full group">
                                <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                                <Input
                                    type="text"
                                    placeholder="ابحث عن لعبة ..."
                                    className="w-full rounded-full border-2 border-slate-200 bg-slate-50 px-11 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 transition-all duration-200 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                                />
                            </div>
                        </div>

                        {/* Right Section - Icons & Auth */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Mobile Search Toggle */}
                            <button
                                type="button"
                                onClick={() => setSearchMobile(!searchMobile)}
                                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-slate-200 bg-slate-50 text-slate-700 transition-all duration-200 hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                                aria-label="ابحث"
                            >
                                <Search size={20} />
                            </button>

                            {/* Notification Bell */}
                            <button
                                type="button"
                                className="hidden sm:inline-flex relative h-10 w-10 items-center justify-center rounded-lg border-2 border-slate-200 bg-slate-50 text-slate-700 transition-all duration-200 hover:border-red-500 hover:bg-red-50 hover:text-red-600 group"
                                aria-label="الإشعارات"
                            >
                                <Bell size={20} className="group-hover:animate-pulse" />
                                <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-700 text-[10px] font-bold text-white shadow-lg shadow-red-600/40">
                                    3
                                </span>
                            </button>

                            {/* Wishlist */}
                            <Link
                                to="/wishlist"
                                className="hidden sm:inline-flex relative h-10 w-10 items-center justify-center rounded-lg border-2 border-slate-200 bg-slate-50 text-slate-700 transition-all duration-200 hover:border-red-500 hover:bg-red-50 hover:text-red-600 group"
                                aria-label="المفضلة"
                            >
                                <Heart size={20} className="group-hover:fill-red-600 group-hover:scale-110 transition-all" />
                                <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-700 text-[10px] font-bold text-white shadow-lg shadow-red-600/40">
                                    2
                                </span>
                            </Link>

                            {/* Shopping Cart - Primary CTA */}
                            <Link
                                to="/cart"
                                className="hidden sm:inline-flex relative h-10 w-10 items-center justify-center rounded-lg border-2 border-slate-200 bg-slate-50 text-slate-700 transition-all duration-200 hover:border-red-500 hover:bg-red-50 hover:text-red-600 group"
                                aria-label="السلة"
                            >
                                <ShoppingCart size={20} className="group-hover:rotate-12 transition-transform" />
                                <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-700 text-[10px] font-bold text-white shadow-lg shadow-red-600/40 font-bold">
                                    5
                                </span>
                            </Link>

                            {/* Auth Buttons - Desktop */}
                            <div className="hidden md:flex items-center gap-2 border-r-2 border-slate-200 pr-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-2 border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-all"
                                    asChild
                                >
                                    <Link to="/login">دخول</Link>
                                </Button>
                                <Button
                                    size="sm"
                                    className="rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold hover:shadow-lg hover:shadow-red-600/40 transition-all"
                                    asChild
                                >
                                    <Link to="/signup">إنشاء حساب</Link>
                                </Button>
                            </div>

                            {/* Mobile Menu Toggle */}
                            <button
                                type="button"
                                onClick={() => setIsOpen(!isOpen)}
                                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-red-600 bg-white text-red-600 shadow-sm transition-all duration-200 hover:bg-red-50"
                                aria-label="القائمة"
                                aria-expanded={isOpen}
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar */}
            {searchMobile && (
                <div className="border-t border-slate-100 bg-white px-4 py-3 lg:hidden">
                    <div className="relative">
                        <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input
                            type="text"
                            placeholder="ابحث..."
                            className="w-full rounded-full border-2 border-slate-200 bg-slate-50 px-11 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 transition-all focus:border-red-500 focus:ring-4 focus:ring-red-100"
                            autoFocus
                        />
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            {isOpen && (
                <div className="border-t border-slate-100 bg-white lg:hidden">
                    {/* Mobile Navigation Links */}
                    <div className="flex flex-col px-4 py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className="group flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-red-50 hover:text-red-700"
                            >
                                <span className="flex items-center gap-2">
                                    {link.name}
                                    {link.badge && (
                                        <span className="px-2 py-0.5 text-[9px] font-bold text-white bg-red-600 rounded-full">
                                            {link.badge}
                                        </span>
                                    )}
                                </span>
                                <ChevronDown size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Auth Section */}
                    <div className="border-t border-slate-100 px-4 py-4 flex flex-col gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-2 border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-50"
                            asChild
                        >
                            <Link to="/login">دخول</Link>
                        </Button>
                        <Button
                            size="sm"
                            className="w-full rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold hover:shadow-lg hover:shadow-red-600/40"
                            asChild
                        >
                            <Link to="/signup">إنشاء حساب</Link>
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    )
}