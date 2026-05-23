import { Button } from '../ui/button'

interface CartSummaryProps {
    subtotal: number
    shipping: number
    tax: number
    total: number
}

export function CartSummary({ subtotal, shipping, tax, total }: CartSummaryProps) {
    return (
        <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border-2 border-slate-200 bg-linear-to-b from-slate-50 to-white p-6">
                <h2 className="text-lg font-bold text-slate-950 mb-6">ملخص الطلب</h2>

                <div className="space-y-4 pb-6 border-b-2 border-slate-200">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-600">المجموع الفرعي</p>
                        <p className="text-sm font-semibold text-slate-950">
                            {subtotal.toLocaleString('ar-EG', {
                                style: 'currency',
                                currency: 'EGP',
                            })}
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-600">الشحن</p>
                        <p className="text-sm font-semibold text-slate-950">
                            {shipping.toLocaleString('ar-EG', {
                                style: 'currency',
                                currency: 'EGP',
                            })}
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-600">الضريبة</p>
                        <p className="text-sm font-semibold text-slate-950">
                            {tax.toLocaleString('ar-EG', {
                                style: 'currency',
                                currency: 'EGP',
                            })}
                        </p>
                    </div>
                </div>

                <div className="pt-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-lg font-bold text-slate-950">الإجمالي</p>
                        <p className="text-2xl font-bold text-red-600">
                            {total.toLocaleString('ar-EG', {
                                style: 'currency',
                                currency: 'EGP',
                            })}
                        </p>
                    </div>

                    <Button className="w-full rounded-lg bg-linear-to-r from-red-600 to-red-700 px-6 py-3 text-white font-semibold shadow-lg shadow-red-600/30 transition-all duration-200 hover:shadow-lg hover:shadow-red-600/50 hover:scale-105">
                        متابعة الدفع
                    </Button>

                    <button
                        type="button"
                        className="w-full mt-3 rounded-lg border-2 border-slate-200 bg-white px-6 py-3 text-slate-950 font-semibold transition-all duration-200 hover:border-red-600 hover:bg-red-50"
                    >
                        متابعة التسوق
                    </button>
                </div>

                <div className="space-y-2 pt-6 border-t-2 border-slate-200">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                        <i className="fas fa-shield-alt text-red-600"></i>
                        <span>دفع آمن 100%</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                        <i className="fas fa-truck text-red-600"></i>
                        <span>شحن سريع مجاني فوق 500 جنيه</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                        <i className="fas fa-undo text-red-600"></i>
                        <span>إرجاع سهل خلال 30 يوم</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
