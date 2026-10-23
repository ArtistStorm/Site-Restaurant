import { MapPin } from 'lucide-react'
import { useMyTable } from '@/features/dashboard/hooks/useMyTable'
import { MyTableCardSkeleton } from '@/features/dashboard/components/MyTableCardSkeleton'
import { MemberOnlyCard } from '@/features/dashboard/components/MemberOnlyCard'
import { useAuthStore } from '@/features/auth/auth-store'

export function MyTableCard() {
  const token = useAuthStore((state) => state.token)
  const { nextReservation, table, isPending, isError } = useMyTable()

  if (token === null) {
    return <MemberOnlyCard title="Ma table" />
  }

  if (isPending) {
    return <MyTableCardSkeleton />
  }

  if (isError) {
    return (
      <section className="rounded-none bg-white p-6 shadow dark:bg-slate-900">
        <h2 className="text-lg font-semibold">Ma table</h2>
        <p className="mt-2 text-sm text-red-600">Impossible de charger votre table.</p>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-2 rounded-none bg-white p-6 shadow dark:bg-slate-900">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <MapPin size={20} />
        Ma table
      </h2>

      {nextReservation && table ? (
        <p>
          Table {table.number} · {table.location}
        </p>
      ) : (
        <p className="text-sm text-slate-600 dark:text-slate-400">Aucune table réservée.</p>
      )}
    </section>
  )
}
