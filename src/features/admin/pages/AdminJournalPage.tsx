import { ActivityLogsTable } from '@/features/admin/components/ActivityLogsTable'

export function AdminJournalPage() {
  return (
    <section className="flex flex-col gap-4 rounded-none border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
      <h2 className="text-lg font-bold">Journal d'activité</h2>
      <ActivityLogsTable />
    </section>
  )
}
