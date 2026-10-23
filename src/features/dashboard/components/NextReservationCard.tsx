import { CalendarClock } from 'lucide-react'
import { useNextReservation } from '@/features/dashboard/hooks/useNextReservation'
import { NextReservationCardSkeleton } from '@/features/dashboard/components/NextReservationCardSkeleton'
import { MemberOnlyCard } from '@/features/dashboard/components/MemberOnlyCard'
import { useAuthStore } from '@/features/auth/auth-store'

export function NextReservationCard() {
  const token = useAuthStore((state) => state.token)
  const { data, isPending, isError } = useNextReservation()

  if (token === null) {
    return <MemberOnlyCard title="Prochaine réservation" />
  }

  if (isPending) {
    return <NextReservationCardSkeleton />
  }

  if (isError) {
    return (
      <section className="rounded-none bg-white p-6 shadow dark:bg-slate-900">
        <h2 className="text-lg font-semibold">Prochaine réservation</h2>
        <p className="mt-2 text-sm text-red-600">Impossible de charger vos réservations.</p>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-2 rounded-none bg-white p-6 shadow dark:bg-slate-900">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <CalendarClock size={20} />
        Prochaine réservation
      </h2>

      {data.next ? (
        <>
          <p>{new Date(data.next.startTime).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {data.next.guestCount} personne(s)
          </p>
        </>
      ) : (
        <p className="text-sm text-slate-600 dark:text-slate-400">Aucune réservation à venir.</p>
      )}
    </section>
  )
}
