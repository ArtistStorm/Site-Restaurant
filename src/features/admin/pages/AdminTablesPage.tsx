import { AdminTablesList } from '@/features/admin/components/AdminTablesList'
import { TableForm } from '@/features/admin/components/TableForm'

export function AdminTablesPage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <section className="flex flex-col gap-4 rounded-none border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-lg font-bold">Ajouter une table</h2>
        <TableForm />
      </section>

      <section className="flex flex-col gap-4 rounded-none border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-lg font-bold">Gestion des tables</h2>
        <AdminTablesList />
      </section>
    </div>
  )
}
