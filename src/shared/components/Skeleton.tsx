import { cn } from '@/shared/lib/cn'

type SkeletonVariant = 'text' | 'title' | 'avatar' | 'button' | 'bar'

const variants: Record<SkeletonVariant, string> = {
  text: 'h-4 w-full',
  title: 'h-6 w-3/4',
  avatar: 'h-12 w-12 rounded-full',
  button: 'h-10 w-32 rounded-none',
  bar: 'h-3 w-full rounded-full',
}

type SkeletonProps = {
  variant?: SkeletonVariant
  className?: string
}

export function Skeleton({ variant = 'text', className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded bg-slate-200 dark:bg-slate-700',
        variants[variant],
        className,
      )}
    />
  )
}
