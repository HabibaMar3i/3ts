export function PromoCodeSection() {
    return (
        <div className="border-t border-slate-100 bg-slate-50 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-slate-950 mb-2">
                            هل لديك كود خصم؟
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="أدخل الكود..."
                                className="flex-1 rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-red-600 focus:ring-4 focus:ring-red-100"
                            />
                            <button
                                type="button"
                                className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-700"
                            >
                                تطبيق
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
