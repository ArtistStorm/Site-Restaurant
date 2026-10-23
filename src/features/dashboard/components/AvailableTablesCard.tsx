import { Armchair } from 'lucide-react'
import { useAvailableTables } from '@/features/dashboard/hooks/useAvailableTables'
import { AvailableTablesCardSkeleton } from '@/features/dashboard/components/AvailableTablesCardSkeleton'

export function AvailableTablesCard() {
  const { data, isPending, isError } = useAvailableTables()

  if (isPending) {
    return <AvailableTablesCardSkeleton />
  }

  if (isError) {
    return (
      <section className="rounded-none bg-white p-6 shadow dark:bg-slate-900">
        <h2 className="text-lg font-semibold">Tables libres ce soir</h2>
        <p className="mt-2 text-sm text-red-600">Impossible de charger les tables.</p>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-2 rounded-none bg-white p-6 shadow dark:bg-slate-900">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <Armchair size={20} />
        Tables libres ce soir
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-400">19h - 21h, 2 personnes</p>

      {data.length === 0 ? (
        <p>Aucune table libre.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-2">
          {data.map((table) => (
            <li key={table.id} className="rounded-none bg-slate-100 px-3 py-2 dark:bg-slate-800">
              Table {table.number} · {table.location} · {table.capacity} places
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
