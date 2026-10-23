import { AdminMenuList } from '@/features/admin/components/AdminMenuList'
import { MenuItemForm } from '@/features/admin/components/MenuItemForm'

export function AdminMenuPage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <section className="flex flex-col gap-4 rounded-none border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-lg font-bold">Ajouter un produit</h2>
        <MenuItemForm />
      </section>

      <section className="flex flex-col gap-4 rounded-none border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-lg font-bold">Gestion de la carte</h2>
        <AdminMenuList />
      </section>
    </div>
  )
}
