import { Refresh2 } from 'iconsax-react'

import { cn } from '@/lib/utils'

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <Refresh2
      size={16}
      variant="Linear"
      role="status"
      aria-label="Loading"
      className={cn('animate-spin', className)}
      {...props}
    />
  )
}

export { Spinner }
