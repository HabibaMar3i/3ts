import { useState } from 'react'
import { Heart, Minus, Plus, ShoppingCart } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function ProductActions() {
    const [quantity, setQuantity] = useState(1)

    const decrease = () => setQuantity((value) => Math.max(1, value - 1))
    const increase = () => setQuantity((value) => value + 1)

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">الكمية</p>
                <div className="flex items-center gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        onClick={decrease}
                        aria-label="تقليل الكمية"
                    >
                        <Minus size={16} />
                    </Button>
                    <Input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(event) => {
                            const next = Number(event.target.value)
                            setQuantity(Number.isNaN(next) || next < 1 ? 1 : next)
                        }}
                        className="h-10 w-20 rounded-full text-center"
                    />
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        onClick={increase}
                        aria-label="زيادة الكمية"
                    >
                        <Plus size={16} />
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="button" className="h-11 flex-1 rounded-full gap-2 text-sm font-semibold">
                    <ShoppingCart size={18} />
                    أضف للسلة
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className="h-11 rounded-full gap-2 text-sm font-semibold sm:w-auto"
                >
                    <Heart size={18} />
                    أضف للمفضلة
                </Button>
            </div>
        </div>
    )
}
