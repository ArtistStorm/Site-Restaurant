import type { LucideIcon } from 'lucide-react'

type StatCardProps = {
  label: string
  value: string
  hint?: string
  icon: LucideIcon
}

export function StatCard({ label, value, hint, icon: Icon }: StatCardProps) {
  return (
    <article className="flex items-start gap-4 rounded-none border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="rounded-none bg-slate-100 p-2 dark:bg-slate-800">
        <Icon size={20} aria-hidden="true" />
      </div>
      <div className="flex min-w-0 flex-col">
        <p className="text-sm text-slate-600 dark:text-slate-400">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
        {hint && <p className="text-xs text-slate-600 dark:text-slate-400">{hint}</p>}
      </div>
    </article>
  )
}
