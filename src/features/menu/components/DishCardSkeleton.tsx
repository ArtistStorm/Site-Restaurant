import { Skeleton } from '@/shared'

export function DishCardSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 rounded-none border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <Skeleton variant="title" className="w-1/2" />
      <Skeleton variant="text" className="w-16" />
    </div>
  )
}
