import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '#lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-slate-100 text-slate-700',
        secondary: 'bg-amber-100 text-amber-800',
        accent: 'bg-red-50 text-red-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Badge({ className, variant, ...props }: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />
}

export { Badge, badgeVariants }
