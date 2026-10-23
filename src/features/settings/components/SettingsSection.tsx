import type { ReactNode } from 'react'

type SettingsSectionProps = {
  id: string
  title: string
  description: string
  children: ReactNode
}

export function SettingsSection({ id, title, description, children }: SettingsSectionProps) {
  return (
    <section
      aria-labelledby={id}
      className="flex flex-col gap-4 rounded-none border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="flex flex-col gap-1">
        <h2 id={id} className="text-lg font-bold">
          {title}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
      </div>
      {children}
    </section>
  )
}
