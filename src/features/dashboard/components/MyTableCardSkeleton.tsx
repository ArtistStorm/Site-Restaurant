import { Skeleton } from '@/shared/components/Skeleton'

export function MyTableCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-none bg-white p-6 shadow dark:bg-slate-900">
      <Skeleton variant="title" />
      <Skeleton variant="text" />
    </div>
  )
}
