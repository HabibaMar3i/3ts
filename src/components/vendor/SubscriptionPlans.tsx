import { Check } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { formatPrice } from '../../lib/format'
import type { VendorSubscriptionPlan } from '../../types/vendor'
import { cn } from '#lib/utils'

interface SubscriptionPlansProps {
    plans: VendorSubscriptionPlan[]
    currentPlanId: string
}

export function SubscriptionPlans({ plans, currentPlanId }: SubscriptionPlansProps) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => {
                const isCurrent = plan.id === currentPlanId
                return (
                    <Card
                        key={plan.id}
                        className={cn(plan.recommended && 'ring-2 ring-primary', isCurrent && 'bg-primary/5')}
                    >
                        <CardHeader>
                            {plan.recommended ? (
                                <Badge className="w-fit">الأكثر شعبية</Badge>
                            ) : null}
                            <CardTitle>{plan.name}</CardTitle>
                            <CardDescription>
                                <span className="text-2xl font-bold text-primary">
                                    {formatPrice(plan.price)}
                                </span>
                                {' / '}
                                {plan.period}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {plan.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-center gap-2 text-sm text-muted-foreground"
                                    >
                                        <Check size={14} className="shrink-0 text-primary" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                type="button"
                                className="w-full"
                                variant={isCurrent ? 'outline' : 'default'}
                                disabled={isCurrent}
                            >
                                {isCurrent ? 'خطتك الحالية' : 'ترقية الخطة'}
                            </Button>
                        </CardFooter>
                    </Card>
                )
            })}
        </div>
    )
}
