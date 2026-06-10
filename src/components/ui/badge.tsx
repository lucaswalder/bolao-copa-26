import * as React from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '#/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-[var(--sea-ink)] text-white',
        secondary:
          'border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--sea-ink)]',
        canary: 'border-yellow-500/30 bg-yellow-300/40 text-yellow-950',
        green: 'border-emerald-600/25 bg-emerald-500/15 text-emerald-950',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
