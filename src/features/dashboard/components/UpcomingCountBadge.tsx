import { CalendarCheck } from 'lucide-react'
import { useNextReservation } from '@/features/dashboard/hooks/useNextReservation'
import { MemberOnlyCard } from '@/features/dashboard/components/MemberOnlyCard'
import { useAuthStore } from '@/features/auth/auth-store'

export function UpcomingCountBadge() {
  const token = useAuthStore((state) => state.token)
  const { data } = useNextReservation()

  if (token === null) {
    return <MemberOnlyCard title="Réservations à venir" />
  }

  return (
    <section className="flex flex-col gap-2 rounded-none bg-white p-6 shadow dark:bg-slate-900">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <CalendarCheck size={20} />
        Réservations à venir
      </h2>
      <p className="text-3xl font-bold">{data?.upcomingCount ?? '…'}</p>
    </section>
  )
}
