import { Inbox, type LucideIcon } from 'lucide-react'

type EmptyStateProps = {
  title: string
  description?: string
  icon?: LucideIcon
}

export function EmptyState({ title, description, icon: Icon = Inbox }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-none border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
      <Icon size={32} aria-hidden="true" className="text-slate-400 dark:text-slate-500" />
      <p className="font-medium">{title}</p>
      {description && <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>}
    </div>
  )
}
