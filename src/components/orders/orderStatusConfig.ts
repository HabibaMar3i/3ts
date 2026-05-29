import type { NormalOrderStatus, RefundOrderStatus } from '../../schemas/orders.schema'

export type StatusTone = 'blue' | 'yellow' | 'green' | 'red' | 'slate'

export const normalStatusConfig: Record<
    NormalOrderStatus,
    { labelKey: string; tone: StatusTone }
> = {
    new: { labelKey: 'orders.normal.status.new', tone: 'blue' },
    current: { labelKey: 'orders.normal.status.current', tone: 'blue' },
    finished: { labelKey: 'orders.normal.status.finished', tone: 'green' },
    cancelled: { labelKey: 'orders.normal.status.cancelled', tone: 'red' },
}

export const refundStatusConfig: Record<
    RefundOrderStatus,
    { labelKey: string; tone: StatusTone }
> = {
    review: { labelKey: 'orders.refund.status.review', tone: 'yellow' },
    acceptance: { labelKey: 'orders.refund.status.acceptance', tone: 'blue' },
    received: { labelKey: 'orders.refund.status.received', tone: 'green' },
    rejection: { labelKey: 'orders.refund.status.rejection', tone: 'red' },
}

export const statusToneClasses: Record<StatusTone, { dot: string; text: string }> = {
    blue: { dot: 'bg-blue-500', text: 'text-blue-600' },
    yellow: { dot: 'bg-amber-400', text: 'text-amber-600' },
    green: { dot: 'bg-emerald-500', text: 'text-emerald-600' },
    red: { dot: 'bg-red-500', text: 'text-red-600' },
    slate: { dot: 'bg-slate-400', text: 'text-slate-600' },
}
